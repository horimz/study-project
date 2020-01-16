import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// routes
import { Landing } from '../pages/Landing';
import { Login } from '../pages/Login';
import { Main } from '../pages/Main';
import { Share } from '../pages/Share';
import { PageNotFound } from '../pages/PageNotFound';

// styles
import '../styles/main.scss';

const _App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path='/share' component={Share} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/main' component={Main} /> {/* private route */}
        <Route component={PageNotFound} />
      </Switch>
    </Router>
  );
};

export const App = _App;
