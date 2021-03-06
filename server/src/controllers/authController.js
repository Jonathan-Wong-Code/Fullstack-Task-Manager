const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const APIError = require("../utils/apiError");
const Email = require("./../utils/email");
const User = require("./../models/userModel");
const { promisify } = require("util");
const signToken = id =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

const createSendToken = (res, user, statusCode, message = null) => {
  const token = signToken(user._id);
  const cookieOptions = {
    httpOnly: true,
    expiry: new Date(Date.now() + 24 * 60 * 60 * 1000)
  };
  // if (process.env.NODE_ENV.trim() === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  res.status(statusCode).json({
    status: "Success",
    token,
    message: message ? message : undefined,
    user: {
      name: user.name,
      email: user.email,
      photo: user.photo
    }
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return next(new APIError("Account already exists with this email", 400));
  }
  const user = await User.create({
    name,
    email,
    password,
    confirmPassword
  });

  await new Email(
    user,
    `${req.protocol}://${req.get("host")}/myAccount`
  ).sendWelcome();

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

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return next(new APIError("No account associated with that email", 404));
  }

  const resetPasswordToken = user.createResetToken();
  await user.save({ validateBeforeSave: false });
  const resetUrl = `${process.env.LOCAL_HOST}/resetPassword/${resetPasswordToken}`;

  await new Email(user, resetUrl).sendPasswordReset();

  res.status(200).json({
    status: "Success",
    message: "Password reset link sent."
  });
});

//takes
exports.resetPassword = catchAsync(async (req, res, next) => {
  const { password, confirmPassword } = req.body;
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpiry: { $gt: Date.now() }
  });

  if (!user) {
    return next(new APIError("Invalid reset token. Try again", 404));
  }

  user.password = password;
  user.confirmPassword = confirmPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpiry = undefined;

  await user.save();
  createSendToken(res, user, 200);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const { password, updatedPassword, confirmUpdatedPassword } = req.body;
  const isMatch = await req.user.checkPassword(password, req.user.password);
  if (!isMatch) {
    return next(new APIError("Current password is incorrect. Try again", 400));
  }
  req.user.password = updatedPassword;
  req.user.confirmPassword = confirmUpdatedPassword;
  await req.user.save();
  const message = "Password updated!";
  createSendToken(res, req.user, 200, message);
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new APIError("You don't have permission to do that", 403));
    }
    next();
  };
};
