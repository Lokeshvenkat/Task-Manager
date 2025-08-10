const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const { ACCESS_TOKEN_SECRET } = process.env;

exports.verifyAccessToken = async (req, res, next) => {
  // Extract token from the request header
  const token = req.header("Authorization");
  if (!token) return res.status(400).json({ status: false, msg: "Token not found" });

  let user;
  try {
    // Verify token authenticity and decode payload
    user = jwt.verify(token, ACCESS_TOKEN_SECRET);
  } catch (err) {
    return res.status(401).json({ status: false, msg: "Invalid token" });
  }

  try {
    // Find the user in DB using the ID from the token payload
    user = await User.findById(user.id);
    if (!user) {
      return res.status(401).json({ status: false, msg: "User not found" });
    }

    // Attach user object to request for access in next middleware/controller
    req.user = user;
    next(); // Proceed to next handler
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
};
