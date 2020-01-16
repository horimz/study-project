import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

interface PrivateRouteProps {
  exact?: boolean;
  isAuthenticated: boolean | null;
  path: string;
  component: React.ComponentType<any>;
}

// : React.FC
const _PrivateRoute = ({
  component: Component,
  isAuthenticated,
  ...rest
}: PrivateRouteProps) => {
  if (isAuthenticated === true) {
    <Redirect to='/login' />;
    alert('You must login before accessing this page.');
  }
  return (
    <Route
      render={rest => (
        <>
          <Component {...rest} />
        </>
      )}
    />
  );
};

export const PrivateRoute = connect(null)(_PrivateRoute);
