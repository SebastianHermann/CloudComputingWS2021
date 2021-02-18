import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function ProtectedRoute({
  isAuth: isAuth,
  component: Component,
  handleLogin: handleLogin,
  handleLogout: handleLogout,
  user: user,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuth) {
          return (
            <Component
              //   handleLogin={props.handleLogin}
              handleLogout={handleLogout}
              user={user}
            />
          );
        } else {
          return (
            <Redirect
              to={{ pathname: '/login', state: { from: props.location } }}
            />
          );
        }
      }}
    />
  );
}
