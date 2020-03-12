import { combineReducers } from "redux";
import { authReducer, AuthState } from "./reducers/auth";
import {
  notificationReducer,
  NotificationState
} from "./reducers/notification";
import { loadingReducer, LoadingState } from "./reducers/loading";

export type RootState = {
  auth: AuthState;
  notifications: NotificationState;
  loading: LoadingState;
};

export const rootReducer = combineReducers({
  auth: authReducer,
  notifications: notificationReducer,
  loading: loadingReducer
});
