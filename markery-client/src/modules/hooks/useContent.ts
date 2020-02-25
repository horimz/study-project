import { useSelector, useDispatch } from 'react-redux';
import { RootState, fetchFolders, fetchUrls, IUrl, IFolder } from '../redux';
import { useCallback, useEffect } from 'react';

interface FolderWithCreatedAt extends IFolder {
  createdAt: Date;
}

interface UrlWithCreatedAt extends IUrl {
  createdAt: Date;
}

type ContentType = FolderWithCreatedAt | UrlWithCreatedAt;

export const useContent = () => {
  const folders: IFolder[] = useSelector((state: RootState) => state.folders);

  const urls: IUrl[] = useSelector((state: RootState) => state.urls);

  const dispatch = useDispatch();

  const contents: any = [...folders, ...urls];

  useEffect(() => {
    contents.sort((first: ContentType, second: ContentType) => {
      const a = new Date(first.createdAt).getTime();
      const b = new Date(second.createdAt).getTime();
      return a - b;
    });
  }, [folders, urls, contents]);

  const fetchContents = useCallback(
    (parentId: string) => {
      dispatch(fetchFolders(parentId));
      dispatch(fetchUrls(parentId));
    },
    [dispatch]
  );

  return {
    folders,
    urls,
    contents,
    fetchContents
  };
};
