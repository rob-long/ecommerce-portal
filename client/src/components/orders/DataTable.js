import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  BootstrapTable,
  TableHeaderColumn,
  ExportCSVButton
} from "react-bootstrap-table";

import { fetchOrders } from "../../actions";
import "../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css";

class DataTable extends Component {
  componentDidMount() {
    this.props.fetchOrders();
  }

  renderOrder(post) {
    const route = `/posts/${post.id}`;
    return (
      <li className="list-group-item" key={post.id}>
        <Link to={route}> {post.title} </Link>
      </li>
    );
  }

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
        <TableHeaderColumn isKey dataField="id">
          Order ID
        </TableHeaderColumn>
        <TableHeaderColumn dataField="created">Order Date</TableHeaderColumn>
        <TableHeaderColumn dataField="amount">Order Amount</TableHeaderColumn>
        <TableHeaderColumn dataField="status">Status</TableHeaderColumn>
      </BootstrapTable>
    );
  }
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
