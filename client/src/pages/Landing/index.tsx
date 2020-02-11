import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

import { StoreState } from '../../common/reducers';
import { User, fetchUser } from '../../common/actions';

import { Nav } from '../../components/Nav';
import { Footer } from '../../components/Footer';

interface LandingProps {
  auth: User | boolean | null;
  fetchUser: Function;
}

const _Landing: React.FC<LandingProps> = props => {
  const [scrollPos, setScrollPos] = useState(window.pageYOffset);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  const handleScroll = (): void => {
    console.log(window.pageYOffset);
    setScrollPos(window.pageYOffset);
  };

  return (
    <div className='landing'>
      <Nav />
      <header className='hero'>Hero</header>

      <main className='landing-main'>
        <div className='landing-main__left'>
          <div className='landing-main__left__content'>
            <h3 className='u-mb-md'>What is Markery?</h3>
            <p className='landing-main__left__content-text u-mb-lg'>
              Markery is a web service where you can manage your favorite links.
              It's also a platform where you can share your favorites list as
              well as other people's favorites list.
            </p>

            <div className='landing-main__left__content-links'>
              <HashLink
                smooth
                to='/#content-1'
                className='landing-main__left__content-link'
                style={
                  501 <= scrollPos && scrollPos < 1330
                    ? { fontWeight: 600, color: '#fff' }
                    : {}
                }
              >
                <span>01</span>Content 1
              </HashLink>
              <HashLink
                smooth
                to='/#content-2'
                className='landing-main__left__content-link'
                style={
                  1330 <= scrollPos && scrollPos < 2160
                    ? { fontWeight: 600, color: '#fff' }
                    : {}
                }
              >
                <span>01</span>Content 2
              </HashLink>
              <HashLink
                smooth
                to='/#content-3'
                className='landing-main__left__content-link'
                style={
                  2160 <= scrollPos ? { fontWeight: 600, color: '#fff' } : {}
                }
              >
                <span>01</span>Content 3
              </HashLink>
            </div>
            <div>
              <Link to='/signup' className='btn btn--blue u-mt-md'>
                Sign Up
              </Link>
            </div>
          </div>
        </div>
        <div className='landing-main__right'>
          <div className='landing-main__right__content' id='content-1'>
            <div className='landing-main__right__content-image'>Image 1</div>
            <div className='landing-main__right__content-header'>Header 1</div>
            <div className='landing-main__right__content-text'>
              Markery is a web service where you can manage your favorite links.
              It's also a platform where you can share your favorites list as
              well as other people's favorites list.
            </div>
          </div>
          <div className='landing-main__right__content' id='content-2'>
            <div className='landing-main__right__content-image'>Image 2</div>
            <div className='landing-main__right__content-header'>Header 2</div>
            <div className='landing-main__right__content-text'>
              Markery is a web service where you can manage your favorite links.
              It's also a platform where you can share your favorites list as
              well as other people's favorites list.
            </div>
          </div>
          <div className='landing-main__right__content' id='content-3'>
            <div className='landing-main__right__content-image'>Image 3</div>
            <div className='landing-main__right__content-header'>Header 3</div>
            <div className='landing-main__right__content-text'>
              Markery is a web service where you can manage your favorite links.
              It's also a platform where you can share your favorites list as
              well as other people's favorites list.
            </div>
          </div>
        </div>
        <div className='landing-main__bottom'>
          <div className='landing-main__bottom-header'>
            Start Sharing your Favorites
          </div>
          <div className='landing-main__bottom-content'>
            <div className='landing-main__bottom-content__left'>image</div>
            <div className='landing-main__bottom-content__right'>text</div>
          </div>

          <div>
            <Link to='/share' className='btn btn--blue--inverted u-mb-hg'>
              Explore Sharing
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const mapStateToProps = ({
  auth
}: StoreState): { auth: User | boolean | null } => {
  return { auth };
};

export const Landing = connect(mapStateToProps, { fetchUser })(_Landing);
