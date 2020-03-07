import React, { useState } from "react";
import styled, { css } from "styled-components";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { palette, animation } from "../../lib/styles";
import { StyledSegmentBox } from "../common/SegmentBox";

const ServiceAssistantBackdropBlock = styled.div<{ open: boolean }>`
  width: 120vw;
  height: 120vh;
  transform: translate(20px, 35px);
  background-color: transparent;
  ${props =>
    !props.open &&
    css`
      display: none;
    `}
`;

const ServiceAssistantBlock = styled.div<{ open: boolean }>`
  position: absolute;
  bottom: 10px;
  right: 10px;
  svg {
    font-size: 3rem;
    font-weight: 300;
    cursor: pointer;
    transition: fill 0.1s linear;
    &:hover {
      fill: ${palette.blue5};
    }
    ${props =>
      props.open &&
      css`
        fill: ${palette.blue5};
      `}
  }
  div {
    position: absolute;
    bottom: 22px;
    right: 8px;
  }
`;

const ServiceAssistantContentBlock = styled(StyledSegmentBox)<{
  open: boolean;
  isFirst: boolean;
}>`
  width: 300px;
  height: 500px;
  box-shadow: 0 12px 48px 0 rgba(96, 101, 123, 0.24);
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

interface ServiceAssistantProps {
  open: boolean;
  onToggle: () => void;
}

const ServiceAssistant: React.FC<ServiceAssistantProps> = ({
  open,
  onToggle
}) => {
  const [isFirst, setIsFirst] = useState<boolean>(true);

  return (
    <ServiceAssistantBlock open={open}>
      <ServiceAssistantBackdropBlock open={open} onClick={() => onToggle()} />
      <div>
        <ServiceAssistantContentBlock open={open} isFirst={isFirst}>
          Content
        </ServiceAssistantContentBlock>
      </div>
      <AiOutlineQuestionCircle
        onClick={() => {
          setIsFirst(false);
          onToggle();
        }}
      />
    </ServiceAssistantBlock>
  );
};

export { ServiceAssistant };
