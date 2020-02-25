import React from 'react';
import { Toggler } from '../common/Toggler';
import './SettingAgreement.scss';

interface SettingAgreementProps {}

export const SettingAgreement: React.FC<SettingAgreementProps> = props => {
  return (
    <div className='setting-agreement'>
      <div className='setting-agreement__content'>
        <h3 className='heading-3 setting-agreement__header'>
          Email notification settings
        </h3>
        <div className='setting-agreement__togglers'>
          <div className='setting-agreement__togglers-title'>
            <div>Updates</div>
            <div>Subscriptions</div>
            <div>Likes</div>
          </div>
          <div className='setting-agreement__togglers-toggler'>
            <div>
              <Toggler size='small' color='green' />
            </div>
            <div>
              <Toggler size='small' color='green' />
            </div>
            <div>
              <Toggler size='small' color='green' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
