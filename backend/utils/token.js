const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET } = process.env;

// Generates a signed JWT access token with given payload
// ⚠ Make sure ACCESS_TOKEN_SECRET is set in .env for security
const createAccessToken = (payload) => {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET);
}

module.exports = {
  createAccessToken,
}
