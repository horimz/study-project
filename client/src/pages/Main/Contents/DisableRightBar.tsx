import React from 'react';
import ReactDOM from 'react-dom';

const _DisableRightBar: React.FC = props => {
  const rightbarPortal = document.getElementById('rightbar-portal');

  const content = <div className='backdrop-white'></div>;

  if (!rightbarPortal)
    throw new Error(
      'Create an element with id "rightbarPortal" to use this portal.'
    );
  return ReactDOM.createPortal(content, rightbarPortal);
};

export const DisableRightBar = _DisableRightBar;
