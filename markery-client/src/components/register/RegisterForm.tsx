import React, { useState } from 'react';
import { useAuth } from '../../modules/hooks';
import { Link } from 'react-router-dom';
import { Button } from '../common/Button';
import './RegisterForm.scss';

interface RegisterFormProps {}

export const RegisterForm: React.FC<RegisterFormProps> = props => {
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmedPassword, setConfirmedPassword] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState('');
  const { addNewUser } = useAuth();

  const onCreate = (e: React.FormEvent) => {
    e.preventDefault();

    // validate input
    if (!email) return setErrorMsg('Please enter a valid email.');
    if (!username) return setErrorMsg('Please enter a username.');
    if (!description)
      return setErrorMsg('Please enter a short description about you.');
    if (!password) return setErrorMsg('Please enter a password.');
    if (password !== confirmedPassword)
      return setErrorMsg('Please double check your password.');

    setErrorMsg('');

    const newUser = {
      email,
      username,
      description,
      password
    };

    addNewUser(newUser);
  };

  return (
    <div className='register-form'>
      <h1 className='heading-1'>Welcome!</h1>
      <div className='register-form__description'>
        Please enter your information
      </div>

      <form className='register-form__box'>
        <div className='register-form__group'>
          <input
            id='register-email'
            type='email'
            placeholder='Enter your email'
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
          <label htmlFor='register-email'>Email</label>
        </div>

        <div className='register-form__group'>
          <input
            id='register-username'
            type='text'
            placeholder='Enter a username'
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
            autoComplete='username'
          />
          <label htmlFor='register-username'>Username</label>
        </div>

        <div className='register-form__group'>
          <input
            id='register-description'
            type='text'
            placeholder='Tell us about you'
            value={description}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setDescription(e.target.value)
            }
          />
          <label htmlFor='register-description'>Description</label>
        </div>

        <div className='register-form__group'>
          <input
            id='register-password'
            type='password'
            placeholder='Enter a password'
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            autoComplete='new-password'
          />
          <label htmlFor='register-password'>Password</label>
        </div>

        <div className='register-form__group'>
          <input
            id='register-password-confirm'
            type='password'
            placeholder='Confirm your password'
            value={confirmedPassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setConfirmedPassword(e.target.value)
            }
            autoComplete='new-password'
          />
          <label htmlFor='register-password-confirm'>Confirm password</label>
        </div>

        <div className='register-form__error'>{errorMsg}</div>

        <div className='register-form__actions'>
          <Link to='/' style={{ textDecoration: 'none' }}>
            <Button secondary>Cancel</Button>
          </Link>

          <Button onClick={onCreate}>Create account</Button>
        </div>
      </form>
    </div>
  );
};
