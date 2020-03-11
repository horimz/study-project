import React from "react";
import { useToggle } from "../../lib/hooks";
import { ServiceDeleteFolderModal } from "./ServiceDeleteFolderModal";
import { ServiceEditUrlModal } from "./ServiceEditUrlModal";

interface ServiceContentModifierProps {}

const ServiceContentModifier: React.FC<ServiceContentModifierProps> = props => {
  const [openDeleteFolderModal, onDeleteFolderModalToggle] = useToggle(false);
  const [openEditUrlModal, onEditUrlModalToggle] = useToggle(false);

  return (
    <>
      <ServiceDeleteFolderModal
        open={openDeleteFolderModal}
        onClose={onDeleteFolderModalToggle}
      />
      <ServiceEditUrlModal
        open={openEditUrlModal}
        onClose={onEditUrlModalToggle}
      />
    </>
  );
};

export { ServiceContentModifier };
