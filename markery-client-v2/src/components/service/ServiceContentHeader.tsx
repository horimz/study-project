import React from "react";
import styled from "styled-components";
import { ServiceSearchContainer } from "../../containers/service/ServiceSearchContainer";

const ServiceContentHeaderBlock = styled.div`
  width: 100%;
  padding: 1.5rem 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

interface ServiceContentHeaderProps {}

const ServiceContentHeader: React.FC<ServiceContentHeaderProps> = props => {
  return (
    <ServiceContentHeaderBlock>
      <ServiceSearchContainer />
    </ServiceContentHeaderBlock>
  );
};

export { ServiceContentHeader };
