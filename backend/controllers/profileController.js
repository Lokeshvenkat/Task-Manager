const User = require("../models/UserModel")

// Controller: Fetch the profile of the currently authenticated user
exports.getProfile = async (req, res) => {
  try {
    // Look up the user in DB using the ID from the authenticated request
    // `.select("-password")` excludes the password field from the result for security
    const user = await User.findById(req.user.id).select("-password");

    // Send back the user data with a success message
    res.status(200).json({ user, status: true, msg: "Profile found successfully.." });
  }
  catch (err) {
    console.error(err);
    // Catch any DB or server errors
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}
