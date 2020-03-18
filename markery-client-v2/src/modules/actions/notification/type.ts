export enum NotificationType {
  normal,
  error
}

export interface AddNotificationInput {
  id: string;
  type: NotificationType;
  message: string;
}

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
}

export type NotificationState = Notification[];

// TODO: any way for typesafe actions?
export interface NotificationAction {
  type: string;
  payload?: any;
}
