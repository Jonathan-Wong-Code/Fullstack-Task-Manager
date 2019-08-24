const catchAsync = require("../utils/catchAsync");
const APIError = require("../utils/apiError");
const User = require("../models/userModel");
const multer = require("multer");
const sharp = require("sharp");

multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  console.log(file.mimetype.startsWith("image"));

  if (file.mimetype.startsWith("image")) {
    return cb(null, true);
  }

  console.log("what?");

  cb(new APIError("Invalid file type, please upload an image", 400), false);
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadUserPhoto = upload.single("photo");

exports.resizeUserPhoto = (req, res, next) => {
  if (!req.file) {
    return next();
  }
  //user-id-date
  req.file.filename = `user-${req.user._id}-${Date.now()}.jpeg`;
  sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(
      `${__dirname}/../../../client/public/img/users/${req.file.filename}`
    );

  next();
};

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
  if (req.file) filteredBody.photo = req.file.filename;
  const user = await User.findByIdAndUpdate(req.user._id, filteredBody, {
    runValidators: true,
    new: true
  }).select("name email photo");

  res.status(200).json({
    status: "Success",
    message: "User details updated!",
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
