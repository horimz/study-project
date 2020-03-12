import { apiClient } from "../apiClient";
import { formatRequest } from "../formatRequest";
import { CreateFolderInput, UpdateFolderInput } from "./types";

const prefix = "/api/folders";

// Folders api
export const getRootFolderId = () => apiClient.get(`${prefix}/root`);

export const getSubfoldersInFolderById = (id: string) =>
  apiClient.get(`${prefix}/${id}`);

export const createFolder = (data: CreateFolderInput) =>
  apiClient.post(`${prefix}`, data);

export const updateFolder = (data: UpdateFolderInput) =>
  apiClient.patch(`${prefix}`, formatRequest(data));

export const deleteFolder = (id: string) => apiClient.delete(`${prefix}/${id}`);
