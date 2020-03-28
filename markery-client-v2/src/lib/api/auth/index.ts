import { apiClient } from '../apiClient';
import { formatRequest } from '../formatRequest';
import * as authTypes from './types';

let config = {};

if (process.env.NODE_ENV === 'production') {
  config = {
    baseURL: process.env.REACT_APP_AUTH_HOST
  };
}

export const login = (data: authTypes.LoginInput) =>
  apiClient.post<authTypes.LoginResponse>(
    `/auth/login`,
    formatRequest(data),
    config
  );

export const logout = () =>
  apiClient.post<authTypes.LogoutResponse>(
    `/auth/logout`,
    formatRequest({}),
    config
  );

export const fetchUser = () =>
  apiClient.get<authTypes.FetchUserResponse>(`/auth/users/confirm`, config);

export const register = (data: authTypes.RegisterInput) =>
  apiClient.post<authTypes.RegisterResponse>(
    `/auth/users`,
    formatRequest(data),
    config
  );

export const updateUser = (data: authTypes.UpdateUserInput) =>
  apiClient.patch<authTypes.UpdateUserResponse>(
    `api/users`,
    formatRequest(data)
  );

export const deleteUser = () =>
  apiClient.delete<authTypes.DeleteUserResponse>(`api/users`);
