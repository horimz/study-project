import React from "react";
import styled from "styled-components";
import { palette } from "../../lib/styles";
import { Button } from "../common/Button";
import { Input } from "../common/Input";
import { useInputs } from "../../lib/hooks";

const SettingsPersonalInformationBlock = styled.div`
  border-bottom: 1px solid ${palette.border};
  padding: 0 3rem 3rem;
  h3 {
    margin: 2.5rem 0 2rem;
    color: ${palette.grey5};
  }
  button {
    margin-top: 3rem;
  }
`;

interface SettingsPersonalInformationProps {}

const SettingsPersonalInformation: React.FC<SettingsPersonalInformationProps> = props => {
  const [inputs, onChange] = useInputs({
    username: "Fetch username from user information",
    description: ""
  });

  return (
    <SettingsPersonalInformationBlock>
      <h3>Personal information</h3>
      <Input
        label='Username'
        id='settings-username'
        name='username'
        value={inputs.username}
        onChange={onChange}
        type='text'
        clearBackground
      />
      <Input
        label='Description'
        id='settings-description'
        name='description'
        value={inputs.description}
        onChange={onChange}
        placeholder='Tell us about yourself'
        type='text'
        clearBackground
      />
      <Button color='green'>APPLY CHANGES</Button>
    </SettingsPersonalInformationBlock>
  );
};

export { SettingsPersonalInformation };
