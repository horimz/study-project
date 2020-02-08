import React from 'react';

const _Footer: React.FC = () => {
  return (
    <footer className='footer'>
      <div>
        <a
          href='https://github.com/horimz/markery'
          rel='noopener noreferrer'
          target='_blank'
          className='footer__project-link'
        >
          Project Github Repository
        </a>
      </div>
    </footer>
  );
};

export const Footer = _Footer;
