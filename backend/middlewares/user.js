const { isValidObjectId } = require("mongoose");
const PasswordResetToken = require("../models/passwordResetToken");

exports.isValidPassResetToken = async (req, res, next) => {
  try {
    const { token, userId } = req.body;
    if (!isValidObjectId(userId)) {
      return res.json(400, {
        error: "Invalid token or userId",
      });
    }
    const resetToken = await PasswordResetToken.findOne({ owner: userId });
    if (!resetToken) {
      return res.json(400, {
        error: "Invalid request",
      });
    }
    const matched = await resetToken.compareToken(token);
    if (!matched) {
      return res.json(400, {
        error: "Invalid token",
      });
    }
    req.resetToken = resetToken;
    next();
  } catch (error) {
    return res.json(500, {
      message: error.message,
    });
  }
};
