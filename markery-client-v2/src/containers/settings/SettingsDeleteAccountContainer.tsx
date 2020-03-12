import React from "react";
import { SettingsDeleteAccount } from "../../components/settings/SettingsDeleteAccount";
import { useAuth, useLoading } from "../../lib/hooks";

interface SettingsDeleteAccountContainerProps {}

const SettingsDeleteAccountContainer: React.FC<SettingsDeleteAccountContainerProps> = props => {
  const { auth, deleteUserRequest } = useAuth();
  const { loading, LoadingType } = useLoading();

  if (!auth.user || !auth.user.email) return null;

  return (
    <SettingsDeleteAccount
      onDelete={deleteUserRequest}
      isLoading={loading.isLoading && loading.type === LoadingType.deleteUser}
      email={auth.user.email}
    />
  );
};

export { SettingsDeleteAccountContainer };
