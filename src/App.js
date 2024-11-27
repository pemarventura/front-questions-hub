// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import { Amplify, Auth, Hub } from 'aws-amplify';
import { awsExports } from './aws-exports';
import '@aws-amplify/ui-react/styles.css';
import Layout from './components/layout/Layout';
import CustomAuthenticator from './CustomAuthenticator';
import MainApp from './MainApp';

function App() {
  const [jwtToken, setJwtToken] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
          setUser(null);
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
      setUser(currentUser);
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
    return <div>Carregando...</div>;
  }

  if (isAuthenticated) {
    return <MainApp signOut={handleSignOut} user={user} jwtToken={jwtToken} />;
  }

  return (
    <Layout>
      <CustomAuthenticator />
    </Layout>
  );
}

export default App;