import React from "react";
import { Notification } from "../../components/notification/Notification";
import { useNotification } from "../../lib/hooks";

interface NotificationContainerProps {}

const NotificationContainer: React.FC<NotificationContainerProps> = props => {
  const { notifications, deleteNotification } = useNotification();

  return (
    <Notification notifications={notifications} onClose={deleteNotification} />
  );
};

export { NotificationContainer };
