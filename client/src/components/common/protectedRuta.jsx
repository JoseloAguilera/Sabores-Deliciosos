/* import React, { useContext} from 'react';
import { Navigate, Route, useParams } from 'react-router-dom';
import { UserContext } from '../../App';

//make a protected router just the user can pass to edd and delete his recipe
const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
  const params = useParams()
  const currentUser = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!currentUser) {
          return (
            <Navigate
              to={{ pathname: "/signin", state: { from: params.location } }}
            />
          );
        }
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
 */

/* import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { UserContext } from '../../App';

const ProtectedRoute = ({ component: Component, ...props }) => {
  const user = useContext(UserContext);

  return (
    <Route
      {...props}
      element={
        user ? (
          <Component />
        ) : (
          <Navigate to="/signin" replace />
        )
      }
    />
  );
};

export default ProtectedRoute;
 */

import React, { useContext } from "react";
import { UserContext } from "../../App";
import { Routes, Route, Navigate } from "react-router-dom";

const ProtectedRuta = ({ path, element }) => {
  const user = useContext(UserContext);

  return user ? (
    <Routes>
      <Route path={path} element={element}  />
    </Routes>
    
  ) : (
    <Navigate to="/signin" />
  );
};

export default ProtectedRuta;
