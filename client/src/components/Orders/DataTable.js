import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchOrders } from "../../actions";
import { Link } from "react-router-dom";
import {
  BootstrapTable,
  TableHeaderColumn,
  ExportCSVButton
} from "react-bootstrap-table";
import "../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css";

class DataTable extends Component {
  componentDidMount() {
    this.props.fetchOrders();
  }

  handleOnClick = () => {
    // some action...
    // then redirect
    this.setState({ redirect: true });
  };

  handleExportCSVButtonClick = onClick => {
    // Custom your onClick event here,
    // it's not necessary to implement this function if you have no any process before onClick
    console.log("This is my custom function for ExportCSVButton click event");
    onClick();
  };
  createCustomExportCSVButton = onClick => {
    return (
      <ExportCSVButton
        btnText="Download"
        onClick={() => this.handleExportCSVButtonClick(onClick)}
      />
    );
  };

  render() {
    const options = {
      exportCSVBtn: this.createCustomExportCSVButton
    };

    return (
      <BootstrapTable
        options={options}
        data={this.props.orders}
        version="4"
        exportCSV
      >
        <TableHeaderColumn
          isKey
          dataField="id"
          dataFormat={idFormatter.bind(this)}
        >
          Order ID
        </TableHeaderColumn>
        <TableHeaderColumn dataField="created">Order Date</TableHeaderColumn>
        <TableHeaderColumn dataField="amount" dataFormat={priceFormatter}>
          Order Amount
        </TableHeaderColumn>
        <TableHeaderColumn dataField="status">Status</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

function priceFormatter(cell, row) {
  return `$${cell}`;
}

function idFormatter(cell, row) {
  const route = `/orders/${cell}`;
  const order = this.props.orders.filter(order => {
    return order.id === cell;
  });
  return (
    <Link to={{ pathname: `${route}`, state: { order: order[0] } }}>
      {cell}
    </Link>
  );
}

function mapStateToProps({ orders, authenticate }) {
  return {
    orders,
    authenticate
  };
}

export default connect(
  mapStateToProps,
  { fetchOrders }
)(DataTable);
