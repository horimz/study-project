import React from "react";
import styled from "styled-components";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { palette } from "../../lib/styles";

const ServiceAssistantBlock = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  svg {
    font-size: 3rem;
    font-weight: 300;
    cursor: pointer;
    transition: fill 0.1s linear;
    &:hover {
      fill: ${palette.blue7};
    }
  }
`;

interface ServiceAssistantProps {}

export const ServiceAssistant: React.FC<ServiceAssistantProps> = props => {
  return (
    <ServiceAssistantBlock>
      <AiOutlineQuestionCircle />
    </ServiceAssistantBlock>
  );
};
