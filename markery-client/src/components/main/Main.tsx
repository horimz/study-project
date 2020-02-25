import React from 'react';
import { HashLink } from 'react-router-hash-link';
import { Link } from 'react-router-dom';
import { Button } from '../common/Button';
import './Main.scss';

interface MainProps {}

export const Main: React.FC<MainProps> = props => {
  return (
    <div className='main'>
      <div className='main__box'>
        <div className='main__content'>
          <div className='main__content__left'>
            <div className='main__content__sticky'>
              <div className='main__content__left-header'>
                <h1 className='heading-1'>What is Markery?</h1>
                <p className=''>Markery is a bookmark service...</p>
              </div>
              <div className='main__content__left-links'>
                <HashLink
                  className='main__content__left-link'
                  to='/#about'
                  smooth
                >
                  <span>01</span>About
                </HashLink>
                <HashLink
                  className='main__content__left-link'
                  to='/#service'
                  smooth
                >
                  <span>02</span>Service
                </HashLink>
                <HashLink
                  className='main__content__left-link'
                  to='/#share'
                  smooth
                >
                  <span>03</span>Share
                </HashLink>
                <div className='main__content__left-link'>
                  <Link to='/register' style={{ textDecoration: 'none' }}>
                    <Button size='large' secondary>
                      Sign up
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className='main__content__right'>
            <div className='main__content__about' id='about'>
              About
            </div>
            <div className='main__content__service' id='service'>
              Service
            </div>
            <div className='main__content__share' id='share'>
              Share
            </div>
          </div>
        </div>
      </div>
      <div className='main__bottom'>
        <div className='main__bottom__header'>Share bookmarks</div>
        <div className='main__bottom__content'>Content</div>
        <div className='main__bottom__button'>
          <Link to='/share' style={{ textDecoration: 'none' }}>
            <Button size='large' secondary>
              Explore Sharing
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
