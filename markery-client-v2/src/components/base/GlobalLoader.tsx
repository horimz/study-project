import React from "react";
import styled from "styled-components";
import Interwind from "../../static/svg/Interwind.svg";
import { zIndex } from "../../lib/styles";
import { useLoading } from "../../lib/hooks";

const GlobalLoaderBlock = styled.div`
  height: 100vh;
  width: 100vw;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${zIndex.globalLoader};
`;

interface GlobalLoaderProps {}

const GlobalLoader: React.FC<GlobalLoaderProps> = props => {
  const { loading, LoadingType } = useLoading();

  if (loading.isLoading && loading.type === LoadingType.global) {
    return (
      <GlobalLoaderBlock>
        <img src={Interwind} alt='loader' />
      </GlobalLoaderBlock>
    );
  }

  return null;
};

export { GlobalLoader };
