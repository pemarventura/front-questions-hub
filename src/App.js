import React, { useState, useEffect } from 'react';
import './App.css';
import { Amplify } from 'aws-amplify';
import { awsExports } from './aws-exports';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Auth } from 'aws-amplify';
import Layout from './components/layout/Layout'; // Import the Layout component
import loginBackground from './homepg-bgjpg.jpg'; //Import the image
 
Amplify.configure({
  Auth: {
    region: awsExports.REGION,
    userPoolId: awsExports.USER_POOL_ID,
    userPoolWebClientId: awsExports.USER_POOL_APP_CLIENT_ID,
  },
});

function App() {
  const [jwtToken, setJwtToken] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

  useEffect(() => {
    fetchJwtToken();
  }, []);

  const fetchJwtToken = async () => {
    try {
      const session = await Auth.currentSession();
      const token = session.getIdToken().getJwtToken();
      setJwtToken(token);
      setIsLoggedIn(true); // Set the state to logged in
    } catch (error) {
      console.log('Error fetching JWT token:', error);
      setIsLoggedIn(false); // If no token, user is not logged in
    }
  };

  return (
    <div
      className={isLoggedIn ? 'white-background' : 'login-background'}
      style={{ backgroundImage: `url(${isLoggedIn ? '' : loginBackground})` }} // Dynamically set the background image
    >
    <Layout>
      <div className="centered-authenticator">
        <Authenticator
          initialState="signIn"
          components={{
            SignUp: {
              FormFields() {
                return (
                  <>
                    <Authenticator.SignUp.FormFields />
                    <div><label>First name</label></div>
                    <input
                      type="text"
                      name="given_name"
                      placeholder="Please enter your first name"
                    />
                    <div><label>Last name</label></div>
                    <input
                      type="text"
                      name="family_name"
                      placeholder="Please enter your last name"
                    />
                    <div><label>Email</label></div>
                    <input
                      type="text"
                      name="email"
                      placeholder="Please enter a valid email"
                    />
                  </>
                );
              },
            },
          }}
          services={{
            async validateCustomSignUp(formData) {
              if (!formData.given_name) {
                return {
                  given_name: 'First Name is required',
                };
              }
              if (!formData.family_name) {
                return {
                  family_name: 'Last Name is required',
                };
              }
              if (!formData.email) {
                return {
                  email: 'Email is required',
                };
              }
            },
          }}
        >
          {({ signOut, user }) => (
            <div>
              Welcome {user.username}
              <button onClick={signOut}>Sign out</button>
              <h4>Your JWT token:</h4>
              {jwtToken}
            </div>
          )}
        </Authenticator>
      </div>
    </Layout>
  </div>)
}

export default App;
