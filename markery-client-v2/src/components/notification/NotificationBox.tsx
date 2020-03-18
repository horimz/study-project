import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { palette, boxShadow, animation } from "../../lib/styles";
import { MdClose } from "react-icons/md";
import {
  NotificationType,
  Notification
} from "../../modules/actions/notification";

const NotificationBoxBlock = styled.div<{
  close: boolean;
  remove: boolean;
  type: NotificationType;
}>`
  width: 325px;
  ${boxShadow.notification}
  border-radius: 6px;
  margin-bottom: 0.8rem;
  padding: 1.6rem;
  color: white;
  display: flex;
  animation: ${animation.moveInFromRight} 0.4s;
  animation-fill-mode: both;
  ${props =>
    props.type === NotificationType.normal &&
    css`
      background-color: ${palette.green6};
    `}
  ${props =>
    props.type === NotificationType.error &&
    css`
      background-color: ${palette.error};
    `}
  ${props =>
    props.close &&
    css`
      animation: ${animation.moveInToRight} 0.4s;
      animation-fill-mode: both;
    `}
  ${props =>
    props.remove &&
    css`
      animation: ${animation.shrink} 0.4s;
      animation-fill-mode: both;
    `}
`;

const NotificationBoxCloseBlock = styled.div<{ type: NotificationType }>`
  width: 40px;
  .notification__close-box {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background-color: white;
    color: ${palette.error};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    font-weight: 700;
    cursor: pointer;
    transition: background-color 0.1s linear;
    ${props =>
      props.type === NotificationType.normal &&
      css`
        color: ${palette.green6};
      `}
    ${props =>
      props.type === NotificationType.error &&
      css`
        color: ${palette.error};
      `}
    &:hover {
      background-color: ${palette.grey2};
    }
  }
`;

const NotificationBoxMessageBlock = styled.div`
  flex: 1 1;
`;

interface NotificationBoxProps {
  onClose: (id: string) => void;
  notification: Notification;
}

const NotificationBox: React.FC<NotificationBoxProps> = ({
  onClose,
  notification
}) => {
  const [remove, setRemove] = useState(false);
  const [close, setClose] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setClose(true), 8000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let timerOne = 0;
    let timerTwo = 0;
    if (close) {
      timerOne = setTimeout(() => setRemove(true), 600);
      timerTwo = setTimeout(() => onClose(notification.id), 1000);
    }
    return () => {
      clearTimeout(timerOne);
      clearTimeout(timerTwo);
    };
  }, [close, onClose, notification]);

  return (
    <NotificationBoxBlock
      close={close}
      remove={remove}
      type={notification.type}
    >
      <NotificationBoxCloseBlock type={notification.type}>
        <div className='notification__close-box' onClick={() => setClose(true)}>
          <MdClose />
        </div>
      </NotificationBoxCloseBlock>
      <NotificationBoxMessageBlock>
        {notification.message}
      </NotificationBoxMessageBlock>
    </NotificationBoxBlock>
  );
};

export { NotificationBox };
