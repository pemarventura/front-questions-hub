// src/MainApp.js
import React from 'react';
import './MainApp.css';

const MainApp = ({ signOut, user, jwtToken }) => {
  return (
    <div className="main-app-container">
      <div className="main-app-header">
        <h2>Welcome, {user.username}!</h2>
        <button className="sign-out-button" onClick={signOut}>
          Sign out
        </button>
      </div>
      <div className="main-app-content">
        <h4>Your JWT token:</h4>
        <div className="token-container">
          {jwtToken}
        </div>
      </div>
    </div>
  );
};

export default MainApp;