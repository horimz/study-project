import { notificationActionTypes } from "./constants";

export enum NotificationType {
  normal,
  error
}

export interface AddNotificationInput {
  id: string;
  type: NotificationType;
  message: string;
}

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
