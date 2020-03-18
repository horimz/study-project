import * as folderTypes from '../../../lib/api/folders/types';
import * as urlTypes from '../../../lib/api/urls/types';
import { contentActionTypes } from './constants';

// Content actions
export const fetchContentRequest = (id: string) => ({
  type: contentActionTypes.FETCH_CONTENT_REQUEST,
  payload: id
});

export const fetchContentSuccess = (data: {
  folders: folderTypes.Folder[];
  urls: urlTypes.Url[];
}) => ({
  type: contentActionTypes.FETCH_CONTENT_SUCCESS,
  payload: data
});

export const fetchContentFailure = () => ({
  type: contentActionTypes.FETCH_CONTENT_FAILURE
});

// Folder actions
export const fetchRootFolderIdRequest = () => ({
  type: contentActionTypes.FETCH_ROOT_FOLDER_ID_REQUEST
});

export const fetchRootFolderIdSuccess = (id: string) => ({
  type: contentActionTypes.FETCH_ROOT_FOLDER_ID_SUCCESS,
  payload: id
});

export const fetchRootFolderIdFailure = () => ({
  type: contentActionTypes.FETCH_ROOT_FOLDER_ID_FAILURE
});

export const resetContent = () => ({
  type: contentActionTypes.RESET_CONTENT
});

export const setCurrentFolder = (folder: folderTypes.Folder | null) => ({
  type: contentActionTypes.SET_CURRENT_FOLDER,
  payload: folder
});

export const fetchAllFolderRequest = () => ({
  type: contentActionTypes.FETCH_ALL_FOLDERS_REQUEST
});

export const fetchAllFolderSuccess = (folders: folderTypes.Folder[]) => ({
  type: contentActionTypes.FETCH_ALL_FOLDERS_SUCCESS,
  payload: folders
});

export const fetchAllFolderFailure = () => ({
  type: contentActionTypes.FETCH_ALL_FOLDERS_FAILURE
});

export const createFolderRequest = (data: folderTypes.CreateFolderInput) => ({
  type: contentActionTypes.CREATE_FOLDER_REQUEST,
  payload: data
});

export const createFolderSuccess = (folder: folderTypes.Folder) => ({
  type: contentActionTypes.CREATE_FOLDER_SUCCESS,
  payload: folder
});

export const createFolderFailure = () => ({
  type: contentActionTypes.CREATE_FOLDER_FAILURE
});

export const updateFolderRequest = (data: folderTypes.UpdateFolderInput) => ({
  type: contentActionTypes.UPDATE_FOLDER_REQUEST,
  payload: data
});

export const updateFolderSuccess = (folder: folderTypes.Folder) => ({
  type: contentActionTypes.UPDATE_FOLDER_SUCCESS,
  payload: folder
});

export const updateFolderFailure = () => ({
  type: contentActionTypes.UPDATE_FOLDER_FAILURE
});

export const deleteFolderRequest = (id: string) => ({
  type: contentActionTypes.DELETE_FOLDER_REQUEST,
  payload: id
});

export const deleteFolderSuccess = (folder: folderTypes.Folder) => ({
  type: contentActionTypes.DELETE_FOLDER_SUCCESS,
  payload: folder
});

export const deleteFolderFailure = () => ({
  type: contentActionTypes.DELETE_FOLDER_FAILURE
});

// Url actions
export const fetchAllUrlRequest = () => ({
  type: contentActionTypes.FETCH_ALL_URL_REQUEST
});

export const fetchAllUrlSuccess = (urls: urlTypes.Url[]) => ({
  type: contentActionTypes.FETCH_ALL_URL_SUCCESS,
  payload: urls
});

export const fetchAllUrlFailure = () => ({
  type: contentActionTypes.FETCH_ALL_URL_FAILURE
});

export const createUrlRequest = (data: urlTypes.CreateUrlInput) => ({
  type: contentActionTypes.CREATE_URL_REQUEST,
  payload: data
});

export const createUrlSuccess = (url: urlTypes.Url) => ({
  type: contentActionTypes.CREATE_URL_SUCCESS,
  payload: url
});

export const createUrlFailure = () => ({
  type: contentActionTypes.CREATE_URL_FAILURE
});

export const updateUrlRequest = (data: urlTypes.UpdateUrlInput) => ({
  type: contentActionTypes.UPDATE_URL_REQUEST,
  payload: data
});

export const updateUrlSuccess = (url: urlTypes.Url) => ({
  type: contentActionTypes.UPDATE_URL_SUCCESS,
  payload: url
});

export const updateUrlFailure = () => ({
  type: contentActionTypes.UPDATE_URL_FAILURE
});

export const deleteUrlRequest = (id: string) => ({
  type: contentActionTypes.DELETE_URL_REQUEST,
  payload: id
});

export const deleteUrlSuccess = (url: urlTypes.Url) => ({
  type: contentActionTypes.DELETE_URL_SUCCESS,
  payload: url
});

export const deleteUrlFailure = () => ({
  type: contentActionTypes.DELETE_URL_FAILURE
});

export const contentActions = {
  fetchContentRequest,
  fetchContentSuccess,
  fetchContentFailure,
  fetchRootFolderIdRequest,
  fetchRootFolderIdSuccess,
  fetchRootFolderIdFailure,
  resetContent,
  setCurrentFolder,
  fetchAllFolderRequest,
  fetchAllFolderSuccess,
  fetchAllFolderFailure,
  createFolderRequest,
  createFolderSuccess,
  createFolderFailure,
  updateFolderRequest,
  updateFolderSuccess,
  updateFolderFailure,
  deleteFolderRequest,
  deleteFolderSuccess,
  deleteFolderFailure,
  fetchAllUrlRequest,
  fetchAllUrlSuccess,
  fetchAllUrlFailure,
  createUrlRequest,
  createUrlSuccess,
  createUrlFailure,
  updateUrlRequest,
  updateUrlSuccess,
  updateUrlFailure,
  deleteUrlRequest,
  deleteUrlSuccess,
  deleteUrlFailure
};
