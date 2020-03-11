import React from "react";
import styled from "styled-components";
import { SearchBar } from "../common/SearchBar";
import { media } from "../../lib/styles";

const ServiceSearchBarBlock = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  ${media.xsmall} {
    justify-content: stretch;
  }
`;

interface ServiceSearchBarProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ServiceSearchBar: React.FC<ServiceSearchBarProps> = ({ onChange }) => {
  return (
    <ServiceSearchBarBlock>
      <SearchBar placeholder='Search by keyword' onChange={onChange} />
    </ServiceSearchBarBlock>
  );
};

export { ServiceSearchBar };
