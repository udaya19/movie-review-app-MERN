const jwt = require("jsonwebtoken");
const User = require("../models/user");
exports.isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.json(400, {
        error: "Please sign in to create an actor",
      });
    }
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
    next();
  } catch (error) {
    return res.json(500, {
      error: error.message,
    });
  }
};

exports.isAdmin = (req, res, next) => {
  const { user } = req;
  if (user.role !== "admin") {
    return res.json(401, {
      error: "Unauthorized access",
    });
  }
  next();
};
