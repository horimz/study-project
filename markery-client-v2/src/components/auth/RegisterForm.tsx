import React from "react";
import styled from "styled-components";
import { palette } from "../../lib/styles";
import { Link } from "react-router-dom";
import { AuthFormTemplate } from "./AuthFormTemplate";
import { Button } from "../common/Button";
import { Input } from "../common/Input";
import { Spinner } from "../common/Spinner";
import { useInputs } from "../../lib/hooks";

const RegisterFormErrorBlock = styled.div`
  margin-top: 1.2rem;
  color: ${palette.error};
`;

export type RegisterInputs = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};

interface RegisterFormProps {
  onSubmit: (data: RegisterInputs) => void;
  error: string | null;
  isLoading: boolean;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  error,
  onSubmit,
  isLoading
}) => {
  const [inputs, onChange] = useInputs({
    email: "",
    username: "",
    password: "",
    confirmPassword: ""
  });

  return (
    <AuthFormTemplate>
      <h1>
        Sign up to <span>Markery</span>
      </h1>
      <div>
        Already have an account? <Link to='/login'>Log in</Link>
      </div>
      <form>
        <Input
          id='register-email'
          label='Email'
          name='email'
          value={inputs.email}
          onChange={onChange}
          type='text'
          placeholder='e.g. rita@example.com'
          autoComplete='email'
          clearBackground
          autoFocus
        />
        <Input
          id='register-username'
          label='Username'
          name='username'
          value={inputs.username}
          onChange={onChange}
          type='text'
          placeholder='Rita'
          autoComplete='username'
          clearBackground
        />
        <Input
          id='register-password'
          label='Password'
          name='password'
          value={inputs.password}
          onChange={onChange}
          type='password'
          placeholder='Enter a secure password'
          autoComplete='new-password'
          clearBackground
        />
        <Input
          id='register-confirm-password'
          label='Confirm password'
          name='confirmPassword'
          value={inputs.confirmPassword}
          onChange={onChange}
          type='password'
          placeholder='Confirm your password'
          autoComplete='new-password'
          clearBackground
        />
        <RegisterFormErrorBlock>{error}</RegisterFormErrorBlock>
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
              SIGNING UP
            </>
          ) : (
            "SIGN UP"
          )}
        </Button>
      </form>
    </AuthFormTemplate>
  );
};

export { RegisterForm };
