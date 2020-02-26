import React from 'react';
import { useAuth } from '../modules/hooks';
import { Redirect } from 'react-router-dom';
import { RegisterForm } from '../components/register/RegisterForm';
import './RegisterPage.scss';

interface RegisterPageProps {}

export const RegisterPage: React.FC<RegisterPageProps> = props => {
  const { auth } = useAuth();

  if (auth) return <Redirect to='/service' />;

  return (
    <div className='register'>
      <div className='register__box'>
        <RegisterForm />
      </div>
    </div>
  );
};
