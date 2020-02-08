import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { StoreState } from '../../common/reducers';
import { User, fetchUser } from '../../common/actions';

import { Nav } from '../../components/Nav';
import { Main } from './Main';
import { Footer } from '../../components/Footer';

interface LandingProps {
  auth: User | boolean | null;
  fetchUser: Function; // async function (thunk)
}

const _Landing: React.FC<LandingProps> = props => {
  return (
    <div className='landing'>
      <Nav />
      <header className='hero'>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Link to='/signup'>Sign Up</Link>
          <Link to='/login'>Login</Link>
          <Link to='/main'>Main</Link>
          <Link to='/share'>Share</Link>
        </div>
      </header>
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
