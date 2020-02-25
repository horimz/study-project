import React from 'react';
import classNames from 'classnames';
import './Toggler.scss';

type ColorType = 'green' | 'blue';

type TogglerSize = 'small' | 'medium' | 'large';

interface TogglerProps {
  style?: {};
  color?: ColorType;
  size?: TogglerSize;
}

export const Toggler: React.FC<TogglerProps> = ({
  style = {},
  color = 'blue',
  size = 'medium'
}) => {
  const switchClassNames = classNames(`toggler__switch ${size}`);
  const checkboxClassNames = classNames(`toggler__checkbox ${color} ${size}`);
  const sliderClassNames = classNames(`toggler__slider ${size}`);

  return (
    <label className={switchClassNames}>
      <input type='checkbox' className={checkboxClassNames} />
      <span className={sliderClassNames}></span>
    </label>
  );
};
