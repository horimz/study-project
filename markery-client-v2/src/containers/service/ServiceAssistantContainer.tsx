import React from "react";
import { useToggle } from "../../lib/hooks";
import { ServiceAssistant } from "../../components/service/ServiceAssistant";

interface ServiceAssistantContainerProps {}

const ServiceAssistantContainer: React.FC<ServiceAssistantContainerProps> = props => {
  const [open, onToggle] = useToggle(false);
  return <ServiceAssistant open={open} onToggle={onToggle} />;
};

export { ServiceAssistantContainer };
