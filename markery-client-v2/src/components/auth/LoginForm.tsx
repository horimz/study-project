import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { AuthFormTemplate } from "./AuthFormTemplate";
import { Button } from "../common/Button";
import { Input } from "../common/Input";
import { Spinner } from "../common/Spinner";
import { useInputs } from "../../lib/hooks";
import { palette } from "../../lib/styles";

const LoginTextBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;
`;

const LoginFormErrorBlock = styled.div`
  margin-top: 1.2rem;
  color: ${palette.error};
`;

export type LoginInputs = {
  email: string;
  password: string;
};

interface LoginFormProps {
  onSubmit: (data: LoginInputs) => void;
  error: string | null;
  isLoading: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({
  error,
  onSubmit,
  isLoading
}) => {
  const [inputs, onChange] = useInputs({
    email: "",
    password: ""
  });

  return (
    <AuthFormTemplate>
      <h1>
        Log in to <span>Markery</span>
      </h1>
      <form>
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
        <LoginFormErrorBlock>{error}</LoginFormErrorBlock>
        <Button
          color='green'
          strech
          onClick={e => {
            e.preventDefault();
            onSubmit(inputs);
          }}
          isLoading={isLoading}
        >
          {isLoading ? (
            <>
              <Spinner size='small' />
              LOGGING IN
            </>
          ) : (
            "LOG IN"
          )}
        </Button>
      </form>
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
