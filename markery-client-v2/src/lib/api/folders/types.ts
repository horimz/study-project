// Folder type
export interface Folder {
  id?: string;
  folderName: string;
}

// Input types
export interface CreateFolderInput {
  folderName: string;
  parentFolderId: string;
}

export interface UpdateFolderInput {
  id: string;
  folderName: string;
}

// Response types
export interface GetRootFolderIdResponse {
  transactionTime: Date;
  content: {
    id: string;
  };
}

export interface GetSubfoldersInFolderByIdResposne {
  transactionTime: Date;
  content: {
    folders: Folder[];
  };
}

export interface CreateFolderResponse {
  transactionTime: Date;
  content: Folder;
}

export interface UpdateFolderResponse {
  transactionTime: Date;
  content: {};
}

export interface DeleteFolderResponse {
  transactionTime: Date;
  content: {};
}
