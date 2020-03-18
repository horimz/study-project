import React from "react";
import styled from "styled-components";
import { zIndex } from "../../lib/styles";

const NotificationTemplateBlock = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: ${zIndex.notification};
`;

interface NotificationTemplateProps {}

const NotificationTemplate: React.FC<NotificationTemplateProps> = ({
  children
}) => {
  return <NotificationTemplateBlock>{children}</NotificationTemplateBlock>;
};

export { NotificationTemplate };
