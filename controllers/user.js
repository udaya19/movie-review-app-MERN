const User = require("../models/user");
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
    return res.json(200, {
      user: newUser,
    });
  } catch (error) {
    return res.json(500, {
      message: error.message,
    });
  }
};
