import React from "react";
import styled from "styled-components";
import { Button } from "../common/Button";
import { ServiceAddFolderModal } from "./ServiceAddFolderModal";
import { ServiceAddUrlModal } from "./ServiceAddUrlModal";
import { useToggle } from "../../lib/hooks";

const ServiceActionsBlock = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 3rem;
  .service__action {
    &:not(:last-child) {
      margin-right: 1rem;
    }
  }
  button {
    transition: transform 100ms ease 0s, color 0.2s linear,
      background-color 0.2s linear;
    &:active {
      transform: translate3d(0px, 1px, 0px);
    }
  }
`;

// TODO: manage current folder state with redux
interface ServiceActionsProps {
  folderId?: string;
}

const ServiceActions: React.FC<ServiceActionsProps> = ({ folderId }) => {
  const [openFolderModal, onFolderModalToggle] = useToggle(false);
  const [openUrlModal, onUrlModalToggle] = useToggle(false);

  return (
    <ServiceActionsBlock>
      <div className='service__action'>
        <Button color='grey' onClick={onFolderModalToggle}>
          Add folder
        </Button>
      </div>
      <div className='service__action'>
        <Button color='grey' onClick={onUrlModalToggle}>
          Add url
        </Button>
      </div>
      <ServiceAddFolderModal
        open={openFolderModal}
        onClose={onFolderModalToggle}
      />
      <ServiceAddUrlModal open={openUrlModal} onClose={onUrlModalToggle} />
    </ServiceActionsBlock>
  );
};

export { ServiceActions };
