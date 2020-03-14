import React from "react";
import { NotificationTemplate } from "./NotificationTemplate";
import { NotificationBox } from "./NotificationBox";
import {
  NotificationState,
  Notification as NotificationType
} from "../../modules/actions/notification";

interface NotificationProps {
  notifications: NotificationState;
  onClose: (id: string) => void;
}

const Notification: React.FC<NotificationProps> = ({
  notifications,
  onClose
}) => {
  const renderNotifications = () => {
    if (!notifications) return null;
    return notifications.map((notification: NotificationType) => (
      <div key={notification.id}>
        <NotificationBox onClose={onClose} notification={notification} />
      </div>
    ));
  };

  return <NotificationTemplate>{renderNotifications()}</NotificationTemplate>;
};

export { Notification };
