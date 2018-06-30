import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavButton extends Component {
  render() {
    const className = this.props.className || "nav-link";
    return (
      <li className="nav-item">
        <Link
          className={this.props.active ? `active ${className}` : className}
          to={this.props.to}
        >
          {this.props.children}
        </Link>
      </li>
    );
  }
}

export default NavButton;
