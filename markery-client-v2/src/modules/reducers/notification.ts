import {
  notificationActionTypes,
  NotificationState,
  NotificationAction
} from "../actions/notification";

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
