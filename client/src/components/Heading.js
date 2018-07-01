import React from "react";

const heading = props => {
  return (
    <div className="dashhead">
      <div className="dashhead-titles">
        <h6 className="dashhead-subtitle">{props.subtitle}</h6>
        <h2 className="dashhead-title">{props.title}</h2>
      </div>
    </div>
  );
};

export default heading;
