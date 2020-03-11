import React from "react";
import styled from "styled-components";
import { media } from "../../lib/styles";

const MainFooterBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1850px;
  /* border: 1px solid black; */
  position: relative;

  ${media.xxlarge} {
    width: 1400px;
  }
  ${media.xlarge} {
    width: 1000px;
  }
  ${media.medium} {
    width: 100%;
    padding-right: 2rem;
    padding-left: 2rem;
  }
  ${media.small} {
    padding-right: 1rem;
    padding-left: 1rem;
  }
`;

interface MainFooterProps {}

const MainFooter: React.FC<MainFooterProps> = props => {
  return <MainFooterBlock>Footer</MainFooterBlock>;
};

export { MainFooter };
