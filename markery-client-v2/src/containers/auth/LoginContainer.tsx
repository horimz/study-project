import React, { useState } from "react";
import { LoginForm, LoginInputs } from "../../components/auth/LoginForm";
import { useAuth, useLoading } from "../../lib/hooks";

interface LoginContainerProps {}

const LoginContainer: React.FC<LoginContainerProps> = props => {
  const { loginRequest } = useAuth();
  const { loading, LoadingType } = useLoading();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (data: LoginInputs) => {
    if (!data.email) {
      setError("Please enter your email");
      return;
    }

    if (!data.password) {
      setError("Please enter your password");
      return;
    }

    setError(null);

    loginRequest(data);
  };

  return (
    <LoginForm
      error={error}
      onSubmit={onSubmit}
      isLoading={loading.isLoading && loading.type === LoadingType.login}
    />
  );
};

export { LoginContainer };
