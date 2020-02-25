import React from 'react';
import { useAuth } from '../../modules/hooks';
import './SettingEmail.scss';

interface SettingEmailProps {}

export const SettingEmail: React.FC<SettingEmailProps> = props => {
  const { auth } = useAuth();

  const currentUser: any = auth;

  return (
    <div className='setting-email'>
      <div className='setting-email__content'>
        <h3 className='heading-3 setting-email__header'>Email address</h3>
        <div className='setting-email__email'>{currentUser.email}</div>
      </div>
      <div className='setting-email__description'>
        This is the address where you receive membership verification or emails
        from us.
      </div>
    </div>
  );
};
