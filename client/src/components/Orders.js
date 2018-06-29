import React, { Component } from "react";
import { Link } from "react-router-dom";
import DataTable from "./orders/DataTable";
import Chart from "./Chart";

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
