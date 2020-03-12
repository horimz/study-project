import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../lib/hooks";
import { Helmet } from "react-helmet-async";
import { AuthTemplate } from "../components/auth/AuthTemplate";
import { ForgotPasswordForm } from "../components/auth/ForgotPasswordForm";

interface ForgotPasswordPageProps {}

// TODO: create controller to send user a link via email
const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = props => {
  const { auth } = useAuth();
  const history = useHistory();

  useEffect(() => {
    if (auth.user) {
      history.push("/service");
    }
  }, [auth, history]);

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
