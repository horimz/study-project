import React from "react";
import { Helmet } from "react-helmet-async";
import { AuthTemplate } from "../components/auth/AuthTemplate";
import { ForgotPasswordForm } from "../components/auth/ForgotPasswordForm";

interface ForgotPasswordPageProps {}

const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = props => {
  return (
    <AuthTemplate>
      <Helmet>
        <title>Forgot password - Markery</title>
      </Helmet>
      <ForgotPasswordForm />
    </AuthTemplate>
  );
};

export { ForgotPasswordPage as default };
