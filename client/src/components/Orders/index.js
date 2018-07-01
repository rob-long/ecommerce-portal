import React, { Component, Fragment } from "react";
import DataTable from "./DataTable";
import Heading from "../Heading";

class Orders extends Component {
  render() {
    return (
      <Fragment>
        <Heading subtitle="Nutrigene" title="Orders" />
        <DataTable />
      </Fragment>
    );
  }
}
export default Orders;
