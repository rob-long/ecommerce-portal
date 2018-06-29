import React, { Component } from "react";
import { connect } from "react-redux";
import NavButton from "./NavButton";
import Payment from "./Payment";

class Header extends Component {
  login() {
    const auth = this.props.auth;
    if (auth === null) {
      return;
    } else if (auth) {
      return [
        <li className="nav-item" key="payment">
          <Payment />
        </li>,
        <NavButton key="credits" to="/surveys">
          Credits: {auth.credits}
        </NavButton>,
        <NavButton key="logout" to="/api/logout">
          Logout
        </NavButton>
      ];
    }
    return <NavButton to="/auth/google">Sign in with Google</NavButton>;
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
            <a className="sidebar-brand img-responsive" href="../index.html">
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
              <li className="nav-item">
                <a className="nav-link " href="../index-light/index.html">
                  Overview
                </a>
              </li>
              <NavButton key="order-history" to="/orders">
                Order History
              </NavButton>
            </ul>
            <hr className="visible-xs mt-3" />
            <ul className="nav nav-pills nav-stacked flex-column">
              {this.login()}
            </ul>
          </div>
        </nav>
      </div>
    );
    /*
    return (
      <nav>
        <div classNameName="nav-wrapper">
          <Link
            to={this.props.auth ? "/surveys" : "/"}
            classNameName="left brand-logo"
          >
            Sendy
          </Link>
          <ul classNameName="right">{this.login()}</ul>
        </div>
      </nav>
    );
    */
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(
  mapStateToProps,
  null
)(Header);
