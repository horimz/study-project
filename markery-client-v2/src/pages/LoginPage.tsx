import React from "react";
import { Helmet } from "react-helmet-async";
import { AuthTemplate } from "../components/auth/AuthTemplate";
import { LoginForm } from "../components/auth/LoginForm";

interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = props => {
  return (
    <AuthTemplate>
      <Helmet>
        <title>Login - Markery</title>
      </Helmet>
      <LoginForm />
    </AuthTemplate>
  );
};

export { LoginPage as default };
