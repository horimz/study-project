import { AxiosResponse } from 'axios';

// Url type
export interface Url {
  _id?: string;
  url: string;
  alias: string;
  description: string;
  owner?: string;
  parentFolderId?: string;
}

// Input types
export interface CreateUrlInput {
  url: string;
  alias?: string;
  description?: string;
  parentFolderId: string;
}

export interface UpdateUrlInput {
  _id: string;
  url?: string;
  alias?: string;
  description?: string;
}

// Response types
export interface FetchAllUrlsResponse extends AxiosResponse {
  transactionTime: Date;
  content: {
    urls: Url[];
  };
}

export interface FetchUrlsInFolderByIdResponse extends AxiosResponse {
  transactionTime: Date;
  content: {
    urls: Url[];
  };
}

export interface CreateUrlResponse extends AxiosResponse {
  transactionTime: Date;
  content: Url;
}

export interface UpdateUrlResponse extends AxiosResponse {
  transactionTime: Date;
  content: Url;
}

export interface DeleteUrlResponse extends AxiosResponse {
  transactionTime: Date;
  content: Url;
}
