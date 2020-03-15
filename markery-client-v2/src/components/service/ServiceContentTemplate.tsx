import React from 'react';
import styled from 'styled-components';
import { StyledSegmentBox } from '../common/SegmentBox';
import { media } from '../../lib/styles';

const ServiceContentTemplateBlock = styled.div`
  width: 1400px;
  margin: 10rem 2rem;
  justify-content: flex-start;
  align-items: flex-start;
  ${media.xxlarge} {
    width: 1300px;
  }
  ${media.xlarge} {
    width: 980px;
  }
  ${media.medium} {
    width: 100%;
    margin: 10rem 0;
  }
`;

const ServiceContentSegmentBlock = styled(StyledSegmentBox)`
  justify-content: flex-start;
  align-items: flex-start;
  padding: 4rem 5rem;
`;

interface ServiceContentTemplateProps {}

const ServiceContentTemplate: React.FC<ServiceContentTemplateProps> = ({
  children
}) => {
  return <ServiceContentTemplateBlock>{children}</ServiceContentTemplateBlock>;
};

export { ServiceContentTemplate, ServiceContentSegmentBlock };
