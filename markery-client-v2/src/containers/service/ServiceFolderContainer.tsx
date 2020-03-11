import React from "react";
import { ServiceActions } from "../../components/service/ServiceActions";
import { Folder } from "../../components/base/Folder";
import { Url } from "../../components/base/Url";

interface ServiceFolderContainerProps {
  folderId: string;
}

// TODO: fetch folder content based on folder id
const ServiceFolderContainer: React.FC<ServiceFolderContainerProps> = ({
  folderId
}) => {
  return (
    <>
      <ServiceActions folderId={folderId} />
      <h1>{folderId}</h1>
      <Folder />
      <Url />
    </>
  );
};

export { ServiceFolderContainer };
