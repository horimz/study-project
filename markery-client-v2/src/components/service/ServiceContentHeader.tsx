import React from 'react';
import styled from 'styled-components';
import { ServiceActions } from '../../components/service/ServiceActions';
import { ServiceFolderPath } from '../../components/service/ServiceFolderPath';
import { media } from '../../lib/styles';
import { Folder } from '../../lib/api/folders/types';

const ServiceContentHeaderBlock = styled.div`
  width: 100%;
  padding: 1.5rem 3rem;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  ${media.xsmall} {
    flex-direction: column;
    justify-content: center;
    margin-bottom: 0;
  }
`;

interface ServiceContentHeaderProps {
  folder: Folder;
}

const ServiceContentHeader: React.FC<ServiceContentHeaderProps> = ({
  folder
}) => {
  return (
    <ServiceContentHeaderBlock>
      <ServiceFolderPath folder={folder} />
      <ServiceActions folder={folder} />
    </ServiceContentHeaderBlock>
  );
};

export { ServiceContentHeader };
