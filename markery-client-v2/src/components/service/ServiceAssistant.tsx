import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { AiOutlineShareAlt, AiOutlineQuestionCircle } from "react-icons/ai";
import {
  palette,
  animation,
  boxShadow,
  TagColorMap,
  buttonColorMap,
  zIndex
} from "../../lib/styles";
import { StyledSegmentBox } from "../common/SegmentBox";
import { Backdrop } from "../common/Backdrop";

const ServiceAssistantBlock = styled.div<{ open: boolean }>`
  .assistant__question-circle {
    position: fixed;
    bottom: 10px;
    right: 10px;
    font-size: 3rem;
    font-weight: 300;
    cursor: pointer;
    transition: fill 0.1s linear;
    &:hover {
      fill: ${TagColorMap.green.color};
    }
    ${props =>
      props.open &&
      css`
        fill: ${TagColorMap.green.color};
      `}
  }
`;

const ServiceAssistantContentBlock = styled(StyledSegmentBox)<{
  open: boolean;
  isFirst: boolean;
  close: boolean;
}>`
  position: fixed;
  bottom: 50px;
  right: 20px;
  width: 180px;
  z-index: ${zIndex.service};
  ${boxShadow.serviceAssistant}
  ${props =>
    props.close &&
    css`
      display: none;
    `}

  ${props =>
    props.isFirst
      ? css`
          display: none;
        `
      : props.open
      ? css`
          display: flex;
          animation: ${animation.fadeInFromBottom} 0.3s ease;
          animation-fill-mode: forwards;
        `
      : css`
          animation: ${animation.fadeOutToBottom} 0.3s ease;
          animation-fill-mode: forwards;
        `}
`;

const ServiceAssistantContent = styled.div`
  height: 100%;
  width: 100%;
  .assistant-container {
    margin: 2rem 0;
  }
  .assistant-box {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.5rem;
    margin: 0.5rem 0;
    transition: background-color 0.7s;
    &:hover {
      &:hover {
        color: ${TagColorMap.green.color};
        background-color: ${TagColorMap.green.backgroundColor};
      }
    }
    svg {
      font-size: 2rem;
    }
  }
  .assistant__add-box {
    background-color: ${buttonColorMap.green.backgroundColor};
    color: ${buttonColorMap.green.color};
    padding: 0.25rem 1rem;
    border-radius: 8px;
    font-weight: 600;
    font-size: 1.15rem;
    transition: background-color 0.1s linear;
    &:hover {
      background-color: ${buttonColorMap.green.hoverBackgroundColor};
    }
  }
`;

const Seperator = styled.div`
  height: 1px;
  margin: 1rem 1.5rem;
  background-color: ${palette.divider};
`;

interface ServiceAssistantProps {
  open: boolean;
  onToggle: () => void;
}

const ServiceAssistant: React.FC<ServiceAssistantProps> = ({
  open,
  onToggle
}) => {
  const [isFirst, setIsFirst] = useState<boolean>(true);
  const [close, setClose] = useState<boolean>(false);

  useEffect(() => {
    if (!isFirst && !open) {
      setTimeout(() => setClose(true), 300);
    }

    if (!isFirst && open) {
      setClose(false);
    }
  }, [isFirst, open]);

  return (
    <ServiceAssistantBlock open={open}>
      <Backdrop open={open} onClick={onToggle} />
      <ServiceAssistantContentBlock open={open} isFirst={isFirst} close={close}>
        <ServiceAssistantContent>
          <div className='assistant-container'>
            <div className='assistant-box'>
              Content<div className='assistant__add-box'>Add</div>
            </div>
            <div className='assistant-box'>
              Share content
              <AiOutlineShareAlt className='assistant__share-icon' />
            </div>
            <Seperator />
            <div className='assistant-box'>Send feedback</div>
            <div className='assistant-box'>Privacy policy</div>
          </div>
        </ServiceAssistantContent>
      </ServiceAssistantContentBlock>
      <AiOutlineQuestionCircle
        className='assistant__question-circle'
        onClick={() => {
          setIsFirst(false);
          onToggle();
        }}
      />
    </ServiceAssistantBlock>
  );
};

export { ServiceAssistant };
