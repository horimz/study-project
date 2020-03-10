import React from "react";
import styled from "styled-components";
import { palette, mixin } from "../../lib/styles";

const ErrorTemplateBlock = styled.div`
  ${mixin.flexCenter}
  height: 100vh;
  background-color: ${palette.text};
`;

interface ErrorTemplateProps {}

const ErrorTemplate: React.FC<ErrorTemplateProps> = ({ children }) => {
  return <ErrorTemplateBlock>{children}</ErrorTemplateBlock>;
};

export { ErrorTemplate };
