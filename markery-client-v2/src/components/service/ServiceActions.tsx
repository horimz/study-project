import React from "react";
import styled from "styled-components";
import { Button } from "../common/Button";
import { ServiceAddFolderModal } from "./ServiceAddFolderModal";
import { ServiceAddUrlModal } from "./ServiceAddUrlModal";
import { useToggle } from "../../lib/hooks";
import { media } from "../../lib/styles";

const ServiceActionsBlock = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 3rem;
  ${media.custom(500)} {
    flex-direction: column;
    justify-content: stretch;
  }
  .service__action {
    &:not(:last-child) {
      margin-right: 1rem;
      ${media.custom(500)} {
        margin-right: 0;
      }
    }
  }
  button {
    transition: transform 100ms ease 0s, color 0.2s linear,
      background-color 0.2s linear;
    &:active {
      transform: translate3d(0px, 1px, 0px);
    }
    ${media.custom(500)} {
      width: 100%;
      height: 4rem;
      font-size: 1.8rem;
      &:first-child {
        margin-bottom: 2rem;
      }
    }
  }
`;

// TODO: manage current folder state with redux
interface ServiceActionsProps {
  folderId?: string;
}

const ServiceActions: React.FC<ServiceActionsProps> = ({ folderId }) => {
  const [openFolderModal, onAddFolderModalToggle] = useToggle(false);
  const [openUrlModal, onAddUrlModalToggle] = useToggle(false);

  return (
    <ServiceActionsBlock>
      <div className='service__action'>
        <Button color='grey' onClick={onAddFolderModalToggle}>
          Add folder
        </Button>
      </div>
      <div className='service__action'>
        <Button color='grey' onClick={onAddUrlModalToggle}>
          Add url
        </Button>
      </div>
      <ServiceAddFolderModal
        open={openFolderModal}
        onClose={onAddFolderModalToggle}
      />
      <ServiceAddUrlModal open={openUrlModal} onClose={onAddUrlModalToggle} />
    </ServiceActionsBlock>
  );
};

export { ServiceActions };
