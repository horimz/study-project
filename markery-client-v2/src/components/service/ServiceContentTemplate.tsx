import React from "react";
import styled from "styled-components";
import { StyledSegmentBox } from "../common/SegmentBox";
import { media } from "../../lib/styles";

const ServiceContentTemplateBlock = styled.div`
  width: 1000px;
  margin: 10rem 2rem;
  justify-content: flex-start;
  align-items: flex-start;
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
