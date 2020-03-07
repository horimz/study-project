import React from "react";
import { ServiceTemplate } from "../../components/service/ServiceTemplate";
import { ServiceSideMenuContainer } from "../../containers/service/ServiceSideMenuContainer";
import { ServiceAssistant } from "../../components/service/ServiceAssistant";

interface ServicePageProps {}

const ServicePage: React.FC<ServicePageProps> = props => {
  return (
    <ServiceTemplate>
      <ServiceSideMenuContainer />
      <div>Service Page</div>
      <ServiceAssistant />
    </ServiceTemplate>
  );
};

export { ServicePage as default };
