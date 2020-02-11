import React from 'react';

interface DropDownProps {
  toggler?: any;
  content: any;
}

const _openDropdown = () => {
  const backdrop = document.querySelector('.backdrop-dropdown');
  const dropdown = document.querySelector('.dropdown__content');

  if (backdrop && dropdown) {
    backdrop.classList.add('open');
    dropdown.classList.add('open');
  }
};

const _closeDropdown = () => {
  const backdrop = document.querySelector('.backdrop-dropdown');
  const dropdown = document.querySelector('.dropdown__content');

  if (backdrop && dropdown) {
    backdrop.classList.remove('open');
    dropdown.classList.remove('open');
  }
};

const _Dropdown: React.FC<DropDownProps> = props => {
  return (
    <div className='dropdown'>
      <div onClick={_closeDropdown} className='backdrop-dropdown'></div>

      <div onClick={_openDropdown} className='dropdown__toggler'>
        {props.toggler}
      </div>
      <div id='myDropdown' className='dropdown__content'>
        {props.content}
      </div>
    </div>
  );
};

export const Dropdown = _Dropdown;
