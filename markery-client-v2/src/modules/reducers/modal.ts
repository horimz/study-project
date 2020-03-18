import { modalActionTypes, ModalState, ModalAction } from '../actions/modal';
import produce from 'immer';

const initialState: ModalState = {
  content: null,
  createFolderModal: false,
  createUrlModal: false,
  updateUrlModal: false,
  deleteFolderModal: false
};

export function modalReducer(
  state: ModalState = initialState,
  action: ModalAction
) {
  switch (action.type) {
    case modalActionTypes.SET_MODAL_CONTENT:
      return produce(state, draft => {
        draft.content = action.payload;
      });
    case modalActionTypes.CREATE_FOLDER_MODAL_TOGGLE:
      return produce(state, draft => {
        draft.createFolderModal = !draft.createFolderModal;
        if (!draft.createFolderModal) {
          draft.content = null;
        }
      });
    case modalActionTypes.CREATE_URL_MODAL_TOGGLE:
      return produce(state, draft => {
        draft.createUrlModal = !draft.createUrlModal;
        if (!draft.createUrlModal) {
          draft.content = null;
        }
      });
    case modalActionTypes.UPDATE_URL_MODAL_TOOGGLE:
      return produce(state, draft => {
        draft.updateUrlModal = !draft.updateUrlModal;
        if (!draft.updateUrlModal) {
          draft.content = null;
        }
      });
    case modalActionTypes.DELETE_FOLDER_MODAL_TOGGLE:
      return produce(state, draft => {
        draft.deleteFolderModal = !draft.deleteFolderModal;
        if (!draft.deleteFolderModal) {
          draft.content = null;
        }
      });
    default:
      return state;
  }
}
