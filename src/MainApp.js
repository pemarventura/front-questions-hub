// src/MainApp.js
import React from 'react';
import './MainApp.css';
import Question from './components/question/Question';
import CommentSection from './components/commentSection/CommentSection';

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
        <Question />
        <CommentSection />
      </div>
    </div>
  );
};

export default MainApp;