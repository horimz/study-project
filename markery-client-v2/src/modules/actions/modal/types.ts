export interface ModalState {
  content: any;
  createFolderModal: boolean;
  createUrlModal: boolean;
  updateUrlModal: boolean;
}

// TODO: any way for typesafe actions?
export interface ModalAction {
  type: string;
  payload?: any;
}
