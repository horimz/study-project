import React from 'react';
import classNames from 'classnames';
import { useSelectedContent } from '../../modules/hooks';
import './Checkbox.scss';

interface CheckboxProps {
  id: string | undefined;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
}

export const Checkbox: React.FC<CheckboxProps> = ({ id, onChange }) => {
  const { selectedFolders, selectedUrls } = useSelectedContent();
  const selectedContentNum = selectedFolders.length + selectedUrls.length;

  const labelClasses = classNames('checkbox-label', {
    'show-border': selectedContentNum > 0
  });

  return (
    <div className='checkbox'>
      <input
        type='checkbox'
        id={id}
        className='checkbox-hidden'
        onChange={onChange}
      />
      <label htmlFor={id} className={labelClasses}>
        <span className='icon checked small transform-checked-icon'></span>
      </label>
    </div>
  );
};
