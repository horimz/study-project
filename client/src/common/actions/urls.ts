import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes } from './types';

export interface Url {
  id: string;
  url: string;
  description: string;
}

export interface Urls {
  urls: Url[];
}

export interface FetchUrlsAction {
  type: ActionTypes.fetchUrls;
  payload: Urls;
}

export const fetchUrls = () => async (dispatch: Dispatch) => {
  const response = await axios.get<Urls>('/urls');

  dispatch<FetchUrlsAction>({
    type: ActionTypes.fetchUrls,
    payload: response.data
  });
};

export const fetchUrlsByHashTag = (hashTags: string[]) => async (
  dispatch: Dispatch
) => {
  const response = await axios.get<Urls>('/urls');

  dispatch<FetchUrlsAction>({
    type: ActionTypes.fetchUrls,
    payload: response.data
  });
};

export const addUrl = (url: Url) => async (dispatch: Dispatch) => {
  const response = await axios.post<Urls>('/urls');

  dispatch<FetchUrlsAction>({
    type: ActionTypes.fetchUrls,
    payload: response.data
  });
};

export const editUrl = (url: Url) => async (dispatch: Dispatch) => {
  const response = await axios.patch<Urls>('/urls');

  dispatch<FetchUrlsAction>({
    type: ActionTypes.fetchUrls,
    payload: response.data
  });
};

export const deleteUrl = (id: number) => async (dispatch: Dispatch) => {
  const response = await axios.delete<Urls>('/urls');

  dispatch<FetchUrlsAction>({
    type: ActionTypes.fetchUrls,
    payload: response.data
  });
};
