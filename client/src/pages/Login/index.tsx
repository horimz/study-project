import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { StoreState } from '../../common/reducers';
import { IUser, login } from '../../common/actions';

interface LoginProps {
  auth: IUser | boolean;
  login: Function;
}

const _Login: React.FC<LoginProps> = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onSubmit = (e: React.MouseEvent) => {
    e.preventDefault();

    // client side validation
    if (!email || !password) {
      setError('Please provide a username and password.');
      return;
    }

    const user = {
      email,
      password
    };

    props.login(user);
  };

  if (props.auth) return <Redirect to='/main' />;

  return (
    <div>
      <div className='login'>
        <div className='login__header'>
          <h1>Markery</h1>
        </div>

        <div className='login__box'>
          <div className='login__logo'>Logo</div>

          <div className='login__form'>
            <form className='form'>
              <div className='u-mb-sm'>
                <p className='form__header-1'>Login</p>
              </div>

              <div className='form__group'>
                <label htmlFor='email' className='form__label'>
                  Email
                </label>
                <input
                  type='text'
                  className='form__input'
                  id='email'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                ></input>
              </div>

              <div className='form__group'>
                <label htmlFor='password' className='form__label'>
                  Password
                </label>
                <input
                  type='password'
                  className='form__input'
                  id='password'
                  autoComplete='off'
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>

              <div className='form__errors u-mb-sm'>{error}</div>

              <button
                onClick={e => onSubmit(e)}
                className='btn btn--primary'
                style={{ width: '100%' }}
              >
                Login
              </button>
            </form>

            <div className='login__redirect'>
              New to Markery?&nbsp;
              <Link to='/signup' className='login__redirect__link'>
                Create an account.
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ auth }: StoreState): { auth: any } => {
  return { auth };
};

export const Login = connect(mapStateToProps, { login })(_Login);
