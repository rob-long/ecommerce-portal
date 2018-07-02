import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth ? <Component {...props} /> : <Redirect to={{ pathname: "/login" }} />
    }
  />
);

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  null,
  null,
  {
    pure: false
  }
)(PrivateRoute);
