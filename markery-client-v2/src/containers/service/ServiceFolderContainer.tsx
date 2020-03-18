import React, { useEffect } from 'react';
import { useContent, useLoading } from '../../lib/hooks';
import { Folder } from '../../components/base/Folder';
import { Url } from '../../components/base/Url';
import { Skeleton } from '../../components/base/Skeleton';
import { Folder as IFolder, FolderType } from '../../lib/api/folders/types';
import { Url as UrlType } from '../../lib/api/urls/types';

interface ServiceFolderContainerProps {
  folderId: string;
  folderName: string;
}

const ServiceFolderContainer: React.FC<ServiceFolderContainerProps> = ({
  folderId,
  folderName
}) => {
  const { content, fetchContentRequest, setCurrentFolder } = useContent();
  const { loading, LoadingType } = useLoading();

  useEffect(() => {
    setCurrentFolder({ _id: folderId, folderName, type: FolderType.normal });
    fetchContentRequest(folderId);
  }, [setCurrentFolder, fetchContentRequest, folderId, folderName]);

  const renderContent = () => {
    if (!content.rootFolderId || !content.folders || !content.urls) {
      return <Skeleton />;
    }

    if (loading.isLoading && loading.type === LoadingType.global) {
      return <div>Loading</div>;
    }

    if (content.folders.length === 0 && content.urls.length === 0) {
      return <div>No Content</div>;
    }

    return (
      <>
        {content.folders &&
          content.folders.map((folder: IFolder, FolderType) => {
            return <Folder key={folder._id} folder={folder} />;
          })}
        {content.urls &&
          content.urls.map((url: UrlType) => <Url key={url._id} url={url} />)}
      </>
    );
  };

  return <>{renderContent()}</>;
};

export { ServiceFolderContainer };
