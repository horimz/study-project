import React from 'react';
// import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { StoreState } from '../../common/reducers';
import { User, fetchUser } from '../../common/actions';

import { Nav } from '../../components/Nav';
import { Hero } from './Hero';
import { Main } from './Main';
import { Footer } from '../../components/Footer';

interface LandingProps {
  auth: User | boolean | null;
  fetchUser: Function; // async function (thunk)
}

const _Landing: React.FC<LandingProps> = props => {
  // if (props.auth === null) return <div>Loading...</div>;
  // if (props.auth !== false) return <Redirect to='/main' />;

  return (
    <div className='landing'>
      <Nav />
      <Hero />
      <Main />
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
