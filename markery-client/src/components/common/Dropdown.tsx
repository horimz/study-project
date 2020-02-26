import React, { ReactNode, useState } from 'react';
import classNames from 'classnames';
import './Dropdown.scss';

interface DropdownProps {
  toggler: ReactNode;
  content: ReactNode;
}

export const Dropdown: React.FC<DropdownProps> = ({ toggler, content }) => {
  // TODO: close content when window is clicked
  const [visible, setVisible] = useState<boolean>(false);

  const contentClasses = classNames('dropdown__content', { show: visible });

  return (
    <div className='dropdown'>
      <div className='dropdown__toggler' onClick={() => setVisible(!visible)}>
        {toggler}
      </div>
      <div id='dropdown-content' className={contentClasses}>
        {content}
      </div>
    </div>
  );
};
