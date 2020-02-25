import React, { ReactNode, useState } from 'react';
import classNames from 'classnames';
import './Ellipsis.scss';

type ColorTypes = 'grey' | 'black' | 'transparent';

interface EllipsisProps {
  content: ReactNode;
  color?: ColorTypes;
}

export const Ellipsis: React.FC<EllipsisProps> = ({
  content,
  color = 'grey'
}) => {
  const [visible, setVisible] = useState<boolean>(false);

  const iconClasses = classNames(`ellipsis__icon ${color}`);
  const contentClasses = classNames('ellipsis__content', { visible });

  return (
    <div className='ellipsis' onClick={() => setVisible(!visible)}>
      <span className={iconClasses}>
        <div className={contentClasses}>{content}</div>
      </span>
    </div>
  );
};
