const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { isValidPassResetToken } = require("../middlewares/user");
const {
  userValidator,
  validate,
  validatePassword,
} = require("../middlewares/validator");
const { isAuth } = require("../middlewares/auth");

router.post("/create", userValidator, validate, userController.create);
router.post("/verify-email", userController.verifyEmail);
router.post(
  "/resend-email-verification-token",
  userController.resendEmailVerificationToken
);
router.post("/forgot-password", userController.forgotPassword);
router.post("/verify-pass-reset-token", isValidPassResetToken, (req, res) => {
  res.json(200, { valid: true });
});
router.post(
  "/reset-password",
  validatePassword,
  validate,
  userController.resetPassword
);
router.post("/login", userController.signIn);
router.post("/logout", userController.logout);
router.get("/is-auth", isAuth, (req, res) => {
  const { user } = req;
  return res.json(200, {
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  });
});
module.exports = router;
