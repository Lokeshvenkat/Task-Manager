import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Task from "./pages/Task";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { saveProfile } from "./redux/actions/authActions";
import NotFound from "./pages/NotFound";

function App() {
  // Access authentication state from Redux store
  const authState = useSelector(state => state.authReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    // On app mount, check if token exists in localStorage
    const token = localStorage.getItem("token");
    // If token exists, fetch and store user profile in Redux
    if (token) {
      dispatch(saveProfile(token));
    }
    // Only run on initial mount
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public home page */}
          <Route path="/" element={<Home />} />

          {/* Sign-up page: redirect to home if already logged in */}
          <Route
            path="/signup"
            element={authState.isLoggedIn ? <Navigate to="/" /> : <Signup />}
          />

          {/* Login page: redirect to home if already logged in */}
          <Route
            path="/login"
            element={authState.isLoggedIn ? <Navigate to="/" /> : <Login />}
          />

          {/* Add new task: protected route */}
          <Route
            path="/tasks/add"
            element={
              authState.isLoggedIn
                ? <Task />
                : <Navigate to="/login" state={{ redirectUrl: "/tasks/add" }} />
            }
          />

          {/* View/edit specific task: protected route */}
          <Route
            path="/tasks/:taskId"
            element={
              authState.isLoggedIn
                ? <Task />
                : <Navigate to="/login" state={{ redirectUrl: window.location.pathname }} />
            }
          />

          {/* Fallback page for unknown routes */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
