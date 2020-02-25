import { ActionTypes } from '../types';

/* Url type */

export interface IUrl {
  _id?: string;
  url: string;
  alias?: string;
  description?: string;
  createdAt?: Date;
}

/* Response types */

export interface FetchUrlsResponse {
  transactionTime: Date;
  content: {
    urls: IUrl[];
  };
}

export interface AddUrlResponse {
  transactionTime: Date;
  content: {
    _id: string;
    url: string;
    alias: string;
    description: string;
  };
}

/* Dispatch action types */

export interface FetchUrlsAction {
  type: ActionTypes.fetchUrls;
  payload: IUrl[];
}

export interface AddUrlAction {
  type: ActionTypes.addUrl;
  payload: IUrl;
}

export interface EditUrlAction {
  type: ActionTypes.editUrl;
  payload: IUrl;
}

export interface DeleteUrlAction {
  type: ActionTypes.deleteUrl;
  payload: string; // Url id
}
