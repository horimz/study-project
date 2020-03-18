import React from 'react';
import { RouteComponentProps } from 'react-router';
import { ServiceFolderContainer } from '../../containers/service/ServiceFolderContainer';

interface ServiceFolderPageProps
  extends RouteComponentProps<{
    folder: string;
  }> {}

const ServiceFolderPage: React.FC<ServiceFolderPageProps> = ({ match }) => {
  const { folder } = match.params;
  const [folderName, folderId] = folder.split('-');
  return <ServiceFolderContainer folderId={folderId} folderName={folderName} />;
};

export { ServiceFolderPage as default };
