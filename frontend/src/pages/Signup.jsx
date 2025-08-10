import React, { useEffect } from 'react'
import SignupForm from '../components/SignupForm';
import MainLayout from '../layouts/MainLayout'

const Signup = () => {

  useEffect(() => {
    // Set the page title when the Signup page is rendered
    document.title = "Signup";
  }, []);

  return (
    <>
      <MainLayout>
        {/* Display the signup form inside the main layout */}
        <SignupForm />
      </MainLayout>
    </>
  )
}

export default Signup
