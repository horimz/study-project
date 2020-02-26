import React from 'react';
import classNames from 'classnames';
import './Button.scss';

type ColorType =
  | 'grey'
  | 'lightGrey'
  | 'green'
  | 'black'
  | 'blue'
  | 'red'
  | 'transparentBlue';

type ButtonSize = 'tiny' | 'small' | 'medium' | 'large';

interface ButtonProps {
  style?: {};
  color?: ColorType;
  size?: ButtonSize;
  secondary?: boolean;
  disabled?: boolean;
  strech?: boolean;
  noFill?: boolean;
  transparent?: boolean;
  fixed?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  style = {},
  color = 'black',
  secondary = false,
  size = 'medium',
  disabled = false,
  strech = false,
  noFill = false,
  transparent = false,
  onClick = () => {}
}) => {
  const buttonClassName = classNames(
    `btn ${color} ${size}`,
    { secondary },
    { disabled },
    { strech },
    { 'no-fill': noFill },
    { transparent }
  );

  return (
    <button
      className={buttonClassName}
      onClick={onClick}
      style={style}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
