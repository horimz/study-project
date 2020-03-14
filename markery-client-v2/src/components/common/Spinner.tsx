import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { palette } from '../../lib/styles';

type SpinnerSize = 'tiny' | 'small' | 'medium' | 'large';

const spin = keyframes`
  from {
  -webkit-transform: rotate(0deg);
          transform: rotate(0deg);
  }
  to {
  -webkit-transform: rotate(359deg);
          transform: rotate(359deg);
  }
`;

const SpinnerBlock = styled.div<{ size: SpinnerSize }>`
  display: block;
  height: 18px;
  width: 18px;
  border: 3px ${palette.grey4} solid;
  border-top: 3px white solid;
  border-radius: 50%;
  animation: ${spin} 1s infinite linear;
  ${props =>
    props.size === 'tiny' &&
    css`
      height: 13px;
      width: 13px;
      border: 2px ${palette.grey4} solid;
      border-top: 2px white solid;
    `}
  ${props =>
    props.size === 'small' &&
    css`
      height: 18px;
      width: 18px;
      border: 3.4px ${palette.grey4} solid;
      border-top: 3.4px white solid;
    `}
  ${props =>
    props.size === 'medium' &&
    css`
      height: 34px;
      width: 34px;
      border: 3.8px ${palette.grey4} solid;
      border-top: 3.8px white solid;
    `}
  ${props =>
    props.size === 'large' &&
    css`
      height: 56px;
      width: 56px;
      border: 4px ${palette.grey4} solid;
      border-top: 4px white solid;
    `}
`;

interface SpinnerProps {
  size?: SpinnerSize;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 'medium' }) => {
  return <SpinnerBlock size={size} className='spinner'></SpinnerBlock>;
};

export { Spinner };
