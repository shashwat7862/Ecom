import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ authed, component: Component, logout, ...rest }) => {
  console.log('PrivateRoute ****', authed, 'Component', Component)
  return(
  <Route
    {...rest}
    render={props =>
      authed ? (
        <Component {...props}  />
      ) : (
        <Redirect to="/auth/login" />
      )
    }
  />
);}

export default PrivateRoute;