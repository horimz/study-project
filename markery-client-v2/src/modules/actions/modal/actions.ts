import { modalActionTypes } from './constants';

export const setModalContent = (data: any) => ({
  type: modalActionTypes.SET_MODAL_CONTENT,
  payload: data
});

export const createFolderModalToggle = () => ({
  type: modalActionTypes.CREATE_FOLDER_MODAL_TOGGLE
});

export const createUrlModalToggle = () => ({
  type: modalActionTypes.CREATE_URL_MODAL_TOGGLE
});

export const updateUrlModalToggle = () => ({
  type: modalActionTypes.UPDATE_URL_MODAL_TOOGGLE
});

export const modalActions = {
  setModalContent,
  createFolderModalToggle,
  createUrlModalToggle,
  updateUrlModalToggle
};
