const jwt = require("jsonwebtoken");
const User = require("../models/user");
exports.isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const jwtToken = token.split("Bearer ")[1];
    if (!jwtToken) {
      return res.json(400, {
        error: "Invalid input",
      });
    }
    const decode = jwt.verify(jwtToken, "jsonsecretkey");
    const { userId } = decode;
    const user = await User.findById(userId);
    if (!user) {
      return res.json(404, {
        error: "Invalid token!User not found",
      });
    }
    req.user = user;
    // return res.json(200, {
    //   user: { id: user._id, name: user.name, email: user.email },
    // });
  } catch (error) {
    return res.json(500, {
      error: error.message,
    });
  }
};
