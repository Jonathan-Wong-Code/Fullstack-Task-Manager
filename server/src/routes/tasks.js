const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
router.use(authController.protect);
router.get("/numTasks", taskController.getNumTasks);
router
  .route("/")
  .get(taskController.getAllTasks)
  .post(taskController.createTask);
router
  .route("/:id")
  .get(taskController.getTask)
  .patch(taskController.updateTask)
  .delete(taskController.deleteTask);

module.exports = router;
