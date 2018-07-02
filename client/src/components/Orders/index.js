import React, { Component, Fragment } from "react";
import DataTable from "./DataTable";
import Heading from "../Heading";
import { connect } from "react-redux";

class Orders extends Component {
  render() {
    const alert = this.props.cart ? (
      <div class="alert alert-info">{this.props.cart.message}</div>
    ) : (
      ""
    );

    return (
      <Fragment>
        <Heading subtitle="Nutrigene" title="Orders" />
        {alert}
        <DataTable />
      </Fragment>
    );
  }
}

function mapStateToProps({ cart }) {
  return { cart };
}

export default connect(
  mapStateToProps,
  null
)(Orders);
