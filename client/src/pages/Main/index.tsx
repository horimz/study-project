import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../../common/reducers';
import { IUser, fetchFolders, IFolder } from '../../common/actions';
import { Redirect } from 'react-router-dom';
import { LeftBar } from './LeftBar';
import { Contents } from './Contents';
import { AppProvider } from '../../context';
import { Spinner } from '../../components/Spinner';

interface MainProps {
  auth: IUser | boolean;
  folders: IFolder[] | null;
  fetchFolders: Function;
}

const _Main: React.FC<MainProps> = props => {
  const { auth, fetchFolders, folders } = props;

  useEffect(() => {
    fetchFolders();
  }, [fetchFolders]);

  if (auth === false) return <Redirect to='/' />;
  if (folders === null)
    return (
      <div className='flex-center' style={{ height: '100vh' }}>
        <Spinner />
      </div>
    );

  return (
    <AppProvider>
      <div className='main-content'>
        <LeftBar />
        <div className='main-content__pusher'></div>
        <Contents />
      </div>
    </AppProvider>
  );
};

const mapStateToProps = ({
  auth,
  folders
}: StoreState): { auth: IUser | boolean; folders: IFolder[] | null } => {
  return { auth, folders };
};

export const Main = connect(mapStateToProps, { fetchFolders })(_Main);
