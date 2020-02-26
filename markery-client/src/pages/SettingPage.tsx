import React from 'react';
import { useAuth } from '../modules/hooks';
import { Redirect } from 'react-router-dom';
import { SettingThumbnail } from '../components/setting/SettingThumbnail';
import { SettingInfo } from '../components/setting/SettingInfo';
import { SettingEmail } from '../components/setting/SettingEmail';
import { SettingAgreement } from '../components/setting/SettingAgreement';
import { SettingDeleteAccount } from '../components/setting/SettingDeleteAccount';
import './SettingPage.scss';

export const SettingPage: React.FC = () => {
  const { auth } = useAuth();

  if (!auth) return <Redirect to='/' />;

  return (
    <div className='setting'>
      <div className='setting__container'>
        <div className='setting__content-top'>
          <SettingThumbnail />
          <SettingInfo />
        </div>
        <div className='setting__content-bottom'>
          <SettingEmail />
          <SettingAgreement />
          <SettingDeleteAccount />
        </div>
      </div>
    </div>
  );
};
