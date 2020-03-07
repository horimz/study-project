import React from "react";
import styled from "styled-components";
import { palette } from "../../lib/styles";

const NotFoundPageTemplateBlock = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${palette.background};
`;

interface NotFoundTemplateProps {}

const NotFoundTemplate: React.FC<NotFoundTemplateProps> = ({ children }) => {
  return <NotFoundPageTemplateBlock>{children}</NotFoundPageTemplateBlock>;
};

export { NotFoundTemplate };
