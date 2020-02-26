import React from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../modules/hooks';
import { useCustomLocation } from '../modules/hooks';
import { ServiceLeftSideBar } from '../components/service/ServiceLeftSideBar';
import { ServiceHeader } from '../components/service/ServiceHeader';
import { ServiceRightSideBar } from '../components/service/ServiceRightSideBar';
import { ServiceModifier } from '../components/service/ServiceModifier';
import { ServiceContent } from '../components/service/ServiceContent';
import './ServicePage.scss';

export const ServicePage: React.FC = () => {
  const { auth } = useAuth();
  const { isValidPath } = useCustomLocation();

  if (!auth) return <Redirect to='/' />;
  if (!isValidPath) return <Redirect to='/service' />;

  return (
    <div className='service'>
      <ServiceLeftSideBar />
      <div className='service__left-pusher'></div>
      <div className='service__container'>
        <ServiceHeader />
        <div className='service__top-pusher'></div>
        <div className='service__content'>
          <div className='service__content-main'>
            <ServiceContent />
          </div>
          <div className='service__right-pusher'></div>
          <ServiceRightSideBar />
          <ServiceModifier />
        </div>
      </div>
    </div>
  );
};
