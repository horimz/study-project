import React from "react";
import styled from "styled-components";
import { palette } from "../../lib/styles";

const ServiceTemplateBlock = styled.div`
  display: flex;
  justify-content: center;
  min-height: 100vh;
  position: relative;
  background-color: ${palette.background};
`;

interface ServiceTemplateProps {}

const ServiceTemplate: React.FC<ServiceTemplateProps> = ({ children }) => {
  return <ServiceTemplateBlock>{children}</ServiceTemplateBlock>;
};

export { ServiceTemplate };
