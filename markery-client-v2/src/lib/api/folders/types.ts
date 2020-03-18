import { AxiosResponse } from 'axios';

// Folder type

export enum FolderType {
  root,
  normal
}

export interface Folder {
  _id: string;
  folderName: string;
  parentFolderId?: string;
  owner?: string;
  type?: FolderType;
}

// Input types
export interface CreateFolderInput {
  folderName: string;
  parentFolderId: string;
}

export interface UpdateFolderInput {
  _id: string;
  folderName: string;
}

// Response types
export interface FetchRootFolderIdResponse extends AxiosResponse {
  transactionTime: Date;
  content: {
    rootFolderId: string;
  };
}

export interface FetchAllFoldersResponse extends AxiosResponse {
  transactionTime: Date;
  content: {
    folders: Folder[];
  };
}

export interface FetchSubfoldersInFolderByIdResponse extends AxiosResponse {
  transactionTime: Date;
  content: {
    folders: Folder[];
  };
}

export interface CreateFolderResponse extends AxiosResponse {
  transactionTime: Date;
  content: Folder;
}

export interface UpdateFolderResponse extends AxiosResponse {
  transactionTime: Date;
  content: Folder;
}

export interface DeleteFolderResponse extends AxiosResponse {
  transactionTime: Date;
  content: Folder;
}
