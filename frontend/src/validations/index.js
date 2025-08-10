// Utility function to check if an email is in a valid format
const isValidEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      // Regex pattern for validating email addresses
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

/**
 * Validate a single field's value based on the form group
 * @param {string} group - The form type ("signup", "login", "task", etc.)
 * @param {string} name - The field name (e.g., "email", "password")
 * @param {string} value - The value to validate
 * @returns {string|null} - Error message if invalid, otherwise null
 */
export const validate = (group, name, value) => {

  if (group === "signup") {
    switch (name) {
      case "name":
        if (!value) return "This field is required";
        return null;
      case "email":
        if (!value) return "This field is required";
        if (!isValidEmail(value)) return "Please enter valid email address";
        return null;
      case "password":
        if (!value) return "This field is required";
        if (value.length < 4) return "Password should be atleast 4 chars long";
        return null;
      default:
        return null;
    }
  }

  else if (group === "login") {
    switch (name) {
      case "email":
        if (!value) return "This field is required";
        if (!isValidEmail(value)) return "Please enter valid email address";
        return null;
      case "password":
        if (!value) return "This field is required";
        return null;
      default:
        return null;
    }
  }

  else if (group === "task") {
    switch (name) {
      case "description":
        if (!value) return "This field is required";
        if (value.length > 100) return "Max. limit is 100 characters.";
        return null;
      default:
        return null;
    }
  }

  // If group is unrecognized, assume no validation
  else {
    return null;
  }
}

/**
 * Validate multiple fields at once
 * @param {string} group - The form type
 * @param {object} list - Key-value pairs of field names and their values
 * @returns {Array} - List of error objects { field, err }
 */
const validateManyFields = (group, list) => {
  const errors = [];
  for (const field in list) {
    const err = validate(group, field, list[field]);
    if (err) errors.push({ field, err });
  }
  return errors;
}

export default validateManyFields;
