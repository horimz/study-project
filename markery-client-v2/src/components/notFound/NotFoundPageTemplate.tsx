import React from "react";
import styled from "styled-components";
import { palette, mixin } from "../../lib/styles";

const NotFoundPageTemplateBlock = styled.div`
  height: 100vh;
  ${mixin.flexCenter}
  background-color: ${palette.background};
`;

interface NotFoundTemplateProps {}

const NotFoundTemplate: React.FC<NotFoundTemplateProps> = ({ children }) => {
  return <NotFoundPageTemplateBlock>{children}</NotFoundPageTemplateBlock>;
};

export { NotFoundTemplate };
