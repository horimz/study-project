import React from "react";
import styled from "styled-components";
import { Button } from "../common/Button";
import { Input } from "../common/Input";
import { AuthFormTemplate } from "./AuthFormTemplate";

const StyledText = styled.p`
  text-align: center;
  margin-bottom: 8px;
`;
interface ForgotPasswordFormProps {}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = props => {
  return (
    <AuthFormTemplate>
      <h1>Reset your password</h1>
      <StyledText>We will send you a link to reset your password.</StyledText>
      <Input
        id='forgot-password-email'
        label='Email'
        type='text'
        placeholder='your@email.com'
        autoComplete='email'
        clearBackground
        autoFocus
      />
      <Button color='green' strech>
        SEND PASSWORD RESET EMAIL
      </Button>
    </AuthFormTemplate>
  );
};

export { ForgotPasswordForm };
