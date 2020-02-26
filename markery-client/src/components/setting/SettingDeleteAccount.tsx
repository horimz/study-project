import React, { useState } from 'react';
import { AccountDeleteModal } from './AccountDeleteModal';
import { Button } from '../common/Button';
import './SettingDeleteAccount.scss';

interface SettingDeleteAccountProps {}

export const SettingDeleteAccount: React.FC<SettingDeleteAccountProps> = props => {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <div className='setting-delete-account'>
      <div className='setting-delete-account__content'>
        <h3 className='heading-3 setting-delete-account__header'>
          Delete account
        </h3>
        <div className='setting-delete-account__button'>
          <Button color='red' size='small' onClick={() => setVisible(true)}>
            Delete account
          </Button>

          <AccountDeleteModal
            visible={visible}
            onClose={() => setVisible(false)}
          />
        </div>
      </div>
      <div className='setting-delete-account__description'>
        All contents you made will be deleted and will not be recovered.
      </div>
    </div>
  );
};
