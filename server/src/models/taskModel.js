const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter a title"],
      trim: true
    },

    description: {
      type: String,
      required: [true, "Please enter description"],
      trim: true
    },

    completed: {
      type: Boolean,
      default: false
    },

    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
);

taskSchema.pre(/^find/, function(next) {
  this.populate({ path: "user", select: "name email" });
  next();
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
