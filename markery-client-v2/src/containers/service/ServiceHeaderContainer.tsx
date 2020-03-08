import React from "react";
import { useToggle } from "../../lib/hooks";
import { ServiceHeader } from "../../components/service/ServiceHeader";

interface ServiceHeaderContainerProps {}

const ServiceHeaderContainer: React.FC<ServiceHeaderContainerProps> = props => {
  const [open, onToggle] = useToggle(false);
  return <ServiceHeader open={open} onToggle={onToggle} />;
};

export { ServiceHeaderContainer };
