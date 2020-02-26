import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { LoginModal } from './LoginModal';
import { Button } from '../common/Button';
import './Navigation.scss';

const BREAK_POINT = 120;

interface NavigationProps {}

export const Navigation: React.FC<NavigationProps> = props => {
  const [prevScrollPos, setPrevScrollPos] = useState<number>(
    window.pageYOffset
  );
  const [navClassName, setNavClassName] = useState<string>('navigation');
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  const handleScroll = (): void => {
    const currentScrollPos = window.pageYOffset;

    setNavClassName(
      classNames(
        'navigation',
        {
          hide:
            currentScrollPos > BREAK_POINT && currentScrollPos > prevScrollPos
        },
        { boxed: currentScrollPos > BREAK_POINT + 30 }
      )
    );

    setPrevScrollPos(currentScrollPos);
  };

  return (
    <nav className={navClassName}>
      <div className='navigation__left'>Logo</div>
      <div className='navigation__right'>
        <Button color='black' onClick={() => setVisible(true)}>
          Log in
        </Button>
        <LoginModal visible={visible} onClose={() => setVisible(false)} />
      </div>
    </nav>
  );
};
