import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../lib/hooks";
import { Helmet } from "react-helmet-async";
import { AuthTemplate } from "../components/auth/AuthTemplate";
import { LoginContainer } from "../containers/auth/LoginContainer";

interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = props => {
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
        <title>Login - Markery</title>
      </Helmet>
      <LoginContainer />
    </AuthTemplate>
  );
};

export { LoginPage as default };
