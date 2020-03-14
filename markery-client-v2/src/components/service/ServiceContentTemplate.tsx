import React from 'react';
import styled from 'styled-components';
import { StyledSegmentBox } from '../common/SegmentBox';
import { media } from '../../lib/styles';

const ServiceContentTemplateBlock = styled.div`
  width: 1800px;
  margin: 10rem 2rem;
  justify-content: flex-start;
  align-items: flex-start;
  ${media.xxlarge} {
    width: 1360px;
  }
  ${media.xlarge} {
    width: 1000px;
  }
  ${media.custom(1040)} {
    width: 100%;
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
