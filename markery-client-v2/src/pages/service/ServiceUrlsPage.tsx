import React from "react";
import { ServiceUrlsContainer } from "../../containers/service/ServiceUrlsContainer";

interface ServiceUrlsPageProps {}

const ServiceUrlsPage: React.FC<ServiceUrlsPageProps> = props => {
  return <ServiceUrlsContainer />;
};

export { ServiceUrlsPage as default };
