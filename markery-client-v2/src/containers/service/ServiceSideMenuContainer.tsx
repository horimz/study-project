import React, { useState } from "react";
import { ServiceSideMenuToggler } from "../../components/service/ServiceSideMenuToggler";
import { ServiceRightSideMenu } from "../../components/service/ServiceRightSideMenu";

interface ServiceSideMenuContainerProps {}

const ServiceSideMenuContainer: React.FC<ServiceSideMenuContainerProps> = props => {
  const [open, setOpen] = useState<boolean>(false);
  const openSideMenu = () => setOpen(true);
  const closeSideMenu = () => setOpen(false);

  return (
    <>
      <ServiceSideMenuToggler open={open} openSideMenu={openSideMenu} />
      <ServiceRightSideMenu open={open} closeSideMenu={closeSideMenu} />
    </>
  );
};

export { ServiceSideMenuContainer };
