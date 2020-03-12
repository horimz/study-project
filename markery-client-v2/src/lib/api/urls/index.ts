import { apiClient } from "../apiClient";
import { formatRequest } from "../formatRequest";
import { CreateUrlInput, UpdateUrlInput } from "./types";

const prefix = "/api/urls";

// Urls api
export const getUrlsInFolderById = (id: string) =>
  apiClient.get(`${prefix}/${id}`);

export const createUrl = (data: CreateUrlInput) =>
  apiClient.post(`${prefix}`, data);

export const updateUrl = (data: UpdateUrlInput) =>
  apiClient.patch(`${prefix}`, formatRequest(data));

export const deleteUrl = (id: string) => apiClient.delete(`${prefix}/${id}`);
