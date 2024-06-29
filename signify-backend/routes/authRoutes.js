const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const passport = require('passport');

router.route("/register").post(authController.registerUser);
router.route("/login").post(authController.loginUser);
router.route("/logout").get(authController.logoutUser);
router.route("/current_user").get(authController.currentUser);
router.route("/users").get(authController.getUsers);
router.route('/success').get(authController.success);
router.route('/failure').get(authController.failure);

module.exports = router;