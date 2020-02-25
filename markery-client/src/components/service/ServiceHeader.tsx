import React from 'react';
import { useCustomLocation } from '../../modules/hooks';
import { ServiceSearch } from './ServiceSearch';
import { ServiceProfile } from './ServiceProfile';
import './ServiceHeader.scss';

interface ServiceHeaderProps {}

export const ServiceHeader: React.FC<ServiceHeaderProps> = props => {
  const { folderName, isServiceHome } = useCustomLocation();

  // TODO: fetch all parent folders to display path
  const renderPath = () => {
    if (isServiceHome) return <div>Markery Home</div>;
    return (
      <div className='service-header__left__path'>
        <span className='icon folder'></span>
        {folderName}
      </div>
    );
  };

  return (
    <div className='service-header'>
      <div className='service-header__container'>
        <div className='service-header__left'>{renderPath()}</div>
        <div className='service-header__right'>
          <ServiceSearch />
          <ServiceProfile />
        </div>
      </div>
    </div>
  );
};
