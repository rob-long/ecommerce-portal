import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick() {
    this.setState(this.setState({ active: true }));
  }

  render() {
    return (
      <li className="nav-item">
        <Link
          className="nav-link"
          to={this.props.to}
          onClick={this.handleOnClick}
        >
          {this.props.children}
        </Link>
      </li>
    );
  }
}

export default NavButton;
