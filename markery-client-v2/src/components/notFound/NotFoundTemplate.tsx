import React from "react";
import styled from "styled-components";
import { palette, mixin } from "../../lib/styles";

const NotFoundTemplateBlock = styled.div`
  height: 100vh;
  ${mixin.flexCenter}
  background-color: ${palette.text};
`;

interface NotFoundTemplateProps {}

const NotFoundTemplate: React.FC<NotFoundTemplateProps> = ({ children }) => {
  return <NotFoundTemplateBlock>{children}</NotFoundTemplateBlock>;
};

export { NotFoundTemplate };
