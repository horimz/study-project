import React from "react";
import styled from "styled-components";
import { media } from "../../lib/styles";

const MainHeroBlock = styled.div`
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

interface MainHeroProps {}

const MainHero: React.FC<MainHeroProps> = props => {
  return <MainHeroBlock>Hero</MainHeroBlock>;
};

export { MainHero };
