import React from 'react';
import { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import { auth } from './firebase';
import Denied from './Denied';

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const [{ user }, dispatch] = useStateValue();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (user && user.email === 'admin@admin.admin') {
          return <Component />;
        } else {
          return <Denied />;
        }
      }}
    />
  );
};

export default ProtectedRoute;
