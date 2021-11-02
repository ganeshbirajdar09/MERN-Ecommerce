import React from "react";
import { Route, Redirect } from "react-router-dom";

import { isAutheticated } from "./index";

//i want to mount a COmponent using the property of component
const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAutheticated() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

//check the docs important
export default PrivateRoute;
