import { useSelector, useDispatch } from 'react-redux';
import {
  RootState,
  addFolderToSelectedFolders,
  removeFolderFromSelectedFolders,
  addUrlToSelectedUrls,
  removeUrlFromSelectedUrls,
  resetSelectedContents
} from '../redux';
import { useCallback } from 'react';

export const useSelectedContent = () => {
  const selectedFolders = useSelector(
    (state: RootState) => state.selectedFolders
  );

  const selectedUrls = useSelector((state: RootState) => state.selectedUrls);

  const dispatch = useDispatch();

  const addFolderToList = useCallback(
    (folderId: string) => dispatch(addFolderToSelectedFolders(folderId)),
    [dispatch]
  );

  const removeFolderFromList = useCallback(
    (folderId: string) => dispatch(removeFolderFromSelectedFolders(folderId)),
    [dispatch]
  );

  const addUrlToList = useCallback(
    (urlId: string) => dispatch(addUrlToSelectedUrls(urlId)),
    [dispatch]
  );

  const removeUrlFromList = useCallback(
    (urlId: string) => dispatch(removeUrlFromSelectedUrls(urlId)),
    [dispatch]
  );

  const resetContents = useCallback(() => dispatch(resetSelectedContents()), [
    dispatch
  ]);

  return {
    selectedFolders,
    selectedUrls,
    addFolderToList,
    removeFolderFromList,
    addUrlToList,
    removeUrlFromList,
    resetContents
  };
};
