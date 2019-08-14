const catchAsync = require("../utils/catchAsync");
const APIError = require("../utils/apiError");
const User = require("../models/userModel");

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
