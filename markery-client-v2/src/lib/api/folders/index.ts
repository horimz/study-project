import { apiClient } from '../apiClient';
import { formatRequest } from '../formatRequest';
import * as FolderTypes from './types';

const prefix = '/api/folders';

export const fetchRootFolderId = () =>
  apiClient.get<FolderTypes.FetchRootFolderIdResponse>(`${prefix}/root`);

export const fetchAllFolders = () =>
  apiClient.get<FolderTypes.FetchAllFoldersResponse>(`${prefix}`);

export const fetchSubfoldersInFolderById = (id: string) =>
  apiClient.get<FolderTypes.FetchSubfoldersInFolderByIdResponse>(
    `${prefix}/${id}`
  );

export const createFolder = (data: FolderTypes.CreateFolderInput) =>
  apiClient.post<FolderTypes.CreateFolderResponse>(
    `${prefix}`,
    formatRequest(data)
  );

export const updateFolder = (data: FolderTypes.UpdateFolderInput) =>
  apiClient.patch<FolderTypes.UpdateFolderResponse>(
    `${prefix}`,
    formatRequest(data)
  );

export const deleteFolder = (id: string) =>
  apiClient.delete<FolderTypes.DeleteFolderResponse>(`${prefix}/${id}`);
