import React, { useEffect } from 'react';
import { useContent } from '../../lib/hooks';
import { Folder } from '../../components/base/Folder';
import { Skeleton } from '../../components/base/Skeleton';
import { Folder as FolderType } from '../../lib/api/folders/types';

interface ServiceFoldersContainerProps {}

const ServiceFoldersContainer: React.FC<ServiceFoldersContainerProps> = () => {
  const { content, fetchAllFoldersRequest } = useContent();

  useEffect(() => {
    fetchAllFoldersRequest();
  }, [fetchAllFoldersRequest]);

  const renderContent = () => {
    if (!content.rootFolderId || !content.folders) {
      return <Skeleton />;
    }

    if (content.folders && content.folders.length === 0) {
      return <div>No Content...</div>;
    }

    return (
      content.folders &&
      content.folders.map((folder: FolderType) => {
        return <Folder key={folder._id} folder={folder} />;
      })
    );
  };

  return <>{renderContent()}</>;
};

export { ServiceFoldersContainer };
