import React from "react";
import styled from "styled-components";
import { Button } from "../common/Button";

const SettingsDeleteAccountBlock = styled.div`
  padding: 3rem;
  button {
    transition: all 0.1s linear 0s;
  }
`;

interface SettingsDeleteAccountProps {}

const SettingsDeleteAccount: React.FC<SettingsDeleteAccountProps> = props => {
  return (
    <SettingsDeleteAccountBlock>
      <Button color='red'>DELETE ACCOUNT</Button>
    </SettingsDeleteAccountBlock>
  );
};

export { SettingsDeleteAccount };
