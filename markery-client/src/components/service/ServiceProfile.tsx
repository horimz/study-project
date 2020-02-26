import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../modules/hooks';
import { Dropdown } from '../common/Dropdown';
import './ServiceProfile.scss';

interface ServiceProfileProps {}

export const ServiceProfile: React.FC<ServiceProfileProps> = props => {
  const { auth, onLogout } = useAuth();
  const currentUser: any = auth;

  const toggler = <span className='icon profile'></span>;

  const content = (
    <div className='dropdown__box'>
      <div className='service-profile__box'>
        <div className='service-profile__username'>{currentUser.username}</div>
        <div className='service-profile__email'>{currentUser.email}</div>
      </div>
      <Link to='/setting' className='service-profile__settings'>
        <div className='dropdown__item'>Settings</div>
      </Link>
      <div className='dropdown__item' onClick={onLogout}>
        Log out
      </div>
    </div>
  );

  return (
    <div className='service-profile'>
      <Dropdown toggler={toggler} content={content} />
    </div>
  );
};
