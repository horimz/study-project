import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { StoreState } from '../../common/reducers';
import { User, addUser } from '../../common/actions';

interface SignUpProps {
  auth: User | boolean | null;
  addUser: Function;
}

const _SignUp: React.FC<SignUpProps> = props => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!username || !password || !email) {
      setError('Please fill out the form.');
      return;
    }

    const user = {
      email,
      username,
      password
    };

    props.addUser(user);
  };

  if (props.auth) return <Redirect to='/main' />;

  return (
    <div>
      <div className='login'>
        <div className='login__header'>
          <h1>Markery</h1>
        </div>

        <div className='login__box'>
          <div className='login__form'>
            <form className='form'>
              <div className='u-mb-sm'>
                <p className='form__header-2'>Sign Up</p>
              </div>

              <div className='form__group'>
                <label htmlFor='email' className='form__label'>
                  Email
                </label>
                <input
                  type='email'
                  className='form__input'
                  id='email'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                ></input>
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
                  required
                  onChange={e => setPassword(e.target.value)}
                />
              </div>

              <div className='form__errors u-mb-sm'>{error}</div>

              <button
                onClick={e => onSubmit(e)}
                className='btn btn--primary'
                style={{ width: '100%' }}
              >
                Create an Account
              </button>
            </form>

            <div className='login__redirect'>
              Already have an account?&nbsp;
              <Link to='/login' className='login__redirect__link'>
                login
              </Link>
            </div>
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

export const SignUp = connect(mapStateToProps, { addUser })(_SignUp);
