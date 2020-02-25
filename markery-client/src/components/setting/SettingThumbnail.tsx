import React from 'react';
import { Button } from '../common/Button';
import './SettingThumbnail.scss';

interface SettingThumbnailProps {}

export const SettingThumbnail: React.FC<SettingThumbnailProps> = props => {
  return (
    <div className='thumbnail'>
      <div className='thumbnail__content'>
        <span className='icon profile huge'></span>
      </div>
      <Button size='small' color='green' style={{ width: '150px' }}>
        Upload picture
      </Button>
      <Button size='small' color='green' transparent style={{ width: '150px' }}>
        Remove picture
      </Button>
    </div>
  );
};
