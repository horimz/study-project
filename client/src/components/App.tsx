import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// redux
import { connect } from 'react-redux';
import { StoreState } from '../common/reducers';
import { IUser, fetchUser } from '../common/actions';

// routes
import { Landing } from '../pages/Landing';
import { SignUp } from '../pages/SignUp';
import { Login } from '../pages/Login';
import { Main } from '../pages/Main';
import { Share } from '../pages/Share';
import { PageNotFound } from '../pages/PageNotFound';

// styles
import '../styles/main.scss';

import { Spinner } from '../components/Spinner';

interface AppProps {
  auth: IUser | boolean | null;
  fetchUser: Function;
}

const _App: React.FC<AppProps> = props => {
  const { auth, fetchUser } = props;

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (auth === null)
    return (
      <div className='flex-center' style={{ height: '100vh' }}>
        <Spinner />
      </div>
    );

  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path='/signup' component={SignUp} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/share' component={Share} />
        <Route exact path='/main' component={Main} /> {/* private route */}
        <Route component={PageNotFound} />
      </Switch>
    </Router>
  );
};

const mapStateToProps = ({
  auth
}: StoreState): { auth: IUser | boolean | null } => {
  return { auth };
};

export const App = connect(mapStateToProps, { fetchUser })(_App);
