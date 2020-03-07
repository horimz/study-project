import React from "react";
import { ServiceTemplate } from "../../components/service/ServiceTemplate";
import { ServiceSideMenuContainer } from "../../containers/service/ServiceSideMenuContainer";
import { ServiceAssistantContainer } from "../../containers/service/ServiceAssistantContainer";

interface ServicePageProps {}

const ServicePage: React.FC<ServicePageProps> = props => {
  return (
    <ServiceTemplate>
      <ServiceSideMenuContainer />
      <div>Service Page</div>
      <ServiceAssistantContainer />
    </ServiceTemplate>
  );
};

export { ServicePage as default };
