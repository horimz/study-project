import React from 'react';
import styled from 'styled-components';

const ServiceNoContentBlock = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  .service__no-content__box {
    font-size: 2.8rem;
    font-weight: 600;
    padding: 3rem;
    cursor: default;
    h1 {
      margin-bottom: 2.2rem;
    }
  }
  .service__no-content__header {
    margin-bottom: 1.6rem;
    font-size: 2rem;
    font-weight: 600;
    span {
      margin-right: 1rem;
    }
  }
  .service__no-content__text {
    font-size: 2rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    &:not(:last-child) {
      margin-bottom: 1rem;
    }
  }
`;

interface ServiceNoContentProps {}

const ServiceNoContent: React.FC<ServiceNoContentProps> = props => {
  return (
    <ServiceNoContentBlock>
      <div className='service__no-content__box'>
        <h1>Get started</h1>
        <p className='service__no-content__header'>
          <span role='img' aria-label='welcome'>
            👋
          </span>
          Welcome! Try adding folders and urls.
        </p>
      </div>
    </ServiceNoContentBlock>
  );
};

export { ServiceNoContent };
