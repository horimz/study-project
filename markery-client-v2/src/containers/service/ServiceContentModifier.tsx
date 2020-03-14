import React from 'react';
import { useModal, useContent, useLoading } from '../../lib/hooks';
import { ServiceEditUrlModal } from '../../components/service/ServiceEditUrlModal';
import { UpdateUrlInput } from '../../lib/api/urls/types';

interface ServiceContentModifierProps {}

const ServiceContentModifier: React.FC<ServiceContentModifierProps> = props => {
  const { modal, updateUrlModalToggle } = useModal();
  const { updateUrlRequest } = useContent();
  const { loading, LoadingType } = useLoading();

  const onUrlUpdate = (data: UpdateUrlInput) => {
    const { content } = modal;

    if (
      data.url === content.url &&
      data.alias === content.alias &&
      data.description === content.description
    ) {
      updateUrlModalToggle();
      return;
    }

    updateUrlRequest(data);
  };

  return (
    <ServiceEditUrlModal
      open={modal.updateUrlModal}
      onClose={updateUrlModalToggle}
      content={modal.content}
      onEdit={onUrlUpdate}
      isLoading={loading.isLoading && loading.type === LoadingType.updateUrl}
    />
  );
};

export { ServiceContentModifier };
