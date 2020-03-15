import React from 'react';
import styled from 'styled-components';
import { media } from '../../lib/styles';
import { TiFolder } from 'react-icons/ti';
import { Folder, FolderType } from '../../lib/api/folders/types';

const ServiceFolderPathBlock = styled.div`
  flex: 1 0;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin-right: 2rem;
  h1 {
    display: flex;
    align-items: center;
    font-weight: 600;
    ${media.xsmall} {
      margin-bottom: 2rem;
    }
    svg {
      margin-right: 1rem;
    }
  }
  ${media.xsmall} {
    margin: 0;
  }
`;

interface ServiceFolderPathProps {
  folder: Folder;
}

const ServiceFolderPath: React.FC<ServiceFolderPathProps> = ({ folder }) => {
  return (
    <ServiceFolderPathBlock>
      <h1>
        {folder.type === FolderType.root ? (
          'Markery Home'
        ) : (
          <>
            <TiFolder /> {folder.folderName}
          </>
        )}
      </h1>
    </ServiceFolderPathBlock>
  );
};

export { ServiceFolderPath };
