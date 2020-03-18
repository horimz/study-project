import React from 'react';
import { useContent, useLoading } from '../../lib/hooks';
import { ServiceContentHeader } from '../../components/service/ServiceContentHeader';

interface ServiceContentHeaderContainerProps {}

const ServiceContentHeaderContainer: React.FC<ServiceContentHeaderContainerProps> = props => {
  const { content } = useContent();
  const { loading, LoadingType } = useLoading();

  if (loading.isLoading && loading.type === LoadingType.global) return null;
  if (!content.currentFolder) return null;
  return <ServiceContentHeader folder={content.currentFolder} />;
};

export { ServiceContentHeaderContainer };
