import React, { useState } from 'react';
import { CreateUrlModal } from './CreateUrlModal';
import { CreateFolderModal } from './CreateFolderModal';
import { Button } from '../common/Button';
import './ServiceRightSideBar.scss';

interface ServiceRightSideBarProps {}

export const ServiceRightSideBar: React.FC<ServiceRightSideBarProps> = props => {
  const [openUrlModal, setOpenUrlModal] = useState<boolean>(false);
  const [openFolderModal, setOpenFolderModal] = useState<boolean>(false);

  return (
    <div className='service-right-bar'>
      <div className='service-right-bar__container'>
        <div className='service-right-bar__url'>
          <Button color='blue' strech onClick={() => setOpenUrlModal(true)}>
            Create new url
          </Button>
          <CreateUrlModal
            visible={openUrlModal}
            onClose={() => setOpenUrlModal(false)}
          />
        </div>
        <div className='service-right-bar__folder'>
          <Button
            color='blue'
            noFill
            strech
            style={{ display: 'flex', justifyContent: 'space-around' }}
            onClick={() => setOpenFolderModal(true)}
          >
            <span
              className='icon folder'
              style={{ transform: 'translateX(-15px)' }}
            ></span>
            Add folder
          </Button>
          <CreateFolderModal
            visible={openFolderModal}
            onClose={() => setOpenFolderModal(false)}
          />
        </div>
      </div>
    </div>
  );
};
