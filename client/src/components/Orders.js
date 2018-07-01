import React, { Component } from "react";
import DataTable from "./Orders/DataTable";

class Orders extends Component {
  render() {
    return (
      <div>
        <h1>Orders</h1>
        <DataTable />
      </div>
    );
  }
}
export default Orders;
