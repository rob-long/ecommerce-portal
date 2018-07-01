import React, { Component } from "react";
import { connect } from "react-redux";
import NavButton from "./NavButton";

class Header extends Component {
  constructor(props) {
    super(props);
    this.createNavButton = this.createNavButton.bind(this);
  }

  login() {
    const auth = this.props.auth;
    if (auth === null) {
      return;
    } else if (auth) {
      return [
        auth.avatarUrl ? (
          <div key="avatar" className="avatar">
            <img alt="avatar" src={auth.avatarUrl} className="rounded-circle" />
          </div>
        ) : null,
        <a
          key="logout"
          href="/api/logout"
          className="btn btn-outline-secondary btn-block"
        >
          Logout
        </a>
      ];
    }
    return (
      <li className="nav-item">
        <a href="/auth/google" class="btn btn-outline-secondary btn-block">
          <span className="icon icon-google-plus" /> Sign in with Google
        </a>
      </li>
    );
  }

  createNavButton(path, label, icon) {
    const currentpath = this.props.pathname;
    return (
      <NavButton key={path} to={path} active={path === currentpath}>
        <span className={`icon icon-${icon}`} /> {label}
      </NavButton>
    );
  }

  render() {
    return (
      <div className="col-md-3 sidebar">
        <nav className="sidebar-nav">
          <div className="sidebar-header">
            <button
              className="nav-toggler nav-toggler-md sidebar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#nav-toggleable-md"
            >
              <span className="sr-only">Toggle nav</span>
            </button>
            <a className="sidebar-brand img-responsive" href="/">
              <span className="icon icon-leaf sidebar-brand-icon" />
            </a>
          </div>

          <div className="collapse nav-toggleable-md" id="nav-toggleable-md">
            <form className="sidebar-form">
              <input
                className="form-control"
                type="text"
                placeholder="Search..."
              />
              <button type="submit" className="btn-link">
                <span className="icon icon-magnifying-glass" />
              </button>
            </form>
            <ul className="nav nav-pills nav-stacked flex-column">
              <li className="nav-header">Dashboards</li>
              {this.createNavButton("/health", "Your Health", "heart-outlined")}
              {this.createNavButton("/products", "Shop", "lab-flask")}
              {this.createNavButton(
                "/orders",
                "Order History",
                "text-document"
              )}
            </ul>
            <hr className="visible-xs mt-3" />
            <ul className="nav nav-pills nav-stacked flex-column">
              {this.login()}
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

function mapStateToProps({ auth, router }) {
  return {
    auth,
    pathname: router.location.pathname
  };
}

export default connect(
  mapStateToProps,
  null
)(Header);
