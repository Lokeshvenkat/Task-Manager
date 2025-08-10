const User = require("../models/UserModel")
const bcrypt = require("bcrypt");
const { createAccessToken } = require("../utils/token");
const { validateEmail } = require("../utils/validation");

// Controller: Handle user registration
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Basic presence check for all required fields
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Please fill all the fields" });
    }

    // Ensure all provided fields are strings (helps prevent type-related issues)
    if (typeof name !== "string" || typeof email !== "string" || typeof password !== "string") {
      return res.status(400).json({ msg: "Please send string values only" });
    }

    // Enforce minimum password length for security
    if (password.length < 4) {
      return res.status(400).json({ msg: "Password length must be atleast 4 characters" });
    }

    // Validate email format using utility function
    if (!validateEmail(email)) {
      return res.status(400).json({ msg: "Invalid Email" });
    }

    // Check if user already exists to prevent duplicate accounts
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "This email is already registered" });
    }

    // Hash password before storing to ensure security
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user in DB with hashed password
    await User.create({ name, email, password: hashedPassword });

    res.status(200).json({ msg: "Congratulations!! Account has been created for you.." });
  }
  catch (err) {
    console.error(err);
    // Generic error handling for unexpected server errors
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}

// Controller: Handle user login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Ensure both email and password are provided
    if (!email || !password) {
      return res.status(400).json({ status: false, msg: "Please enter all details!!" });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ status: false, msg: "This email is not registered!!" });

    // Compare provided password with hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ status: false, msg: "Password incorrect!!" });

    // Create JWT access token for authenticated sessions
    const token = createAccessToken({ id: user._id });

    // Remove password field before sending user object to client
    delete user.password;

    res.status(200).json({ token, user, status: true, msg: "Login successful.." });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}
