import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation
} from 'react-router-dom';
import { useAuth } from './modules/hooks';
import { MainPage } from './pages/MainPage';
import { RegisterPage } from './pages/RegisterPage';
import { ServicePage } from './pages/ServicePage';
import { SharePage } from './pages/SharePage';
import { SettingPage } from './pages/SettingPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

interface AppProps {}

export const App: React.FC<AppProps> = props => {
  const { auth, fetchCurrentUser } = useAuth();

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  if (auth === null) return <div>Fetching user</div>;

  return (
    <Router>
      <ScrollToTop />
      <Switch>
        <Route path='/' component={MainPage} exact />
        <Route path='/register' component={RegisterPage} />
        <Route path='/service' component={ServicePage} />
        <Route path='/share' component={SharePage} />
        <Route path='/setting' component={SettingPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  );
};
