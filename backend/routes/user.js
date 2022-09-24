const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const { isValidPassResetToken } = require("../middlewares/user");
const {
  userValidator,
  validate,
  validatePassword,
} = require("../middlewares/validator");

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
module.exports = router;
