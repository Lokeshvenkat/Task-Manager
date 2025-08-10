const mongoose = require("mongoose");

// Schema definition for User collection
const userSchema = new mongoose.Schema({
  // User's full name
  name: {
    type: String,
    required: [true, "Please enter your name"], // Custom error message
    trim: true // Removes leading/trailing spaces
  },
  // User's email address (unique)
  email: {
    type: String,
    required: [true, "Please enter your email"],
    trim: true,
    unique: true // Ensures no duplicate emails
  },
  // Hashed password (never store plain text passwords)
  password: {
    type: String,
    required: [true, "Please enter your password"],
  },
  // Date when the user joined
  joiningTime: {
    type: Date,
    default: Date.now // Auto set when user is created
  }
}, {
  // Adds createdAt and updatedAt fields
  timestamps: true
});

// Create model from schema
const User = mongoose.model("User", userSchema);

module.exports = User;
