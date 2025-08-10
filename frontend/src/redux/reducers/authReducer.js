import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, SAVE_PROFILE } from "../actions/actionTypes"

// Initial state for authentication
const initialState = {
  loading: false,     // Whether an authentication request is in progress
  user: {},           // Logged-in user's data
  isLoggedIn: false,  // Authentication status
  token: "",          // JWT or session token
  successMsg: "",     // Success messages (e.g., "Login successful")
  errorMsg: "",       // Error messages (e.g., "Invalid credentials")
}

// Reducer function for handling authentication actions
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      // When login starts: reset state, set loading to true
      return { loading: true, user: {}, isLoggedIn: false, token: "", successMsg: "", errorMsg: "" };

    case LOGIN_SUCCESS:
      // On successful login: store user, token, and success message
      return { 
        loading: false, 
        user: action.payload.user, 
        isLoggedIn: true, 
        token: action.payload.token, 
        successMsg: action.payload.msg, 
        errorMsg: "" 
      };

    case LOGIN_FAILURE:
      // On failed login: store error message, reset user/token
      return { 
        loading: false, 
        user: {}, 
        isLoggedIn: false, 
        token: "", 
        successMsg: "", 
        errorMsg: action.payload.msg 
      };

    case LOGOUT:
      // On logout: clear all authentication-related data
      return { loading: false, user: {}, isLoggedIn: false, token: "", successMsg: "", errorMsg: "" }

    case SAVE_PROFILE:
      // Save/update user profile data and set user as logged in
      return { 
        loading: false, 
        user: action.payload.user, 
        isLoggedIn: true, 
        token: action.payload.token, 
        successMsg: "", 
        errorMsg: "" 
      }

    default:
      // If action is not recognized, return current state
      return state;
  }
}

export default authReducer;
