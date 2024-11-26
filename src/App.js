import React, { useState, useEffect } from 'react';
import './App.css';
import { Amplify } from 'aws-amplify';
import { awsExports } from './aws-exports';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Auth } from 'aws-amplify';
import Layout from './components/layout/Layout'; // Import the Layout component
import CustomAuthenticator from './CustomAuthenticator'; // Import the CustomAuthenticator component

// Amplify.configure({
//   Auth: {
//     region: awsExports.REGION,
//     userPoolId: awsExports.USER_POOL_ID,
//     userPoolWebClientId: awsExports.USER_POOL_APP_CLIENT_ID,
//     authenticationFlowType: 'USER_PASSWORD_AUTH', // This sets the authentication flow to use password authentication.
//     usernameAttributes: 'email', // Use email as the unique identifier
//   },
// });



function App() {
  const [jwtToken, setJwtToken] = useState('');
  useEffect(() => {
    fetchJwtToken();
  }, []);

  const fetchJwtToken = async () => {
    try {
      const session = await Auth.currentSession();
      const token = session.getIdToken().getJwtToken();
      setJwtToken(token);
    } catch (error) {
      console.log('Error fetching JWT token:', error);
    }
  };

  return (
    <Layout>
          <CustomAuthenticator />
    </Layout>)
}

export default App;
