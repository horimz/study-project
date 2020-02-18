import React from 'react';
import './Spinner.scss';

const _Spinner: React.FC = () => {
  return (
    <div className='lds-ring'>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export const Spinner = _Spinner;
