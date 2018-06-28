import React from "react";

const NavButton = props => {
  return (
    <li className="nav-item">
      <a className="nav-link" href={props.to}>
        {props.children}
      </a>
    </li>
  );
};

export default NavButton;
