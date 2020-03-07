import React from "react";
import styled from "styled-components";
import { palette, media } from "../../lib/styles";
import { StyledSegmentBox } from "../common/SegmentBox";

const AuthFormTemplateBlock = styled(StyledSegmentBox)`
  margin: 6.5rem 0;
  width: 400px;
  ${media.custom(400)} {
    width: 100%;
  }
`;

const AuthFormBlock = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 15px 30px 30px;
  h1 {
    font-size: 24px;
    font-weight: 400;
    margin: 16px 0;
    span {
      font-weight: 600;
    }
  }
  button {
    margin-top: 15px;
    text-transform: uppercase;
  }
  a {
    color: ${palette.green7};
    &:hover {
      text-decoration: underline;
    }
  }
`;

interface AuthFormTemplateProps {}

const AuthFormTemplate: React.FC<AuthFormTemplateProps> = ({ children }) => {
  return (
    <AuthFormTemplateBlock>
      <AuthFormBlock>{children}</AuthFormBlock>
    </AuthFormTemplateBlock>
  );
};

export { AuthFormTemplate };
