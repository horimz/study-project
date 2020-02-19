import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes } from './types';
import { IFolderContents, FetchFolderContentsAction } from './folders';

export interface IUrl {
  _id?: string;
  url: string;
  name?: string;
  description?: string;
}

export interface FetchUrlsAction {
  type: ActionTypes.fetchUrls;
  payload: IUrl[];
}

// export const fetchUrls = () => async (dispatch: Dispatch) => {
//   const response = await axios.get<IUrl[]>('/urls');

//   dispatch<FetchUrlsAction>({
//     type: ActionTypes.fetchUrls,
//     payload: response.data
//   });
// };

export const addUrl = (url: IUrl, folderId: string) => async (
  dispatch: Dispatch
) => {
  const response = await axios.post<IFolderContents>(
    `/api/url/${folderId}`,
    url
  );

  dispatch<FetchFolderContentsAction>({
    type: ActionTypes.fetchFolderContents,
    payload: response.data
  });
};

// export const editUrl = (url: IUrl) => async (dispatch: Dispatch) => {
//   const response = await axios.patch<IUrl[]>('/urls');

//   dispatch<FetchUrlsAction>({
//     type: ActionTypes.fetchUrls,
//     payload: response.data
//   });
// };

// export const deleteUrl = (id: number) => async (dispatch: Dispatch) => {
//   const response = await axios.delete<IUrl[]>('/urls');

//   dispatch<FetchUrlsAction>({
//     type: ActionTypes.fetchUrls,
//     payload: response.data
//   });
// };

// export const fetchUrlsByHashTag = (hashTags: string[]) => async (
//   dispatch: Dispatch
// ) => {
//   const response = await axios.get<Urls>('/urls');

//   dispatch<FetchUrlsAction>({
//     type: ActionTypes.fetchUrls,
//     payload: response.data
//   });
// };
