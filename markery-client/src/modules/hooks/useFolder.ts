import { useSelector, useDispatch } from 'react-redux';
import {
  RootState,
  fetchRootFolder,
  fetchFolders,
  addFolder,
  editFolder,
  deleteFolder,
  IFolder
} from '../redux';
import { useCallback } from 'react';

export const useFolder = () => {
  const auth: any = useSelector((state: RootState) => state.auth);

  const folders: any = useSelector((state: RootState) => state.folders);

  const dispatch = useDispatch();

  const fetchRootFolderId = useCallback(
    () => dispatch(fetchRootFolder(auth._id)),
    [auth, dispatch]
  );

  const fetchAllFolders = useCallback(
    (parentId: string) => dispatch(fetchFolders(parentId)),
    [dispatch]
  );

  const addNewFolder = useCallback(
    (folderName: string, parentFolderId: string) =>
      dispatch(addFolder(folderName, parentFolderId)),
    [dispatch]
  );

  const editCurrentFolder = useCallback(
    (updatedFolder: IFolder) => dispatch(editFolder(updatedFolder, folders)),
    [dispatch, folders]
  );

  const deleteCurrentFolder = useCallback(
    (id: string) => dispatch(deleteFolder(id, folders)),
    [dispatch, folders]
  );

  return {
    folders,
    fetchRootFolderId,
    fetchAllFolders,
    addNewFolder,
    editCurrentFolder,
    deleteCurrentFolder
  };
};
