import React from 'react';
import { z } from 'zod';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Form from '../components/Form';
import AuthContainer from '../components/AuthContainer'; 

const schema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(1, 'Le mot de passe est requis'),
});

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Échec de la connexion. Veuillez vérifier vos identifiants.');
    }
  };

  return (
    <AuthContainer>
      <h2>Connexion</h2>
      <Form schema={schema} onSubmit={onSubmit} buttonText="Se connecter">
        {(register, errors) => (
          <>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                id="email"
                {...register('email')}
              />
              {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="password">Mot de passe</label>
              <input
                type="password"
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                id="password"
                {...register('password')}
              />
              {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
            </div>
          </>
        )}
      </Form>
    </AuthContainer>
  );
};

export default Login;
