import React from "react";
import styled from "styled-components";
import { palette } from "../../lib/styles";

const AuthTemplateBlock = styled.div`
  background-color: ${palette.background};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

interface AuthTemplateProps {}

const AuthTemplate: React.FC<AuthTemplateProps> = ({ children }) => {
  return <AuthTemplateBlock>{children}</AuthTemplateBlock>;
};

export { AuthTemplate };
