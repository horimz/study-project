import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { AuthFormTemplate } from "./AuthFormTemplate";
import { Button } from "../common/Button";
import { Input } from "../common/Input";
import { useInputs } from "../../lib/hooks";

export type LoginInputs = {
  email: string;
  password: string;
};

const LoginTextBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;
`;

interface LoginFormProps {}

const LoginForm: React.FC<LoginFormProps> = props => {
  const [inputs, onChange] = useInputs({
    email: "",
    password: ""
  });

  return (
    <AuthFormTemplate>
      <h1>
        Log in to <span>Markery</span>
      </h1>
      <Input
        id='login-email'
        label='Email'
        name='email'
        value={inputs.email}
        onChange={onChange}
        type='text'
        autoComplete='email'
        autoFocus
      />
      <Input
        id='login-password'
        label='Password'
        name='password'
        value={inputs.password}
        onChange={onChange}
        type='password'
        autoComplete='new-password'
      />
      <Button color='green' strech>
        LOG IN
      </Button>
      <LoginTextBlock>
        <Link to='/forgot-password'>Forgot password?</Link>
        <div>
          Don't have an account? <Link to='/register'>Sign up</Link>
        </div>
      </LoginTextBlock>
    </AuthFormTemplate>
  );
};

export { LoginForm };
