import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../modules';
import { ModalState } from '../../modules/actions/modal';
import { modalActions } from '../../modules/actions/modal';

export const useModal = () => {
  const modal: ModalState = useSelector((state: RootState) => state.modal);

  const dispatch = useDispatch();

  const setModalContent = useCallback(
    (data: any) => dispatch(modalActions.setModalContent(data)),
    [dispatch]
  );

  const createFolderModalToggle = useCallback(
    () => dispatch(modalActions.createFolderModalToggle()),
    [dispatch]
  );

  const createUrlModalToggle = useCallback(
    () => dispatch(modalActions.createUrlModalToggle()),
    [dispatch]
  );

  const updateUrlModalToggle = useCallback(
    () => dispatch(modalActions.updateUrlModalToggle()),
    [dispatch]
  );

  return {
    modal,
    setModalContent,
    createFolderModalToggle,
    createUrlModalToggle,
    updateUrlModalToggle
  };
};
