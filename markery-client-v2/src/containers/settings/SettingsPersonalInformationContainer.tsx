import React from 'react';
import { useAuth, useLoading } from '../../lib/hooks';
import { UpdateUserInput } from '../../lib/api/auth/types';
import { SettingsPersonalInformation } from '../../components/settings/SettingsPersonalInformation';

interface SettingsPersonalInformationContainerProps {}

const SettingsPersonalInformationContainer: React.FC<SettingsPersonalInformationContainerProps> = props => {
  const { auth, updateUserRequest } = useAuth();
  const { loading, LoadingType } = useLoading();

  if (!auth.user) return null;

  const onUpdate = (data: UpdateUserInput) => {
    if (!auth.user) return;
    if (
      auth.user.username === data.username &&
      auth.user.description === data.description
    )
      return;

    updateUserRequest(data);
  };

  return (
    <SettingsPersonalInformation
      user={auth.user}
      onUpdate={onUpdate}
      isLoading={loading.isLoading && loading.type === LoadingType.updateUser}
    />
  );
};

export { SettingsPersonalInformationContainer };
