// src/components/Layout/Layout.js
import React from 'react';
import Header from '../header/Header';
import './Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />  {/* The Header is included in the Layout */}
      <main className="content">
        {children}  {/* Page-specific content will be inserted here */}
      </main>
    </div>
  );
};

export default Layout;
