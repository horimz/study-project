import React from "react";
import { useToggle } from "../../lib/hooks";
import { ServiceSideMenuToggler } from "../../components/service/ServiceSideMenuToggler";
import { ServiceRightSideMenu } from "../../components/service/ServiceRightSideMenu";

interface ServiceSideMenuContainerProps {}

const ServiceSideMenuContainer: React.FC<ServiceSideMenuContainerProps> = props => {
  const [open, onToggle] = useToggle(false);

  return (
    <>
      <ServiceSideMenuToggler open={open} onToggle={onToggle} />
      <ServiceRightSideMenu open={open} onToggle={onToggle} />
    </>
  );
};

export { ServiceSideMenuContainer };
