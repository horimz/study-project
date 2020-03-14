import React, { useEffect } from 'react';
import { useContent } from '../../lib/hooks';
import { ServiceActions } from '../../components/service/ServiceActions';
import { Folder } from '../../components/base/Folder';
import { Url } from '../../components/base/Url';
import { Skeleton } from '../../components/base/Skeleton';
import { Folder as FolderType } from '../../lib/api/folders/types';
import { Url as UrlType } from '../../lib/api/urls/types';

interface ServiceFolderContainerProps {
  folderId: string;
}

const ServiceFolderContainer: React.FC<ServiceFolderContainerProps> = ({
  folderId
}) => {
  const { content, fetchContentRequest } = useContent();

  useEffect(() => {
    fetchContentRequest(folderId);
  }, [fetchContentRequest, folderId]);

  const renderContent = () => {
    if (!content.rootFolderId || !content.folders || !content.urls) {
      return <Skeleton />;
    }

    if (content.folders.length === 0 && content.urls.length === 0) {
      return (
        <>
          <ServiceActions folderId={folderId} />
          <div>No Content...</div>
        </>
      );
    }

    return (
      <>
        <ServiceActions folderId={folderId} />
        {content.folders &&
          content.folders.map((folder: FolderType) => {
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
