import React from 'react';
import { useToggle } from '../../lib/hooks';
import { ServiceSideMenuToggler } from '../../components/service/ServiceSideMenuToggler';
import { ServiceLeftSideMenu } from '../../components/service/ServiceLeftSideMenu';

interface ServiceSideMenuContainerProps {}

const ServiceSideMenuContainer: React.FC<ServiceSideMenuContainerProps> = props => {
  const [open, onToggle] = useToggle(false);

  return (
    <>
      <ServiceSideMenuToggler open={open} onToggle={onToggle} />
      <ServiceLeftSideMenu open={open} onToggle={onToggle} />
    </>
  );
};

export { ServiceSideMenuContainer };
