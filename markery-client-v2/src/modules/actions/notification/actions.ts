import { notificationActionTypes } from "./constants";
import { AddNotificationInput } from "./type";

export const addNotification = (data: AddNotificationInput) => ({
  type: notificationActionTypes.ADD_NOTIFICATION,
  payload: data
});

export const deleteNotification = (id: string) => ({
  type: notificationActionTypes.DELETE_NOTIFICATION,
  payload: id
});

export const notificationActions = {
  addNotification,
  deleteNotification
};
