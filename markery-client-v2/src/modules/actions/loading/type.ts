export enum LoadingType {
  none,
  global,
  // auth
  register,
  login,
  updateUser,
  deleteUser,
  // content
  fetchContent,
  fetchAllFolders,
  fetchAllUrls,
  // folder
  fetchRootFolderId,
  createFolder,
  updateFolder,
  deleteFolder,
  // url
  createUrl,
  updateUrl,
  deleteUrl
}

export interface LoadingState {
  isLoading: boolean;
  type: LoadingType;
}

// TODO: any way for typesafe actions?
export interface LoadingAction {
  type: string;
  payload?: any;
}
