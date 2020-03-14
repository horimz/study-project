import React from "react";
import { ServiceFoldersContainer } from "../../containers/service/ServiceFoldersContainer";

interface ServiceFoldersPageProps {}

const ServiceFoldersPage: React.FC<ServiceFoldersPageProps> = props => {
  return <ServiceFoldersContainer />;
};

export { ServiceFoldersPage as default };
