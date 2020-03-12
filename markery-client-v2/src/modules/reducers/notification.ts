import {
  notificationActionTypes,
  NotificationType
} from "../actions/notification";

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

const initialState: NotificationState = [];

export function notificationReducer(
  state: NotificationState = initialState,
  action: NotificationAction
) {
  switch (action.type) {
    case notificationActionTypes.ADD_NOTIFICATION: {
      return [...state, action.payload];
    }
    case notificationActionTypes.DELETE_NOTIFICATION: {
      return state.filter(notification => notification.id !== action.payload);
    }
    default:
      return state;
  }
}
