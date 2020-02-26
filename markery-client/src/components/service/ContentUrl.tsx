import React, { useState } from 'react';
import classNames from 'classnames';
import { useSelectedContent } from '../../modules/hooks';
import { IUrl } from '../../modules/redux';
import { EditTab } from './EditTab';
import { Checkbox } from '../common/Checkbox';
import { Button } from '../common/Button';
import './ContentUrl.scss';

interface ContentUrlProps {
  url: IUrl;
}

export const ContentUrl: React.FC<ContentUrlProps> = ({ url }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [blueBackground, setBlueBackground] = useState<boolean>(false);
  const { addUrlToList, removeUrlFromList } = useSelectedContent();

  const onChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      addUrlToList(e.target.id);
      setBlueBackground(true);
    } else {
      removeUrlFromList(e.target.id);
      setBlueBackground(false);
    }
  };

  const contentAreaClasses = classNames('content-url__content-area', {
    blueBackground
  });

  return (
    <div className='content-url'>
      <div className='content-url__checkbox-area'>
        <Checkbox id={url._id} onChange={onChecked} />
      </div>

      <div className={contentAreaClasses}>
        <a
          href={url.url}
          rel='noopener noreferrer'
          target='_blank'
          className='content-url__alias'
        >
          <p>{url.alias}</p>
          <div className='content-url__url'>
            <p>{url.url}</p>
            {url.description ? (
              <div className='content-url__description'>{url.description}</div>
            ) : null}
          </div>
        </a>

        <div className='content-url__edit'>
          <Button
            size='tiny'
            color='transparentBlue'
            onClick={() => setVisible(true)}
          >
            Edit
          </Button>
          <EditTab
            visible={visible}
            onClose={() => setVisible(false)}
            url={url}
          />
        </div>
      </div>
    </div>
  );
};
