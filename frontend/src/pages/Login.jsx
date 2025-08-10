import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import MainLayout from '../layouts/MainLayout'

const Login = () => {
  // Access the location object to check if there's a redirect URL passed via navigation
  const { state } = useLocation();
  const redirectUrl = state?.redirectUrl || null; // Fallback to null if no redirect is provided

  // Set page title when component mounts
  useEffect(() => {
    document.title = "Login";
  }, []);

  return (
    <>
      <MainLayout>
        {/* Render login form and pass along the redirect URL if provided */}
        <LoginForm redirectUrl={redirectUrl} />
      </MainLayout>
    </>
  )
}

export default Login
