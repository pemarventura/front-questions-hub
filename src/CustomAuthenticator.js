import React, { useState, useEffect } from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import { Auth, I18n, Amplify } from 'aws-amplify';
import MainApp from './MainApp';
import { awsExports } from './aws-exports';

Amplify.configure({
  Auth: {
    region: awsExports.REGION,
    userPoolId: awsExports.USER_POOL_ID,
    userPoolWebClientId: awsExports.USER_POOL_APP_CLIENT_ID,
    // authenticationFlowType: 'USER_PASSWORD_AUTH', // This sets the authentication flow to use password authentication.
  },
});


I18n.putVocabularies({
  'pt': {
    'Sign In': 'Entrar',
    'Sign Up': 'Cadastrar',
    'Email': 'Email',
    'Enter your Email': 'Digite seu email',
    'Password': 'Senha',
    'Enter your username': 'Digite seu nome de usuário',
    'Enter your password': 'Digite sua senha',
    'Sign in': 'Entrar',
    'Forgot your password?': 'Esqueceu sua senha?',
    'Reset password': 'Redefinir senha',
    'Name': 'Nome',
    'Family Name': 'Sobrenome',
    'Confirm Password': 'Confirmar Senha',
    'Username': 'Nome de usuário',
    'Create Account': 'Criar conta',
    'Enter your Username': 'Digite seu nome de usuário',
    'Enter your Password': 'Digite sua senha',
    'Please confirm your Password': 'Por favor, confirme sua senha',
    'We Emailed You': 'Enviamos um email para você',
    'Confirmation Code': 'Código de confirmação',
    'Enter your code': 'Digite seu código',
    'Confirm': 'Confirmar',
    'Resend Code': 'Reenviar código',
    'It may take a minute to arrive': 'Pode demorar um minuto para chegar',
    'Your code is on the way. To log in, enter the code we emailed you to': 'Seu código está a caminho. Para fazer login, digite o código que enviamos para',
    'Your': 'Seu',
    'Signing in': 'Entrando',
    // Add more translations here if needed
  },
});

I18n.setLanguage('pt');

// I18n.get("Sign In");


const CustomAuthenticator = () => {
  const [jwtToken, setJwtToken] = useState('');

  useEffect(() => {
    Auth.currentSession()
      .then(data => setJwtToken(data.getIdToken().getJwtToken()))
      .catch(err => console.log(err));
  }, []);

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
        position: 'fixed', // Changed to fixed
        top: '150px', // Match container marginTop
        left: 0, 
        width: '100%',
        height: 'calc(100vh - 150px)', // Match container height
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
      >
        {({ signOut, user }) => (
          <MainApp signOut={signOut} user={user} jwtToken={jwtToken} />
        )}
      </Authenticator>
    </div>
  );
};

export default CustomAuthenticator;
