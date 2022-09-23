const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const passwordResetToken = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createAt: {
    type: Date,
    expires: 3600,
    default: Date.now(),
  },
});
passwordResetToken.pre("save", async function (next) {
  if (this.isModified("token")) {
    this.token = await bcrypt.hash(this.token, 10);
  }
  next();
});

passwordResetToken.methods.compareToken = async function (token) {
  const result = await bcrypt.compare(token, this.token);
  return result;
};

const PasswordResetToken = mongoose.model(
  "PasswordResetToken",
  passwordResetToken
);

module.exports = PasswordResetToken;
