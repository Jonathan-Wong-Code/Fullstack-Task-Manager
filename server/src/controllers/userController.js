const catchAsync = require("../utils/catchAsync");
const APIError = require("../utils/apiError");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const signToken = id =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

const createSendToken = (res, user, statusCode) => {
  const token = signToken(user._id);
  const cookieOptions = {
    httpOnly: true,
    expiry: new Date(Date.now() + 24 * 60 * 60 * 1000)
  };
  if (process.env.NODE_ENV.trim() === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  res.status(statusCode).json({
    status: "Success",
    token,
    user: {
      name: user.name,
      email: user.email
    }
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    confirmPassword
  });

  createSendToken(res, user, 201);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return next(new APIError("Invalid email/password try again.", 400));
  }

  const isMatch = await user.checkPassword(password, user.password);
  if (!isMatch) {
    return next(new APIError("Invalid email/password try again.", 400));
  }

  createSendToken(res, user, 200);
});

exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });

  res.status(200).json({ status: "Success" });
};

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new APIError("Must be logged in access this. Please login", 401)
    );
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const user = await User.findOne({ _id: decoded.id });
  if (!user) {
    return next(new APIError("No user found. Please login", 401));
  }

  const passwordChanged = user.checkPasswordChanged(decoded.iat);
  if (passwordChanged) {
    return next(
      new APIError("User recently changed password. Please login again", 401)
    );
  }
  req.user = user;
  next();
});

exports.isLoggedIn = catchAsync(async (req, res, next) => {
  let token;
  if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new APIError("Must be logged in access this. Please login", 401)
    );
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.id);
  if (!user) {
    return next(new APIError("No user found. Please login", 401));
  }

  const passwordChanged = user.checkPasswordChanged(decoded.iat);
  if (passwordChanged) {
    return next(
      new APIError("User recently changed password. Please login again", 401)
    );
  }

  req.user = user;

  createSendToken(res, user, 200);
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: "Success",
    data: {
      users
    }
  });
});

const filterObj = (updates, ...allowedUpdates) => {
  const updateObject = {};
  Object.keys(updates).forEach(key => {
    if (allowedUpdates.includes(key)) {
      updateObject[key] = updates[key];
    }
  });

  return updateObject;
};

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.confirmPassword) {
    return next(new APIError("Cannot update password here"));
  }

  const filteredBody = filterObj(req.body, "name", "email");
  const user = await User.findByIdAndUpdate(req.user._id, filteredBody, {
    runValidators: true,
    new: true
  }).select("name email");

  res.status(200).json({
    status: "Success",
    data: {
      user
    }
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user._id, { active: false });

  res.status(204).json({
    status: "Success",
    data: null
  });
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new APIError("You don't have permission to do that", 403));
    }
    next();
  };
};
