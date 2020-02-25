import React from 'react';
import './ServiceSearch.scss';

interface ServiceSearchProps {}

export const ServiceSearch: React.FC<ServiceSearchProps> = props => {
  return (
    <div className='service-search'>
      <span className='icon search small'></span>
      <input type='text' placeholder='Search by keyword' />
    </div>
  );
};
