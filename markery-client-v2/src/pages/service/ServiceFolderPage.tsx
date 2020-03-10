import React from "react";
import { RouteComponentProps } from "react-router";
import { ServiceFolderContainer } from "../../containers/service/ServiceFolderContainer";

interface ServiceFolderPageProps
  extends RouteComponentProps<{
    folderId: string;
  }> {}

const ServiceFolderPage: React.FC<ServiceFolderPageProps> = ({ match }) => {
  const { folderId } = match.params;
  return <ServiceFolderContainer folderId={folderId} />;
};

export { ServiceFolderPage as default };
