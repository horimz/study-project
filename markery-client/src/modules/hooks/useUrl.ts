import { useSelector, useDispatch } from 'react-redux';
import {
  RootState,
  fetchUrls,
  addUrl,
  editUrl,
  deleteUrl,
  IUrl
} from '../redux';
import { useCallback } from 'react';

export const useUrl = () => {
  const urls: any = useSelector((state: RootState) => state.urls);
  const dispatch = useDispatch();

  const fetchAllUrls = useCallback(
    (parentFolderId: string) => dispatch(fetchUrls(parentFolderId)),
    [dispatch]
  );

  const addNewUrl = useCallback(
    (url: IUrl, parentFolderId: string) =>
      dispatch(addUrl(url, parentFolderId)),
    [dispatch]
  );

  const editCurrentUrl = useCallback(
    (updatedUrl: IUrl) => dispatch(editUrl(updatedUrl, urls)),
    [dispatch, urls]
  );

  const deleteCurrentUrl = useCallback(
    (id: string) => dispatch(deleteUrl(id, urls)),
    [dispatch, urls]
  );

  return {
    urls,
    fetchAllUrls,
    addNewUrl,
    editCurrentUrl,
    deleteCurrentUrl
  };
};
