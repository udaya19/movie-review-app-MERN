const { check, validationResult } = require("express-validator");
exports.userValidator = [
  check("name").trim().not().isEmpty().withMessage("Name is missing"),
  check("email").normalizeEmail().isEmail().withMessage("Email is invalid"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is missing")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be between 8 and 20 characters"),
];

exports.validatePassword = [
  check("newPassword")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is missing")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be between 8 and 20 characters"),
];

exports.validate = (req, res, next) => {
  const error = validationResult(req).array();
  console.log(error);
  if (error.length) {
    return res.json(400, { error: error[0].msg });
  }
  next();
};