import React from 'react';
import Navbar from '../components/Navbar';

/**
 * MainLayout - A wrapper layout for pages that includes
 * a Navbar and consistent page styling.
 * 
 * @param {ReactNode} children - The main page content to be rendered inside the layout.
 */
const MainLayout = ({ children }) => {
  return (
    <>
      {/* Main container with fixed screen size, light background, and hidden horizontal scroll */}
      <div className='relative bg-gray-50 h-screen w-screen overflow-x-hidden'>
        
        {/* Global navigation bar */}
        <Navbar />

        {/* Page-specific content injected here */}
        {children}
      </div>
    </>
  );
};

export default MainLayout;
