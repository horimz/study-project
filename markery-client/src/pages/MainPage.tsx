import React from 'react';
import { useAuth } from '../modules/hooks';
import { Redirect } from 'react-router-dom';
import { Navigation } from '../components/main/Navigation';
import { Hero } from '../components/main/Hero';
import { Main } from '../components/main/Main';
import { Footer } from '../components/main/Footer';
import './MainPage.scss';

interface MainPageProps {}

export const MainPage: React.FC<MainPageProps> = props => {
  const { auth } = useAuth();

  if (auth) return <Redirect to='/service' />;

  return (
    <div>
      <div className='landing'>
        <Navigation />
        <div className='landing__hero'>
          <Hero />
        </div>
        <main className='landing__main'>
          <Main />
        </main>
      </div>
      <Footer />
    </div>
  );
};
