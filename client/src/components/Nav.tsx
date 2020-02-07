import React, { useState, useEffect } from 'react';
// import { HashLink } from 'react-router-hash-link';

import { MobileNav } from './MobileNav';

let FIXED_NAVBAR_BOXED_START_POINT = 30;
let FIXED_NAVBAR_TOP_OFFSET_LIMIT = 400;
let FIXED_NAVBAR_MAX_WIDTH = 500;

interface NavProps {
  boxedPoint?: number;
  offsetLimit?: number;
}

const _Nav: React.FC<NavProps> = props => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [navigationClass, setNavigationClass] = useState('navigation');

  if (props.boxedPoint) FIXED_NAVBAR_BOXED_START_POINT = props.boxedPoint;
  if (props.offsetLimit) FIXED_NAVBAR_TOP_OFFSET_LIMIT = props.offsetLimit;

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    // ComponentDidUnmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  });

  const handleScroll = (): void => {
    const currentScrollPos = window.pageYOffset;

    if (currentScrollPos < FIXED_NAVBAR_BOXED_START_POINT) {
      setNavigationClass('navigation');
    } else {
      if (currentScrollPos < FIXED_NAVBAR_TOP_OFFSET_LIMIT) {
        setNavigationClass('navigation--boxed');
      } else {
        if (prevScrollPos < currentScrollPos) {
          setNavigationClass('navigation--hidden');
        } else {
          setNavigationClass('navigation--boxed');
        }
      }
    }

    setPrevScrollPos(currentScrollPos);
  };

  // TODO: Create toggle menu functionality
  const handleResize = (): void => setWindowWidth(window.innerWidth);

  if (windowWidth < FIXED_NAVBAR_MAX_WIDTH) return <MobileNav />;

  return <nav className={navigationClass}>Navigation</nav>;
};

export const Nav = _Nav;
