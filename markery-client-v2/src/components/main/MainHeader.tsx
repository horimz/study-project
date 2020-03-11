import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { Button } from "../common/Button";
import { media, zIndex, boxShadow } from "../../lib/styles";

export type MainNavType = "normal" | "boxed" | "hidden";

const MainHeaderBlock = styled.div<{ mode: MainNavType }>`
  position: fixed;
  top: 0;
  width: inherit;
  width: 100%;
  padding: 2rem 10vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background-color 0.25s linear, box-shadow 0.25s linear, transform 0.25s linear;
  z-index: ${zIndex.mainNav};

  ${props =>
    props.mode === "normal" &&
    css`
      background-color: transparent;
    `}
  ${props =>
    props.mode === "boxed" &&
    css`
      background-color: white;
      ${boxShadow.segmentBox}
    `}
  ${props =>
    props.mode === "hidden" &&
    css`
      background-color: white;
      ${boxShadow.segmentBox}
      transform: translateY(-100px);
    `}
    button {
    background-color: transparent;
    color: #0c344b;
    font-size: 16px;
    font-weight: 700;
    word-break: keep-all;
    border: 2px solid #8fa6b2;
    transition: color 150ms ease 0s, border 150ms ease 0s,
      transform 100ms ease 0s;
    &:hover {
      border: 2px solid #ccd9df;
      background-color: transparent;
    }
    &:active {
      transform: translate3d(0px, 1px, 0px);
    }
    ${media.medium} {
      margin-right: 3rem;
    }
  }
`;

interface MainHeaderProps {
  mode: MainNavType;
}

const MainHeader: React.FC<MainHeaderProps> = ({ mode }) => {
  return (
    <MainHeaderBlock mode={mode}>
      <h1>Markery</h1>
      <Link to='/login'>
        <Button>Log in</Button>
      </Link>
    </MainHeaderBlock>
  );
};

export { MainHeader };
