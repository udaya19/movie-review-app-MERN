const User = require("../models/user");
const EmailVerificationToken = require("../models/emailVerificationToken");
const nodemailer = require("nodemailer");
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
  });
};
