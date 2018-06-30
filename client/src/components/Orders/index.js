import React, { Component, Fragment } from "react";
import DataTable from "./DataTable";

class Orders extends Component {
  render() {
    return (
      <Fragment>
        <div className="dashhead">
          <div className="dashhead-titles">
            <h6 className="dashhead-subtitle">Nutrigene</h6>
            <h2 className="dashhead-title">Orders</h2>
          </div>
        </div>
        <DataTable />
      </Fragment>
    );
  }
}
export default Orders;
