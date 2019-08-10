const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.get("/logout", userController.logout);
router.get("/checkLoggedIn", userController.isLoggedIn);
router.use(userController.protect);
router.patch("/updateMe", userController.updateMe);
router.delete("/deleteMe", userController.deleteMe);
router.route("/").get(userController.getAllUsers);
module.exports = router;
