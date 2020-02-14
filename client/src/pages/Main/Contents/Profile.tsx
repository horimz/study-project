import React from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../../../common/reducers';
import { IUser, logout } from '../../../common/actions';
import { Dropdown } from '../../../components/Dropdown';

interface ProfileProps {
  auth: IUser;
  logout: Function;
}

const _Profile: React.FC<ProfileProps> = props => {
  const toggler = (
    <div className='main-content__content-top__right-image'></div>
  );

  const profileContent = (
    <div>
      <div className='dropdown__item'>{props.auth.username}</div>
      <div className='dropdown__item'>Settings</div>
      <div className='dropdown__item'>Share</div>
      <div className='dropdown__item' onClick={() => props.logout()}>
        Log out
      </div>
    </div>
  );

  return (
    <React.Fragment>
      <Dropdown toggler={toggler} content={profileContent} />
    </React.Fragment>
  );
};

const mapStateToProps = ({ auth }: StoreState): { auth: any } => {
  return { auth };
};

export const Profile = connect(mapStateToProps, { logout })(_Profile);
