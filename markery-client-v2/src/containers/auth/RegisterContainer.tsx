import React, { useState } from "react";
import {
  RegisterForm,
  RegisterInputs
} from "../../components/auth/RegisterForm";
import { useAuth, useLoading } from "../../lib/hooks";

interface RegisterContainerProps {}

const RegisterContainer: React.FC<RegisterContainerProps> = props => {
  const { registerRequest } = useAuth();
  const { loading, LoadingType } = useLoading();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (data: RegisterInputs) => {
    if (!data.email) {
      setError("Please provide a email");
      return;
    }

    if (!data.username) {
      setError("Please provide a username");
      return;
    }

    if (!data.password) {
      setError("Please provide a secure password");
      return;
    }

    if (data.password.length < 8) {
      setError("Password must be at least eight characters");
      return;
    }

    if (!data.confirmPassword) {
      setError("Please confirm your password");
      return;
    }

    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError(null);

    const newUser = { ...data };

    delete newUser.confirmPassword;

    registerRequest(newUser);
  };

  return (
    <RegisterForm
      error={error}
      onSubmit={onSubmit}
      isLoading={loading.isLoading && loading.type === LoadingType.register}
    />
  );
};

export { RegisterContainer };
