import api from "../../api";
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, SAVE_PROFILE } from "./actionTypes";
import { toast } from "react-toastify";

/**
 * Async action to log in a user
 * Dispatches different actions for request, success, and failure
 * Stores token in localStorage upon success
 */
export const postLoginData = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST }); // Notify reducers that login started

    // API call to backend for authentication
    const { data } = await api.post('/auth/login', { email, password });

    // On success, save data in redux state
   dispatch({
  type: LOGIN_SUCCESS,
  payload: { token: data.token, msg: data.msg, user: data.user || {} },
});

// Fetch and save profile if user not in response
if (!data.user) {
  dispatch(saveProfile(data.token));
}

    // Store JWT token in browser storage
    localStorage.setItem('token', data.token);

    // Show success notification
    toast.success(data.msg);

  } catch (error) {
    // Extract readable error message
    const msg = error.response?.data?.msg || error.message;

    // Dispatch failure state
    dispatch({
      type: LOGIN_FAILURE,
      payload: { msg }
    });

    // Show error notification
    toast.error(msg);
  }
}

/**
 * Async action to fetch and save user profile in redux
 * Uses token for authentication
 */
export const saveProfile = (token) => async (dispatch) => {
  try {
    // Fetch user profile data from backend
    const { data } = await api.get('/profile', {
      headers: { Authorization: token }
    });

    // Save profile in redux state
    dispatch({
      type: SAVE_PROFILE,
      payload: { user: data.user, token },
    });

  } catch (error) {
    // Silent fail — could be enhanced to handle token expiration in future
  }
}

/**
 * Clears user session data and redirects to homepage
 */
export const logout = () => (dispatch) => {
  // Remove token from browser storage
  localStorage.removeItem('token');

  // Update redux state to logged out
  dispatch({ type: LOGOUT });

  // Redirect to home page
  document.location.href = '/';
}
