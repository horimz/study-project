import React from "react";
import styled from "styled-components";
import { Button } from "../common/Button";
import { useToggle } from "../../lib/hooks";
import { SettingsDeleteAccountModal } from "./SettingsDeleteAccountModal";

const SettingsDeleteAccountBlock = styled.div`
  padding: 3rem;
  button {
    transition: all 0.1s linear 0s;
  }
`;

interface SettingsDeleteAccountProps {}

const SettingsDeleteAccount: React.FC<SettingsDeleteAccountProps> = props => {
  const [open, onToggle] = useToggle(false);

  return (
    <SettingsDeleteAccountBlock>
      <Button color='red' onClick={onToggle}>
        DELETE ACCOUNT
      </Button>
      <SettingsDeleteAccountModal open={open} onClose={onToggle} />
    </SettingsDeleteAccountBlock>
  );
};

export { SettingsDeleteAccount };
