import React from "react";
import { ServiceActions } from "../../components/service/ServiceActions";
import { Folder } from "../../components/base/Folder";
import { Url } from "../../components/base/Url";

interface ServiceHomeContainerProps {}

// TODO: fetch root folder contents
const ServiceHomeContainer: React.FC<ServiceHomeContainerProps> = props => {
  return (
    <>
      <ServiceActions />
      <Folder />
      <Folder />
      <Folder />
      <Url />
      <Url />
      <Url />
    </>
  );
};

export { ServiceHomeContainer };
