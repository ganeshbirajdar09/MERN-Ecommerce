import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAutheticated } from "./index";

//i want to mount a Component using the property of component
const AdminRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAutheticated() && isAutheticated().user.role === 1 ? (
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
export default AdminRoute;
