import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const LoginRequiredRoute = ({ component: Component, ...rest }) => {
  const { authentication } = rest;
  return (
    <Route
      {...rest}
      render={props =>
        authentication.loggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

const mapStateToProps = state => ({
  authentication: state.authentication
});

export default connect(mapStateToProps)(LoginRequiredRoute);
