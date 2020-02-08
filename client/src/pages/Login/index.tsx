import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { StoreState } from '../../common/reducers';
import { User, login } from '../../common/actions';

interface LoginProps {
  auth: User | boolean | null;
  login: Function;
}

const _Login: React.FC<LoginProps> = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onSubmit = (e: React.MouseEvent) => {
    e.preventDefault();

    // client side validation
    if (!username || !password) {
      setError('Please provide a username and password.');
      return;
    }

    const user = {
      username,
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
                <label htmlFor='username' className='form__label'>
                  Username
                </label>
                <input
                  type='text'
                  className='form__input'
                  id='username'
                  value={username}
                  onChange={e => setUsername(e.target.value)}
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
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({
  auth
}: StoreState): { auth: User | boolean | null } => {
  return { auth };
};

export const Login = connect(mapStateToProps, { login })(_Login);
