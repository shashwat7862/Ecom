import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ authed, component: Component, logout, ...rest }) => {
  return(
    <Route
      {...rest}
      render={props =>
        authed() ? (
          <Component {...props}  />
        ) : (
          <Redirect to="/Admin/auth/login" />
        )
      }
    />
  );
}

export default PrivateRoute;