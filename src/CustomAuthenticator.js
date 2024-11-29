import React, { useState, useEffect } from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import { Auth, Amplify } from 'aws-amplify';
import MainApp from './MainApp';
import { awsExports } from './aws-exports';
import { useUser } from './context/UserContext';

Amplify.configure({
  Auth: {
    region: awsExports.REGION,
    userPoolId: awsExports.USER_POOL_ID,
    userPoolWebClientId: awsExports.USER_POOL_APP_CLIENT_ID,
  },
});

const CustomAuthenticator = () => {
  const [jwtToken, setJwtToken] = useState('');
  const { setCurrentUser } = useUser();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        setCurrentUser(user);
        const session = await Auth.currentSession();
        setJwtToken(session.getIdToken().getJwtToken());
      } catch (err) {
        console.log('No authenticated user');
      }
    };
    checkUser();
  }, [setCurrentUser]);

  const handleAuthStateChange = async (state) => {
    if (state === 'signedIn') {
      const user = await Auth.currentAuthenticatedUser();
      setCurrentUser(user);
      const session = await Auth.currentSession();
      setJwtToken(session.getIdToken().getJwtToken());
    }
  };

  return (
    <div style={{ 
      position: 'relative',
      minHeight: 'calc(100vh - 150px)',
      marginTop: '150px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      overflow: 'visible',
      zIndex: 1,
      padding: '20px 0',
      width: '100%',
      maxWidth: '100vw'
    }}>
      <div style={{ 
        backgroundImage: `url(${process.env.PUBLIC_URL + './homepg-bgjpg.jpg'})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        filter: 'blur(5px)', 
        opacity: 0.5, 
        position: 'fixed',
        top: '150px',
        left: 0, 
        width: '100%',
        height: 'calc(100vh - 150px)',
        zIndex: -1,
      }}></div>
      <Authenticator
        style={{
          marginTop: '20px',
          position: 'relative',
          zIndex: 2,
          width: '100%',
          maxWidth: '460px'
        }}
        components={{
          SignUp: {
            FormFields() {
              return (
                <>
                  <div className="amplify-field-group">
                    <label className="amplify-label" htmlFor="given_name" style={{ marginBottom: '16px' }}>Nome</label>
                    <div className="amplify-flex amplify-field-group amplify-field-group--horizontal" data-orientation="horizontal" style={{ marginTop: '7px', borderRadius: '5px' }}>
                      <div className="amplify-field-group__field-wrapper amplify-field-group__field-wrapper--horizontal" data-orientation="horizontal">
                        <input className="amplify-input amplify-field-group__control" name="given_name" placeholder="Digite seu nome" required style={{ borderRadius: '7px' }} />
                      </div>
                    </div>
                  </div>
                  <div className="amplify-field-group">
                    <label className="amplify-label" htmlFor="family_name" style={{ marginBottom: '16px' }}>Sobrenome</label>
                    <div className="amplify-flex amplify-field-group amplify-field-group--horizontal" data-orientation="horizontal" style={{ marginTop: '7px' }}>
                      <div className="amplify-field-group__field-wrapper amplify-field-group__field-wrapper--horizontal" data-orientation="horizontal">
                        <input className="amplify-input amplify-field-group__control" name="family_name" placeholder="Digite seu sobrenome" required style={{ borderRadius: '7px' }} />
                      </div>
                    </div>
                  </div>
                  <div className="amplify-field-group">
                    <label className="amplify-label" htmlFor="email" style={{ marginBottom: '16px' }}>Email</label>
                    <div className="amplify-flex amplify-field-group amplify-field-group--horizontal" data-orientation="horizontal" style={{ marginTop: '7px' }}>
                      <div className="amplify-field-group__field-wrapper amplify-field-group__field-wrapper--horizontal" data-orientation="horizontal">
                        <input className="amplify-input amplify-field-group__control" name="email" placeholder="Digite seu email" required style={{ borderRadius: '7px' }} />
                      </div>
                    </div>
                  </div>
                  <Authenticator.SignUp.FormFields />
                </>
              );
            },
          }
        }}
        onStateChange={handleAuthStateChange}
      >
        {({ signOut, user }) => (
          <MainApp signOut={signOut} user={user} jwtToken={jwtToken} />
        )}
      </Authenticator>
    </div>
  );
};

export default CustomAuthenticator;