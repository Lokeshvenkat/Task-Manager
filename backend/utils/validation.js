const mongoose = require("mongoose");

// Validates if a given string is a valid email format
// Uses regex to check for standard email patterns
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

// Checks if the given string is a valid MongoDB ObjectId
// Useful for validating URL params or request data before querying DB
const validateObjectId = (string) => {
  return mongoose.Types.ObjectId.isValid(string);
}

module.exports = {
  validateEmail,
  validateObjectId,
}
