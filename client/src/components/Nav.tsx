import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
      setNavigationClass('navigation black');
    } else {
      if (currentScrollPos < FIXED_NAVBAR_TOP_OFFSET_LIMIT) {
        setNavigationClass('navigation--boxed white');
      } else {
        if (prevScrollPos < currentScrollPos) {
          setNavigationClass('navigation--hidden white');
        } else {
          setNavigationClass('navigation--boxed white');
        }
      }
    }

    setPrevScrollPos(currentScrollPos);
  };

  // TODO: Create toggle menu functionality
  const handleResize = (): void => setWindowWidth(window.innerWidth);

  if (windowWidth < FIXED_NAVBAR_MAX_WIDTH) return <MobileNav />;

  return (
    <nav className={navigationClass}>
      <div className='navigation__logo'>Logo</div>
      <div className='navigation__right-content'>
        <Link to='/login' className='navigation__right-content__link'>
          Log In
        </Link>
        <Link to='/signup' className='navigation__right-content__link'>
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export const Nav = _Nav;
