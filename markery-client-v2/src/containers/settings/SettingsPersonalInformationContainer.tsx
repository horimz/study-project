import React from "react";
import { useAuth, useLoading } from "../../lib/hooks";
import { SettingsPersonalInformation } from "../../components/settings/SettingsPersonalInformation";

interface SettingsPersonalInformationContainerProps {}

const SettingsPersonalInformationContainer: React.FC<SettingsPersonalInformationContainerProps> = props => {
  const { auth, updateUserRequest } = useAuth();
  const { loading, LoadingType } = useLoading();

  if (!auth.user) return null;

  return (
    <SettingsPersonalInformation
      user={auth.user}
      onUpdate={updateUserRequest}
      isLoading={loading.isLoading && loading.type === LoadingType.updateUser}
    />
  );
};

export { SettingsPersonalInformationContainer };
