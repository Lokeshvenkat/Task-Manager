const express = require("express");
const router = express.Router();

// Import controller to handle profile-related logic
const { getProfile } = require("../controllers/profileControllers");

// Middleware to validate JWT and attach user to request
const { verifyAccessToken } = require("../middlewares.js");

// GET /api/profile → Fetch logged-in user's profile
// Requires valid JWT for authentication
router.get("/", verifyAccessToken, getProfile);

module.exports = router;
