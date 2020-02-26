import React from 'react';
import { Link } from 'react-router-dom';
import './ServiceLeftSideBar.scss';

interface ServiceLeftSideBarProps {}

export const ServiceLeftSideBar: React.FC<ServiceLeftSideBarProps> = props => {
  return (
    <div className='service-left-bar'>
      <div className='service-left-bar__container'>
        <div>
          <div className='service-left-bar__logo'>Logo</div>
          <div className='service-left-bar__content'>
            <Link to='/service' className='service-left-bar__link'>
              Home
            </Link>
          </div>
        </div>
        <div className='service-left-bar__bottom'>Bottom</div>
      </div>
    </div>
  );
};
