import React from "react";
import { ServiceHomeContainer } from "../../containers/service/ServiceHomeContainer";

interface ServiceHomePageProps {}

const ServiceHomePage: React.FC<ServiceHomePageProps> = props => {
  return <ServiceHomeContainer />;
};

export { ServiceHomePage as default };
