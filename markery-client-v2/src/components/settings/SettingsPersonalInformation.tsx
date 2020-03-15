import React from 'react';
import styled from 'styled-components';
import { palette } from '../../lib/styles';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Spinner } from '../common/Spinner';
import { useInputs } from '../../lib/hooks';
import { User } from '../../lib/api/auth/types';

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

interface SettingsPersonalInformationProps {
  user: User;
  onUpdate: Function;
  isLoading: boolean;
}

const SettingsPersonalInformation: React.FC<SettingsPersonalInformationProps> = ({
  user,
  onUpdate,
  isLoading
}) => {
  const [inputs, onChange] = useInputs({
    username: user.username,
    description: user.description || ''
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
      <Button
        color='green'
        onClick={() => onUpdate(inputs)}
        isLoading={isLoading}
      >
        {isLoading ? (
          <>
            <Spinner size='small' />
            APPLYING CHANGES
          </>
        ) : (
          'APPLY CHANGES'
        )}
      </Button>
    </SettingsPersonalInformationBlock>
  );
};

export { SettingsPersonalInformation };
