import { takeEvery, takeLatest, call, fork, put } from "redux-saga/effects";
import { authActionTypes, authActions } from "../actions/auth";
import { loadingActions, LoadingType } from "../actions/loading";
import { notificationActions, NotificationType } from "../actions/notification";
import * as authApi from "../../lib/api/auth";
import * as authTypes from "../../lib/api/auth/types";
import { apiClient } from "../../lib/api/apiClient";
import { storage } from "../../lib/storage";
import { generateUID } from "../../lib/uuid";

/* Worker sagas */

function* fetchUser() {
  try {
    // Send request
    const response: authTypes.FetchUserResponse = yield call(authApi.fetchUser);
    const { content: user } = response.data;

    // Set user
    yield put(authActions.fetchUserSuccess(user));
  } catch (e) {
    // Set user to null
    yield put(authActions.fetchUserFailure());
  }
}

function* login(action: { type: string; payload: authTypes.LoginInput }) {
  // Start loading
  yield put(loadingActions.startLoading(LoadingType.login));

  try {
    // Send request
    const response: authTypes.LoginResponse = yield call(
      authApi.login,
      action.payload
    );

    const {
      transactionTime,
      content: { user, token }
    } = response.data;

    // Set token and user in local storage
    storage.setItem("TOKEN", token);
    storage.setItem("CURRENT_USER", user);
    storage.setItem("LOGGED_IN_AT", transactionTime);

    // Set authorization header with token
    apiClient.defaults.headers.common["Authorization"] = token;

    // Set user
    yield put(authActions.loginSuccess(user));

    // Generate success message
    const successMessage = {
      id: generateUID(),
      type: NotificationType.normal,
      message: `Hi, ${user.username} ! 😁`
    };

    // Display success message
    yield put(notificationActions.addNotification(successMessage));
  } catch (e) {
    // Set user to null
    yield put(authActions.loginFailure());

    // Generate error message
    const errorMessage = {
      id: generateUID(),
      type: NotificationType.error,
      message:
        e.response.data.message ||
        "Incorrect credentials. Check your email and password."
    };

    // Display error message
    yield put(notificationActions.addNotification(errorMessage));
  }

  // Stop loading
  yield put(loadingActions.finishLoading());
}

function* logout() {
  try {
    // Send request
    const response: authTypes.LogoutResponse = yield call(authApi.logout);

    if (response.status !== 200) {
      throw new Error();
    }

    const { transactionTime, content: user } = response.data;

    storage.setItem("LOGGED_OUT_AT", transactionTime);

    // Set user to null
    yield put(authActions.logoutSuccess());

    // Generate success message
    const successMessage = {
      id: generateUID(),
      type: NotificationType.normal,
      message: `Bye, ${user.username} ! 😁`
    };

    // Display success message
    yield put(notificationActions.addNotification(successMessage));
  } catch (e) {
    // Set user to null
    yield put(authActions.logoutFailure());
  } finally {
    // Remove all items in local storage
    storage.removeItem("TOKEN");
    storage.removeItem("CURRENT_USER");

    // Remove authorization header
    apiClient.defaults.headers.common["Authorization"] = "";
  }
}

function* register(action: { type: string; payload: authTypes.RegisterInput }) {
  // Start loading
  yield put(loadingActions.startLoading(LoadingType.register));

  try {
    // Send request
    const response: authTypes.RegisterResponse = yield call(
      authApi.register,
      action.payload
    );

    if (response.status !== 201) {
      throw new Error();
    }

    const {
      transactionTime,
      content: { user, token }
    } = response.data;

    // Set token and user in local storage
    storage.setItem("TOKEN", token);
    storage.setItem("CURRENT_USER", user);
    storage.setItem("LOGGED_IN_AT", transactionTime);

    // Set authorization header with token
    apiClient.defaults.headers.common["Authorization"] = token;

    // Set user
    yield put(authActions.registerSuccess(user));

    // Generate success message
    const successMessage = {
      id: generateUID(),
      type: NotificationType.normal,
      message: `Hi, ${user.username} ! 😁 Welcome to Markery.`
    };

    // Display success message
    yield put(notificationActions.addNotification(successMessage));
  } catch (e) {
    // Set user to null
    yield put(authActions.registerFailure());

    // Generate error message
    const errorMessage = {
      id: generateUID(),
      type: NotificationType.error,
      message:
        e.response.data.message ||
        "Conflict! Email and username must be unique."
    };

    // Display error message
    yield put(notificationActions.addNotification(errorMessage));
  }
  // Stop loading
  yield put(loadingActions.finishLoading());
}

function* updateUser(action: {
  type: string;
  payload: authTypes.UpdateUserInput;
}) {
  // Start loading
  yield put(loadingActions.startLoading(LoadingType.updateUser));

  try {
    // Send request
    const response: authTypes.UpdateUserResponse = yield call(
      authApi.updateUser,
      action.payload
    );

    const { content: user } = response.data;

    // Store updated user in local storage in order to prevent errors for unexpected refreshes
    storage.setItem("CURRENT_USER", user);

    // Set user
    yield put(authActions.updateUserSuccess(user));

    // Generate success message
    const successMessage = {
      id: generateUID(),
      type: NotificationType.normal,
      message: "Successfully applied changes."
    };

    // Display success message
    yield put(notificationActions.addNotification(successMessage));
  } catch (e) {
    // Set user to null
    yield put(authActions.updateUserFailure());
  }
  // Stop loading
  yield put(loadingActions.finishLoading());
}

function* deleteUser() {
  // Start loading
  yield put(loadingActions.startLoading(LoadingType.deleteUser));

  try {
    // Send request
    const response: authTypes.DeleteUserResponse = yield call(
      authApi.deleteUser
    );

    const { content: user } = response.data;

    // Set user
    yield put(authActions.deleteUserSuccess());

    // Remove all items in local storage
    storage.removeItem("TOKEN");
    storage.removeItem("CURRENT_USER");
    storage.removeItem("LOGGED_IN_AT");
    storage.removeItem("LOGGED_OUT_AT");

    // Remove authorization header
    apiClient.defaults.headers.common["Authorization"] = "";

    // Generate success message
    const successMessage = {
      id: generateUID(),
      type: NotificationType.normal,
      message: `😭 Bye, ${user.username}. Please send use feedback so we can improve Markery!`
    };

    // Display success message
    yield put(notificationActions.addNotification(successMessage));
  } catch (e) {
    // Set user to null
    yield put(authActions.deleteUserFailure());

    // Generate error message
    const errorMessage = {
      id: generateUID(),
      type: NotificationType.error,
      message: e.response.data.message || "Failed to delete account"
    };

    // Display error message
    yield put(notificationActions.addNotification(errorMessage));
  }

  // Stop loading
  yield put(loadingActions.finishLoading());
}

/* Watcher sagas */

function* watchFetchUserRequest() {
  yield takeEvery(authActionTypes.FETCH_USER_REQUEST, fetchUser);
}

function* watchLoginRequest() {
  yield takeLatest(authActionTypes.LOGIN_REQUEST, login);
}

function* watchLogoutRequest() {
  yield takeLatest(authActionTypes.LOGOUT_REQUEST, logout);
}

function* watchRegisterRequest() {
  yield takeLatest(authActionTypes.REGISTER_REQUEST, register);
}

function* watchUpdateUserRequest() {
  yield takeLatest(authActionTypes.UPDATE_USER_REQUEST, updateUser);
}

function* watchDeleteUserRequest() {
  yield takeLatest(authActionTypes.DELETE_USER_REQUEST, deleteUser);
}

export const authSagas = [
  fork(watchFetchUserRequest),
  fork(watchLoginRequest),
  fork(watchLogoutRequest),
  fork(watchRegisterRequest),
  fork(watchUpdateUserRequest),
  fork(watchDeleteUserRequest)
];
