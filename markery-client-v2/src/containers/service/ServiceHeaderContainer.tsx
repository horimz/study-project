import React from 'react';
import { useToggle, useAuth } from '../../lib/hooks';
import { ServiceHeader } from '../../components/service/ServiceHeader';

interface ServiceHeaderContainerProps {}

const ServiceHeaderContainer: React.FC<ServiceHeaderContainerProps> = props => {
  const { auth, logoutRequest } = useAuth();
  const [open, onToggle] = useToggle(false);

  if (!auth.user || !auth.user.email) return null;

  const { username, email } = auth.user;

  return (
    <ServiceHeader
      open={open}
      onToggle={onToggle}
      onLogout={logoutRequest}
      username={username}
      email={email}
    />
  );
};

export { ServiceHeaderContainer };
