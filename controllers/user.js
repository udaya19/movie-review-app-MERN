const User = require("../models/user");
const EmailVerificationToken = require("../models/emailVerificationToken");
const PasswordResetToken = require("../models/passwordResetToken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const { isValidObjectId } = require("mongoose");
exports.create = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.json(400, {
        error: "Email already in use",
      });
    }
    const newUser = new User({
      name,
      email,
      password,
    });
    await newUser.save();
    let OTP = "";
    for (let i = 0; i < 5; i++) {
      const randomVal = Math.round(Math.random() * 9);
      OTP += randomVal;
    }
    const newEmailVerificationToken = new EmailVerificationToken({
      owner: newUser._id,
      token: OTP,
    });
    await newEmailVerificationToken.save();
    var transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "7886793771c3ac",
        pass: "282fc1da09f883",
      },
    });
    transport.sendMail({
      from: "verification@reviewapp.com",
      to: newUser.email,
      subject: "Email Verification",
      html: `<p>Your OTP is:<b>${OTP}</b></p>`,
    });

    return res.json(200, {
      message:
        "Please verify your email. OTP had been sent to your email account",
    });
  } catch (error) {
    return res.json(500, {
      message: error.message,
    });
  }
};

exports.verifyEmail = async (req, res) => {
  const { userId, OTP } = req.body;
  if (!isValidObjectId(userId)) {
    return res.json(400, {
      error: "Invalid user",
    });
  }
  const user = await User.findById(userId);
  if (!user) {
    return res.json(400, {
      error: "User not found",
    });
  }
  if (user.isVerified) {
    return res.json(400, {
      error: "User is laready verified",
    });
  }
  const token = await EmailVerificationToken.findOne({ owner: userId });
  if (!token) {
    return res.json(400, {
      error: "Token not found",
    });
  }
  const isMatch = await token.compareToken(OTP);
  if (!isMatch) {
    return res.json(400, {
      error: "Invalid OTP",
    });
  }
  user.isVerified = true;
  await user.save();
  await EmailVerificationToken.findByIdAndDelete(token._id);
  return res.json(200, {
    message: "Email is verified",
    user: user,
  });
};

exports.resendEmailVerificationToken = async (req, res) => {
  const { userId } = req.body;
  const user = await User.findById(userId);
  if (!user) {
    return res.json(400, {
      error: "User not found",
    });
  }
  if (user.isVerified) {
    return res.json(400, {
      error: "User is already verified",
    });
  }
  const alreadyHasToken = await EmailVerificationToken.findOne({
    owner: userId,
  });
  if (alreadyHasToken) {
    return res.json(400, {
      error: "Only after one hour you can request for another token",
    });
  }
  let OTP = "";
  for (let i = 0; i < 5; i++) {
    const randomVal = Math.round(Math.random() * 9);
    OTP += randomVal;
  }
  const newEmailVerificationToken = new EmailVerificationToken({
    owner: user._id,
    token: OTP,
  });
  await newEmailVerificationToken.save();
  var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "7886793771c3ac",
      pass: "282fc1da09f883",
    },
  });
  transport.sendMail({
    from: "verification@reviewapp.com",
    to: user.email,
    subject: "Email Verification",
    html: `<p>Your OTP is:<b>${OTP}</b></p>`,
  });

  return res.json(200, {
    message:
      "Please verify your email. OTP had been sent to your email account",
  });
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.json(400, {
        error: "Please enter email",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json(400, {
        error: "User not found",
      });
    }
    const alreadyHasToken = await PasswordResetToken.findOne({
      owner: user._id,
    });
    if (alreadyHasToken) {
      return res.json(400, {
        error: "Only after one hour you can request for another token",
      });
    }
    const token = crypto.randomBytes(30).toString("hex");
    const newPasswordResetToken = new PasswordResetToken({
      owner: user._id,
      token,
    });
    await newPasswordResetToken.save();
    const resetPasswordUrl = `http://localhost:8080/reset-password?token=${token}&id=${user._id}`;
    var transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "7886793771c3ac",
        pass: "282fc1da09f883",
      },
    });
    transport.sendMail({
      from: "verification@reviewapp.com",
      to: user.email,
      subject: "Reset Password link",
      html: `<p>Click here to reset password:<a href=${resetPasswordUrl}>Click Here</a></p>`,
    });
    return res.json(200, {
      message: "Link sent to your email",
    });
  } catch (error) {
    return res.json(500, {
      message: error.message,
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { newPassword, userId } = req.body;
    const user = await User.findById(userId);
    const matched = await user.comparePassword(newPassword);
    if (matched) {
      return res.json(400, {
        error: "new password must be different from old password",
      });
    }
    user.password = newPassword;
    await user.save();
    return res.json(200, {
      message: "Password reset successfully done",
    });
  } catch (error) {
    return res.json(500, {
      error: error.message,
    });
  }
};
