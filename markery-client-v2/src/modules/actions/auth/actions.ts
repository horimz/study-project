import * as authTypes from "../../../lib/api/auth/types";
import { authActionTypes } from "./constants";

export const setUser = (user: authTypes.User) => ({
  type: authActionTypes.SET_USER,
  payload: user
});

export const fetchUserRequest = () => ({
  type: authActionTypes.FETCH_USER_REQUEST
});

export const fetchUserSuccess = (user: authTypes.User) => ({
  type: authActionTypes.FETCH_USER_SUCCESS,
  payload: user
});

export const fetchUserFailure = () => ({
  type: authActionTypes.FETCH_USER_FAILURE
});

export const loginRequest = (data: authTypes.LoginInput) => ({
  type: authActionTypes.LOGIN_REQUEST,
  payload: data
});

export const loginSuccess = (user: authTypes.User) => ({
  type: authActionTypes.LOGIN_SUCCESS,
  payload: user
});

export const loginFailure = () => ({ type: authActionTypes.LOGIN_FAILURE });

export const logoutRequest = () => ({ type: authActionTypes.LOGOUT_REQUEST });

export const logoutSuccess = () => ({ type: authActionTypes.LOGOUT_SUCCESS });

export const logoutFailure = () => ({ type: authActionTypes.LOGOUT_FAILURE });

export const registerRequest = (data: authTypes.RegisterInput) => ({
  type: authActionTypes.REGISTER_REQUEST,
  payload: data
});

export const registerSuccess = (user: authTypes.User) => ({
  type: authActionTypes.REGISTER_SUCCESS,
  payload: user
});

export const registerFailure = () => ({
  type: authActionTypes.REGISTER_FAILURE
});

export const updateUserRequest = (data: authTypes.UpdateUserInput) => ({
  type: authActionTypes.UPDATE_USER_REQUEST,
  payload: data
});

export const updateUserSuccess = (user: authTypes.User) => ({
  type: authActionTypes.UPDATE_USER_SUCCESS,
  payload: user
});

export const updateUserFailure = () => ({
  type: authActionTypes.UPDATE_USER_FAILURE
});

export const deleteUserRequest = () => ({
  type: authActionTypes.DELETE_USER_REQUEST
});

export const deleteUserSuccess = () => ({
  type: authActionTypes.DELETE_USER_SUCCESS
});

export const deleteUserFailure = () => ({
  type: authActionTypes.DELETE_USER_FAILURE
});

export const authActions = {
  setUser,
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFailure,
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
  updateUserRequest,
  updateUserSuccess,
  updateUserFailure,
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserFailure
};
