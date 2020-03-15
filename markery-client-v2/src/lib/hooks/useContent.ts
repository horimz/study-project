import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../modules';
import { ContentState } from '../../modules/actions/content';
import { contentActions } from '../../modules/actions/content';
import * as FolderTypes from '../api/folders/types';
import * as UrlTypes from '../api/urls/types';

export const useContent = () => {
  const content: ContentState = useSelector(
    (state: RootState) => state.content
  );

  const dispatch = useDispatch();

  const resetContent = useCallback(
    () => dispatch(contentActions.resetContent()),
    [dispatch]
  );

  const setCurrentFolder = useCallback(
    (folder: FolderTypes.Folder | null) =>
      dispatch(contentActions.setCurrentFolder(folder)),
    [dispatch]
  );

  const fetchRootFolderIdRequest = useCallback(
    () => dispatch(contentActions.fetchRootFolderIdRequest()),
    [dispatch]
  );

  const fetchContentRequest = useCallback(
    (folderId: string) =>
      dispatch(contentActions.fetchContentRequest(folderId)),
    [dispatch]
  );

  const fetchAllFoldersRequest = useCallback(
    () => dispatch(contentActions.fetchAllFolderRequest()),
    [dispatch]
  );

  const fetchAllUrlsRequest = useCallback(
    () => dispatch(contentActions.fetchAllUrlRequest()),
    [dispatch]
  );

  const createFolderRequest = useCallback(
    (data: FolderTypes.CreateFolderInput) =>
      dispatch(contentActions.createFolderRequest(data)),
    [dispatch]
  );

  const createUrlRequest = useCallback(
    (data: UrlTypes.CreateUrlInput) =>
      dispatch(contentActions.createUrlRequest(data)),
    [dispatch]
  );

  const updateFolderRequest = useCallback(
    (data: FolderTypes.UpdateFolderInput) =>
      dispatch(contentActions.updateFolderRequest(data)),
    [dispatch]
  );

  const updateUrlRequest = useCallback(
    (data: UrlTypes.UpdateUrlInput) =>
      dispatch(contentActions.updateUrlRequest(data)),
    [dispatch]
  );

  const deleteFolderRequest = useCallback(
    (id: string) => dispatch(contentActions.deleteFolderRequest(id)),
    [dispatch]
  );

  const deleteUrlRequest = useCallback(
    (id: string) => dispatch(contentActions.deleteUrlRequest(id)),
    [dispatch]
  );

  return {
    content,
    resetContent,
    setCurrentFolder,
    fetchRootFolderIdRequest,
    fetchContentRequest,
    fetchAllFoldersRequest,
    fetchAllUrlsRequest,
    createFolderRequest,
    createUrlRequest,
    updateFolderRequest,
    updateUrlRequest,
    deleteFolderRequest,
    deleteUrlRequest
  };
};
