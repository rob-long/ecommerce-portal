import React, { Fragment } from "react";

const heading = props => {
  return (
    <Fragment>
      <div className="dashhead">
        <div className="dashhead-titles">
          <h6 className="dashhead-subtitle">{props.subtitle}</h6>
          <h2 className="dashhead-title">{props.title}</h2>
        </div>
      </div>
      <hr className="visible-xs mt-3" />
    </Fragment>
  );
};

export default heading;
