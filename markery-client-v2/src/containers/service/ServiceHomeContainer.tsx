import React, { useEffect } from 'react';
import { useContent } from '../../lib/hooks';
import { ServiceActions } from '../../components/service/ServiceActions';
import { Folder } from '../../components/base/Folder';
import { Url } from '../../components/base/Url';
import { Skeleton } from '../../components/base/Skeleton';
import { ServiceNoContent } from '../../components/service/ServiceNoContent';
import { Folder as FolderType } from '../../lib/api/folders/types';
import { Url as UrlType } from '../../lib/api/urls/types';

interface ServiceHomeContainerProps {}

const ServiceHomeContainer: React.FC<ServiceHomeContainerProps> = props => {
  const { content, fetchContentRequest } = useContent();

  useEffect(() => {
    if (content.rootFolderId) {
      fetchContentRequest(content.rootFolderId);
    }
  }, [fetchContentRequest, content.rootFolderId]);

  const renderContent = () => {
    if (!content.rootFolderId || !content.folders || !content.urls) {
      return <Skeleton />;
    }

    // FIX: when user goes back from an empty file this should not be displayed
    // finished fetch content state  를 넣는게 좋을까???
    if (content.folders.length === 0 && content.urls.length === 0) {
      return (
        <>
          <ServiceActions folderId={content.rootFolderId} />
          <ServiceNoContent />
        </>
      );
    }

    return (
      <>
        <ServiceActions folderId={content.rootFolderId} />
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

export { ServiceHomeContainer };
