import React from "react";
import styled, { keyframes } from "styled-components";
import { palette } from "../../lib/styles";

const loadingGradient = keyframes`
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: -200% 0%;
  }`;

const SkeletonBlock = styled.div`
  width: 100%;
  .service-skeleton__area {
    &::after {
      content: "";
      height: 12px;
      width: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background: linear-gradient(to left, ${palette.grey1}, ${palette.grey3});
      background-size: 200% 200%;
      animation: ${loadingGradient} 1.4s infinite;
    }
    .service-skeleton {
      width: 100%;
      height: 60px;
      background-image: linear-gradient(45deg, #e8e8e8, #ddd);
      background-size: 100%;
      margin-bottom: 2.4rem;
      border-radius: 8px;
    }
  }
`;

interface SkeletonProps {}

const Skeleton: React.FC<SkeletonProps> = props => {
  return (
    <SkeletonBlock>
      <div className='service-skeleton__area'>
        <div className='service-skeleton'></div>
        <div className='service-skeleton'></div>
        <div className='service-skeleton'></div>
        <div className='service-skeleton'></div>
        <div className='service-skeleton'></div>
        <div className='service-skeleton'></div>
        <div className='service-skeleton'></div>
        <div className='service-skeleton'></div>
        <div className='service-skeleton'></div>
        <div className='service-skeleton'></div>
        <div className='service-skeleton'></div>
        <div className='service-skeleton'></div>
        <div className='service-skeleton'></div>
        <div className='service-skeleton'></div>
        <div className='service-skeleton'></div>
      </div>
    </SkeletonBlock>
  );
};

export { Skeleton };
