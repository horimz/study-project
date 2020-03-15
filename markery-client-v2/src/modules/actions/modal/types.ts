export interface ModalState {
  content: any;
  createFolderModal: boolean;
  createUrlModal: boolean;
  updateUrlModal: boolean;
  deleteFolderModal: boolean;
}

// TODO: any way for typesafe actions?
export interface ModalAction {
  type: string;
  payload?: any;
}
