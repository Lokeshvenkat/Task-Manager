import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import api from "../api"; // Axios instance or API wrapper

/**
 * Custom hook for making API requests with loading, success, and error state management.
 * Also supports toast notifications for success and error messages.
 */
const useFetch = () => {
  // State to track API request status and response data
  const [state, setState] = useState({
    loading: false,     // Indicates if the request is in progress
    data: null,         // Stores the successful response data
    successMsg: "",     // Stores the success message
    errorMsg: "",       // Stores the error message
  });

  /**
   * fetchData - Executes an API request.
   * @param {Object} config - Axios request configuration object.
   * @param {Object} otherOptions - Optional settings (toast control).
   */
  const fetchData = useCallback(async (config, otherOptions) => {
    const { showSuccessToast = true, showErrorToast = true } = otherOptions || {};
    setState(prev => ({ ...prev, loading: true })); // Start loading

    try {
      // Perform API request
      const { data } = await api.request(config);

      // Update state with success response
      setState({
        loading: false,
        data,
        successMsg: data.msg || "success",
        errorMsg: ""
      });

      // Show success toast if enabled
      if (showSuccessToast) toast.success(data.msg);
      return Promise.resolve(data);

    } catch (error) {
      // Extract meaningful error message
      const msg = error.response?.data?.msg || error.message || "error";

      // Update state with error info
      setState({
        loading: false,
        data: null,
        errorMsg: msg,
        successMsg: ""
      });

      // Show error toast if enabled
      if (showErrorToast) toast.error(msg);
      return Promise.reject();
    }
  }, []);

  // Return the fetch function and the current state
  return [fetchData, state];
};

export default useFetch;
