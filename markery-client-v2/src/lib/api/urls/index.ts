import { apiClient } from "../apiClient";
import { formatRequest } from "../formatRequest";
import * as UrlTypes from "./types";

const prefix = "/api/urls";

// Urls api
export const fetchAllUrls = () =>
  apiClient.get<UrlTypes.FetchAllUrlsResponse>(`${prefix}`);

export const fetchUrlsInFolderById = (id: string) =>
  apiClient.get<UrlTypes.FetchUrlsInFolderByIdResponse>(`${prefix}/${id}`);

export const createUrl = (data: UrlTypes.CreateUrlInput) =>
  apiClient.post<UrlTypes.CreateUrlResponse>(`${prefix}`, formatRequest(data));

export const updateUrl = (data: UrlTypes.UpdateUrlInput) =>
  apiClient.patch<UrlTypes.UpdateUrlResponse>(`${prefix}`, formatRequest(data));

export const deleteUrl = (id: string) =>
  apiClient.delete<UrlTypes.DeleteUrlResponse>(`${prefix}/${id}`);
