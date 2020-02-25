import React from 'react';
import './Hero.scss';

interface HeroProps {}

export const Hero: React.FC<HeroProps> = props => {
  return <div className='hero'>Markery</div>;
};
