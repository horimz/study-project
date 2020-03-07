import React from "react";
import { Helmet } from "react-helmet-async";
import { AuthTemplate } from "../components/auth/AuthTemplate";
import { RegisterForm } from "../components/auth/RegisterForm";

interface RegisterPageProps {}

const RegisterPage: React.FC<RegisterPageProps> = props => {
  return (
    <AuthTemplate>
      <Helmet>
        <title>Register - Markery</title>
      </Helmet>
      <RegisterForm />
    </AuthTemplate>
  );
};

export { RegisterPage as default };
