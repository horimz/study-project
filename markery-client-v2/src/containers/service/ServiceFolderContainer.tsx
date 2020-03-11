import React from "react";
import styled from "styled-components";
import { TiFolderDelete } from "react-icons/ti";
import { ServiceActions } from "../../components/service/ServiceActions";
import { Folder } from "../../components/base/Folder";
import { Url } from "../../components/base/Url";

const ServicdFolderHeader = styled.div`
  margin-bottom: 2.6rem;
  display: flex;
  align-items: center;
  font-size: 3rem;
  svg {
    margin-right: 1.5rem;
    font-size: 4rem;
  }
`;

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
      <ServicdFolderHeader>
        <TiFolderDelete />
        {folderId}
      </ServicdFolderHeader>
      <Folder />
      <Url />
    </>
  );
};

export { ServiceFolderContainer };
