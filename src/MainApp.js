import React from 'react';

const MainApp = ({ signOut, user, jwtToken }) => {
  return (
    <div>
      Welcome {user.username}
      <button onClick={signOut}>Sign out</button>
      <h4>Your JWT token:</h4>
      {jwtToken}
    </div>
  );
};

export default MainApp;