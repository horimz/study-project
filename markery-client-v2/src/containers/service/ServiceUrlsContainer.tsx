import React, { useEffect } from 'react';
import { useContent } from '../../lib/hooks';
import { Url } from '../../components/base/Url';
import { Skeleton } from '../../components/base/Skeleton';
import { Url as UrlType } from '../../lib/api/urls/types';

interface ServiceUrlsContainerProps {}

const ServiceUrlsContainer: React.FC<ServiceUrlsContainerProps> = () => {
  const { content, fetchAllUrlsRequest } = useContent();

  useEffect(() => {
    fetchAllUrlsRequest();
  }, [fetchAllUrlsRequest]);

  const renderContent = () => {
    if (!content.rootFolderId || !content.urls) {
      return <Skeleton />;
    }

    if (content.urls && content.urls.length === 0) {
      return <div>No Content...</div>;
    }

    return (
      content.urls &&
      content.urls.map((url: UrlType) => {
        return <Url key={url._id} url={url} />;
      })
    );
  };

  return <>{renderContent()}</>;
};

export { ServiceUrlsContainer };
