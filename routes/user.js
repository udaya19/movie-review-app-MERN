const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const { userValidator, validate } = require("../middlewares/validator");

router.post("/create", userValidator, validate, userController.create);
router.post("/verify-email", userController.verifyEmail);
router.post(
  "/resend-email-verification-token",
  userController.resendEmailVerificationToken
);

module.exports = router;
