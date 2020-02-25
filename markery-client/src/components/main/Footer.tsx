import React from 'react';
import './Footer.scss';

interface FooterProps {}

export const Footer: React.FC<FooterProps> = props => {
  return (
    <footer className='footer'>
      <div>
        <a
          href='https://github.com/horimz/markery'
          rel='noopener noreferrer'
          target='_blank'
          className='footer__link'
        >
          Markery
        </a>
      </div>
    </footer>
  );
};
