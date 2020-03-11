import React, { useState, useEffect, ReactNode } from "react";
import ReactDOM from "react-dom";
import styled, { css } from "styled-components";
import { ModalBackdrop } from "../common/ModalBackdrop";
import { StyledSegmentBox } from "../common/SegmentBox";
import { palette, zIndex, animation, media } from "../../lib/styles";

type ModalSize = "small" | "medium" | "large";

const ModalBlock = styled.div``;
const ModalContentBlock = styled(StyledSegmentBox)<{
  open: boolean;
  isFirst: boolean;
  size: ModalSize;
}>`
  position: fixed;
  left: 50%;
  z-index: ${zIndex.modal};
  ${props =>
    props.isFirst
      ? css`
          display: none;
        `
      : props.open
      ? css`
          animation: ${animation.scaleUpFromBottom} 0.3s
            cubic-bezier(0.4, 0, 0, 1.5);
          animation-fill-mode: both;
        `
      : css`
          animation: ${animation.scaleDownToBottom} 0.5s ease;
          animation-fill-mode: both;
        `}
  ${props =>
    props.size === "small" &&
    css`
      width: 320px;
    `}
  ${props =>
    props.size === "medium" &&
    css`
      width: 440px;
      ${media.custom(500)} {
        width: 320px;
      }
    `}
  ${props =>
    props.size === "large" &&
    css`
      width: 660px;
      ${media.custom(700)} {
        width: 440px;
      }
      ${media.custom(500)} {
        width: 320px;
      }
    `}
`;
const Serperator = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${palette.divider};
`;
const ModalHeader = styled.div`
  width: 100%;
`;
const ModalBody = styled.div`
  width: 100%;
`;
const ModalActions = styled.div`
  width: 100%;
`;

interface ModalProps {
  header: ReactNode;
  body: ReactNode;
  actions: ReactNode;
  open: boolean;
  onClose: () => void;
  size?: ModalSize;
}

const modalRoot = document.getElementById("modal");

const Modal: React.FC<ModalProps> = ({
  header,
  body,
  actions,
  open,
  onClose,
  size = "medium"
}) => {
  const [isFirst, setIsFirst] = useState<boolean>(true);

  useEffect(() => {
    if (open) {
      setIsFirst(false);
    }
  }, [open]);

  const closeModal = () => () => {
    onClose();
  };

  const modal = (
    <ModalBlock>
      <ModalBackdrop open={open} isFirst={isFirst} onClick={closeModal()} />
      <ModalContentBlock open={open} isFirst={isFirst} size={size}>
        <ModalHeader>{header}</ModalHeader>
        <Serperator />
        <ModalBody>{body}</ModalBody>
        <Serperator />
        <ModalActions>{actions}</ModalActions>
      </ModalContentBlock>
    </ModalBlock>
  );

  if (!modalRoot) throw new Error('Cannot find element with id "modal"');

  return ReactDOM.createPortal(modal, modalRoot);
};

export { Modal };
