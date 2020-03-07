import React from "react";
import styled from "styled-components";
import { palette, mixin } from "../../lib/styles";

const SettingsTemplateBlock = styled.div`
  min-height: 100vh;
  background-color: ${palette.background};
  ${mixin.flexCenter}
`;

interface SettingsTemplateProps {}

const SettingsTemplate: React.FC<SettingsTemplateProps> = ({ children }) => {
  return <SettingsTemplateBlock>{children}</SettingsTemplateBlock>;
};

export { SettingsTemplate };
