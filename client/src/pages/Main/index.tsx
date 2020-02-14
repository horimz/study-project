import React from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../../common/reducers';
import { IUser, logout } from '../../common/actions';
import { Redirect } from 'react-router-dom';
import { LeftBar } from './LeftBar';
import { Contents } from './Contents';

interface MainProps {
  auth: IUser | boolean;
  logout: Function;
}

const _Main: React.FC<MainProps> = props => {
  if (props.auth === false) return <Redirect to='/' />;

  return (
    <div className='main-content'>
      <LeftBar />
      <Contents />
    </div>
  );
};

const mapStateToProps = ({ auth }: StoreState): { auth: any } => {
  return { auth };
};

export const Main = connect(mapStateToProps, { logout })(_Main);
