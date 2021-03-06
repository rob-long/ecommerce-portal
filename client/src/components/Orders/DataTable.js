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
import { BarLoader } from "react-spinners";

class DataTable extends Component {
  componentDidMount() {
    this.props.fetchOrders();
  }

  handleOnClick = () => {
    // some action...
    // then redirect
    this.setState({ redirect: true });
  };

  createCustomExportCSVButton = onClick => {
    return <ExportCSVButton btnText="Download" onClick={() => onClick()} />;
  };

  render() {
    const options = {
      exportCSVBtn: this.createCustomExportCSVButton
    };
    if (!this.props.orders) {
      return (
        <div className="sweet-loading">
          <BarLoader color={"#123abc"} loading={!this.props.orders} />
        </div>
      );
    }

    return (
      <BootstrapTable
        options={options}
        data={Object.values(this.props.orders)}
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
        <TableHeaderColumn dataField="status" dataFormat={statusFormatter}>
          Status
        </TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

function priceFormatter(cell, row) {
  return `$${cell}`;
}

function statusFormatter(cell, row) {
  const classes = {
    paid: "warning",
    fulfilled: "success"
  };
  const className = classes[cell];
  const route = `/orders/${row.id}`;
  return (
    <Link
      className={"btn btn-xs btn-pill btn-" + className}
      to={{ pathname: `${route}` }}
    >
      {cell}
    </Link>
  );
}

function idFormatter(cell, row) {
  const route = `/orders/${cell}`;
  return <Link to={{ pathname: `${route}` }}>{cell}</Link>;
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
