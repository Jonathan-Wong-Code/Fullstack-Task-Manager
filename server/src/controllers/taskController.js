const catchAsync = require("../utils/catchAsync");
const APIError = require("../utils/apiError");
const APIFeatures = require("../utils/APIFeatures");
const Task = require("../models/taskModel");

exports.createTask = catchAsync(async (req, res, next) => {
  const task = await Task.create({ ...req.body, user: req.user._id });

  res.status(200).json({
    status: "Success",
    data: {
      task
    }
  });
});

exports.getTask = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const task = await Task.findOne({ _id: id, user: req.user._id });

  if (!task) {
    return next(new APIError("Error, task not found", 404));
  }

  res.status(200).json({
    status: "Success",
    data: {
      task
    }
  });
});

exports.getAllTasks = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Task.find({ user: req.user._id }), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const tasks = await features.returnedQueryObj;
  // const tasks = await Task.find({ user: req.user._id });
  res.status(200).json({
    status: "Success",
    data: {
      tasks
    }
  });
});

exports.deleteTask = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const task = await Task.findOneAndDelete({ _id: id, user: req.user._id });
  if (!task) {
    return next(new APIError("Error, task not found", 404));
  }

  res.status(204).json({
    status: "Success",
    data: null
  });
});

exports.updateTask = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const task = await Task.findOneAndUpdate(
    { _id: id, user: req.user._id },
    req.body,
    { runValidators: true, new: true }
  );

  if (!task) {
    return next(new APIError("Error, task not found", 404));
  }

  res.status(200).json({
    status: "Success",
    data: {
      task
    }
  });
});

// exports.getNumTasks = catchAsync(async (req, res, next) => {
//   const stats = await Task.aggregate([
//     {
//       $match: { user: req.user._id }
//     },
//     {
//       $count: "numTasks"
//     }
//   ]);

//   res.status(200).json({
//     status: "Success",
//     data: {
//       numTasks: stats[0].numTasks
//     }
//   });
// });

exports.getNumTasks = catchAsync(async (req, res, next) => {
  const stats = await Task.aggregate([
    {
      $match: { user: req.user._id }
    },
    {
      $group: {
        _id: "$completed",
        nTasks: { $sum: 1 }
      }
    }
  ]);
  res.status(200).json({
    status: "Success",
    data: {
      complete: stats[0] ? stats[0].nTasks : 0,
      incomplete: stats[1] ? stats[1].nTasks : 0
    }
  });
});
