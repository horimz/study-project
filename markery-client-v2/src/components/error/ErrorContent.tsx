import React from "react";
import styled from "styled-components";
import { StyledSegmentBox } from "../common/SegmentBox";
import { Button } from "../common/Button";
import { FaRegSadTear } from "react-icons/fa";
import { Link } from "react-router-dom";

const ErrorContentBlock = styled(StyledSegmentBox)`
  margin: 0 1rem;
  padding: 2rem 3rem;
  .error-header {
    display: flex;
    align-items: center;
    svg {
      font-size: 3rem;
      margin-right: 1.5rem;
    }
  }
  .error-description {
    margin-top: 1rem;
  }
  .error-action {
    margin-top: 1.5rem;
  }
`;

interface ErrorContentProps {
  resetError: () => void;
}

const ErrorContent: React.FC<ErrorContentProps> = ({ resetError }) => {
  return (
    <ErrorContentBlock>
      <div className='error-header'>
        <FaRegSadTear />
        <h1>Something went wrong...</h1>
      </div>
      <div className='error-description'>
        You might have followed a broken link or entered a URL that doesn't
        exist on this site.
      </div>
      <div className='error-action'>
        <Link to='/'>
          <Button color='green' onClick={() => resetError()}>
            Back to our site
          </Button>
        </Link>
      </div>
    </ErrorContentBlock>
  );
};

export { ErrorContent };
