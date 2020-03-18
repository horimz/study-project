import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../lib/hooks";
import { Helmet } from "react-helmet-async";
import { AuthTemplate } from "../components/auth/AuthTemplate";
import { RegisterContainer } from "../containers/auth/RegisterContainer";

interface RegisterPageProps {}

const RegisterPage: React.FC<RegisterPageProps> = props => {
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
        <title>Register - Markery</title>
      </Helmet>
      <RegisterContainer />
    </AuthTemplate>
  );
};

export { RegisterPage as default };
