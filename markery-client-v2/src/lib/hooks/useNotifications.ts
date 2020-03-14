import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../modules";
import { NotificationState } from "../../modules/actions/notification";
import {
  notificationActions,
  AddNotificationInput
} from "../../modules/actions/notification";

export const useNotification = () => {
  const notifications: NotificationState = useSelector(
    (state: RootState) => state.notifications
  );

  const dispatch = useDispatch();

  const addNotification = useCallback(
    (data: AddNotificationInput) =>
      dispatch(notificationActions.addNotification(data)),
    [dispatch]
  );

  const deleteNotification = useCallback(
    (id: string) => dispatch(notificationActions.deleteNotification(id)),
    [dispatch]
  );

  return {
    notifications,
    addNotification,
    deleteNotification
  };
};
