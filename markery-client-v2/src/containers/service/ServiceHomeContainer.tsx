import React, { useEffect } from 'react';
import { useContent, useLoading } from '../../lib/hooks';
import { Folder } from '../../components/base/Folder';
import { Url } from '../../components/base/Url';
import { Skeleton } from '../../components/base/Skeleton';
import { ServiceNoContent } from '../../components/service/ServiceNoContent';
import { Folder as IFolder, FolderType } from '../../lib/api/folders/types';
import { Url as UrlType } from '../../lib/api/urls/types';

interface ServiceHomeContainerProps {}

const ServiceHomeContainer: React.FC<ServiceHomeContainerProps> = props => {
  const {
    content,
    fetchContentRequest,
    setCurrentFolder,
    resetContent
  } = useContent();
  const { loading, LoadingType } = useLoading();

  useEffect(() => {
    if (content.rootFolderId) {
      setCurrentFolder({
        _id: content.rootFolderId,
        folderName: '__ROOT_FOLDER__',
        type: FolderType.root
      });
      fetchContentRequest(content.rootFolderId);
    }
  }, [
    resetContent,
    fetchContentRequest,
    setCurrentFolder,
    content.rootFolderId
  ]);

  const renderContent = () => {
    if (!content.rootFolderId || !content.folders || !content.urls) {
      return <Skeleton />;
    }

    if (loading.isLoading && loading.type === LoadingType.global) {
      return <div>Loading</div>;
    }

    if (content.folders.length === 0 && content.urls.length === 0) {
      return <ServiceNoContent />;
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

export { ServiceHomeContainer };
