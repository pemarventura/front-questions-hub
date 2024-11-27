import React, { useState, useEffect } from 'react';
import './App.css';
import { Amplify, Auth, Hub } from 'aws-amplify';
import { awsExports } from './aws-exports';
import '@aws-amplify/ui-react/styles.css';
import Layout from './components/layout/Layout';
import CustomAuthenticator from './CustomAuthenticator';
import MainApp from './MainApp';
import { UserProvider, useUser } from './context/UserContext';

function App() {
  const [jwtToken, setJwtToken] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const { setCurrentUser } = useUser();

  useEffect(() => {
    checkAuthState();

    // Listen for auth events
    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
          checkAuthState();
          break;
        case 'signOut':
          setIsAuthenticated(false);
          setCurrentUser(null);
          setJwtToken('');
          break;
        default:
          break;
      }
    });
  }, []);

  const checkAuthState = async () => {
    try {
      const session = await Auth.currentSession();
      const currentUser = await Auth.currentAuthenticatedUser();
      setJwtToken(session.getIdToken().getJwtToken());
      setCurrentUser(currentUser);
      setIsAuthenticated(true);
    } catch (error) {
      console.log('Error fetching JWT token:', error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log('Error signing out:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return <MainApp signOut={handleSignOut} jwtToken={jwtToken} />;
  }

  return (
    <Layout>
      <CustomAuthenticator />
    </Layout>
  );
}

export default () => (
  <UserProvider>
    <App />
  </UserProvider>
);