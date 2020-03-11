import React from "react";
import { ServiceSearchBar } from "../../components/service/ServiceSearchBar";

interface ServiceSearchContainerProps {}

const ServiceSearchContainer: React.FC<ServiceSearchContainerProps> = props => {
  return <ServiceSearchBar onChange={e => console.log(e.target.value)} />;
};

export { ServiceSearchContainer };
