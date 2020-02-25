import React, { useState } from 'react';
import { useAuth } from '../../modules/hooks';
import { Button } from '../common/Button';
import './SettingInfo.scss';

interface SettingInfoProps {}

export const SettingInfo: React.FC<SettingInfoProps> = props => {
  const { auth, editCurrentUser } = useAuth();

  const [edit, setEdit] = useState<boolean>(false);
  const [username, setUsername] = useState<string>(auth.username);
  const [description, setDescription] = useState<string>(auth.description);

  const onEdit = async () => {
    if (auth.username === username && auth.description === description)
      return setEdit(false);

    const updatedUser = {
      ...auth,
      username,
      description
    };

    editCurrentUser(auth, updatedUser);
    setEdit(false);
  };

  if (edit) {
    return (
      <div className='info-edit'>
        <div className='info-edit__username-input'>
          <input
            type='text'
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div className='info-edit__description-input'>
          <input
            type='text'
            value={description}
            onChange={e => setDescription(e.target.value)}
            autoFocus
          />
        </div>
        <div className='info-edit__button'>
          <Button size='small' color='green' onClick={onEdit}>
            Edit
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className='info'>
      <div className='info__username'>{auth.username}</div>
      <div className='info__description'>{auth.description}</div>
      <div className='info__edit' onClick={() => setEdit(true)}>
        Edit
      </div>
    </div>
  );
};
