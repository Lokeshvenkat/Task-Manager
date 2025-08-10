const express = require("express");
const router = express.Router();

// Import authentication controller functions
const { signup, login } = require("../controllers/authControllers");

// POST /api/auth/signup → Create new user account
router.post("/signup", signup);

// POST /api/auth/login → Authenticate user and return token
router.post("/login", login);

module.exports = router;
