import React from "react";
import styled from "styled-components";
import { StyledSegmentBox } from "../common/SegmentBox";
import { palette } from "../../lib/styles";
import { SettingsPersonalInformation } from "./SettingsPersonalInformation";
import { SettingsDeleteAccount } from "./SettingsDeleteAccount";
import { SettingsAgreements } from "./SettingsAgreements";

const SettingsAccountBlock = styled(StyledSegmentBox)`
  margin: 6.5rem 0;
  width: 720px;
  align-items: stretch;
`;

const SettingHeader = styled.div`
  border-bottom: 1px solid ${palette.border};
  h2 {
    font-size: 2.5rem;
    font-weight: 400;
    padding: 3rem;
  }
`;

export type UpdateUserInputs = {
  username?: string;
  description?: string;
};

interface SettingsAccountProps {}

const SettingsAccount: React.FC<SettingsAccountProps> = () => {
  return (
    <SettingsAccountBlock>
      <SettingHeader>
        <h2>Settings</h2>
      </SettingHeader>
      <SettingsPersonalInformation />
      <SettingsAgreements />
      <SettingsDeleteAccount />
    </SettingsAccountBlock>
  );
};

export { SettingsAccount };
