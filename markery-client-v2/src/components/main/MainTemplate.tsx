import React from "react";
import styled from "styled-components";
import { MainHero } from "./MainHero";
import { MainHeaderContainer } from "../../containers/main/MainHeaderContainer";
import { MainFooter } from "./MainFooter";
import { palette, media, mixin } from "../../lib/styles";

const MainTemplateBlock = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${palette.background};
  min-height: 100vh;
  position: relative;

  header {
    width: 100%;
    background-color: white;
    height: 750px;
    ${mixin.flexCenter}
  }

  main {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1850px;
    /* border: 1px solid black; */
    height: 100vh;
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
  }

  footer {
    width: 100%;
    background: linear-gradient(180deg, #0c344b 0%, #295166 100%);
    height: 200px;
    color: white;
    ${mixin.flexCenter}
  }
`;

interface MainTemplateProps {}

const MainTemplate: React.FC<MainTemplateProps> = ({ children }) => {
  return (
    <MainTemplateBlock>
      <MainHeaderContainer />
      <header>
        <MainHero />
      </header>
      <main>{children}</main>
      <footer>
        <MainFooter />
      </footer>
    </MainTemplateBlock>
  );
};

export { MainTemplate };
