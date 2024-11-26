import React, { useState, useEffect } from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import { Auth, I18n, Amplify } from 'aws-amplify';
import MainApp from './MainApp';
import { awsExports } from './aws-exports';

Amplify.configure({
  ...awsExports,
  Auth: {
    ...awsExports.Auth,
    usernameAttributes: 'email', // Use email as the username
  },
});

I18n.putVocabularies({
  'pt': {
    'Sign In': 'Entrar',
    'Sign Up': 'Cadastrar',
    'Email': 'Email',
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
    // Add more translations here if needed
  },
});

I18n.setLanguage('pt-BR');

const CustomAuthenticator = () => {
  const [jwtToken, setJwtToken] = useState('');

  useEffect(() => {
    Auth.currentSession()
      .then(data => setJwtToken(data.getIdToken().getJwtToken()))
      .catch(err => console.log(err));
  }, []);

  return (
    <Authenticator
      components={{
        SignUp: {
          FormFields() {
            return (
              <>
                <Authenticator.SignUp.FormFields />
                <div className="amplify-field-group">
                  <label className="amplify-label" htmlFor="given_name" style={{ marginBottom: '16px' }}>Nome</label>
                  <div className="amplify-flex amplify-field-group amplify-field-group--horizontal" data-orientation="horizontal" style={{ marginTop: '7px', borderRadius: '5px'}}>
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
                  <div className="amplify-flex amplify-field-group amplify-field-group--horizontal" data-orientation="horizontal" style={{ marginTop: '7px', borderRadius: '5px' }}>
                    <div className="amplify-field-group__field-wrapper amplify-field-group__field-wrapper--horizontal" data-orientation="horizontal">
                      <input className="amplify-input amplify-field-group__control" name="email" placeholder="Digite seu email" required style={{ borderRadius: '7px' }}/>
                    </div>
                  </div>
                </div>
              </>
            );
          },
        },
      }}
    >
      {({ signOut, user }) => (
        <MainApp signOut={signOut} user={user} jwtToken={jwtToken} />
      )}
    </Authenticator>
  );
};

export default CustomAuthenticator;
