import React from "react";
import { Link } from "react-router-dom";
import { AuthFormTemplate } from "./AuthFormTemplate";
import { Button } from "../common/Button";
import { Input } from "../common/Input";
import { useInputs } from "../../lib/hooks";

export type RegisterInputs = {
  email: string;
  username: string;
  password: string;
};

interface RegisterFormProps {}

const RegisterForm: React.FC<RegisterFormProps> = props => {
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
      <Button color='green' strech>
        SIGN UP
      </Button>
    </AuthFormTemplate>
  );
};

export { RegisterForm };
