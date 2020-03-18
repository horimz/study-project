import { apiClient } from '../apiClient';
import { formatRequest } from '../formatRequest';
import * as authTypes from './types';

export const login = (data: authTypes.LoginInput) =>
  apiClient.post<authTypes.LoginResponse>(`/auth/login`, formatRequest(data));

export const logout = () =>
  apiClient.post<authTypes.LogoutResponse>(`/auth/logout`, formatRequest({}));

export const fetchUser = () =>
  apiClient.get<authTypes.FetchUserResponse>(`/auth/users/confirm`);

export const register = (data: authTypes.RegisterInput) =>
  apiClient.post<authTypes.RegisterResponse>(
    `/auth/users`,
    formatRequest(data)
  );

export const updateUser = (data: authTypes.UpdateUserInput) =>
  apiClient.patch<authTypes.UpdateUserResponse>(
    `api/users`,
    formatRequest(data)
  );

export const deleteUser = () =>
  apiClient.delete<authTypes.DeleteUserResponse>(`api/users`);
