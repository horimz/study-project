import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../modules/hooks';
import { Link } from 'react-router-dom';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';
import './LoginModal.scss';

interface LoginModalProps {
  visible: boolean;
  onClose(): void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ visible, onClose }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const emailInput = useRef<HTMLInputElement>(null);
  const { onLogin } = useAuth();

  useEffect(() => {
    if (emailInput.current) emailInput.current.focus();
  }, [visible]);

  const closeModal = () => {
    setEmail('');
    setPassword('');
    onClose();
  };

  const onUserLogin = () => {
    const userCredentials = {
      email,
      password
    };
    onLogin(userCredentials);
    closeModal();
  };

  const content = (
    <div className='login-modal'>
      <div className='login-modal__right'>
        <div className='login-modal__right__image'>Image</div>
        <div>Welcome!</div>
      </div>
      <form className='login-modal__left'>
        <div className='login-modal__left__title'>Log in</div>
        <div className='login-modal__left__inputs'>
          <input
            type='email'
            ref={emailInput}
            placeholder='Enter your email'
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            autoComplete='username'
          />
          <input
            type='password'
            placeholder='Enter your password'
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            autoComplete='current-password'
          />
          <div>
            <Button
              size='medium'
              onClick={onUserLogin}
              disabled={!email || !password}
            >
              Log in
            </Button>
          </div>
        </div>
        <div className='login-modal__footer'>
          New to Markery?{' '}
          <Link to='/register' style={{ textDecorationLine: 'none' }}>
            <span>Create account</span>
          </Link>
        </div>
      </form>
    </div>
  );

  return (
    <Modal
      visible={visible}
      content={content}
      onClose={closeModal}
      backdropBlur='little'
    ></Modal>
  );
};
