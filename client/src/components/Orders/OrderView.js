import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { fetchOrder } from "../../actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Heading from "../Heading";
import axios from "axios";

const ItemRow = ({ item }) => {
  const amount = item.amount / 100;
  return (
    <tr>
      <td className="center">{item.parent}</td>
      <td className="left">{item.description}</td>
      <td className="center">{item.quantity}</td>
      <td className="right">${amount}</td>
    </tr>
  );
};

const ToAddress = ({ order }) => {
  return (
    <div className="col-sm-6">
      <h6 className="mb-3">To:</h6>
      <div>
        <strong>{order.shipping.name}</strong>
      </div>
      <div>{order.shipping.address.line1}</div>
      <div>{order.shipping.address.city}</div>
      <div>
        {order.shipping.address.state}, {order.shipping.address.postal_code}
      </div>
      <div>
        <FontAwesomeIcon icon="envelope" /> {order.email}
      </div>
    </div>
  );
};

class OrderView extends Component {
  constructor(props) {
    super(props);
    this.makeShippingLabel = this.makeShippingLabel.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchOrder(id);
  }

  renderShipping(order) {
    //const shipping = order.shipping;
  }

  renderItem(item) {
    return <ItemRow key={item.parent} item={item} />;
  }

  async makeShippingLabel(order) {
    await axios.post("/api/shippo/", {
      order_id: this.props.order.id
    });
    this.props.fetchOrder(this.props.order.id);
  }

  renderStatus(order) {
    const status = order.status;
    if (status === "paid") {
      return (
        <Fragment>
          <button
            type="button"
            className="btn btn-xs btn-pill dropdown-toggle"
            data-toggle="dropdown"
          >
            {status}
          </button>
          <div className="dropdown-menu">
            <a
              onClick={this.makeShippingLabel}
              className="dropdown-item"
              href="#"
            >
              Fulfill this order
            </a>
          </div>
        </Fragment>
      );
    }
    return (
      <button type="button" className="btn btn-xs btn-pill btn-{className}">
        {status}
      </button>
    );
  }

  shipping_info(order) {
    const tracking_number = order.shipping
      ? order.shipping.tracking_number
      : null;
    if (tracking_number) {
      const tracking_url_provider = `https://tools.usps.com/go/TrackConfirmAction_input?origTrackNum=${tracking_number}`;
      return (
        <a
          href={tracking_url_provider}
          target="_blank"
          className="btn btn-outline-secondary btn-block"
        >
          Track your shipment
        </a>
      );
    }
  }

  render() {
    if (!this.props.order) {
      return "Loading...";
    }

    if (this.props.order.status === "paid") {
      //this.makeShippingLabel();
    }
    console.log(this.props.order);
    const items = this.props.order.items.map(item => this.renderItem(item));
    return (
      <Fragment>
        <Heading subtitle="Nutrigene" title="Your Order" />
        <div className="card">
          <div className="card-header">
            Invoice
            <strong> {this.props.order.id}</strong>
            <span className="float-right">
              {" "}
              <strong>Status:</strong> {this.renderStatus(this.props.order)}
            </span>
          </div>
          <div className="card-body">
            <div className="row mb-4">
              <div className="col-sm-6">
                <h6 className="mb-3">From:</h6>
                <div>
                  <strong>Nutrigene Inc.</strong>
                </div>
                <div>
                  <FontAwesomeIcon icon="laptop" /> mynutrigene.com
                </div>
              </div>

              <ToAddress order={this.props.order} />
            </div>

            <div className="table-responsive-sm">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th className="center">#</th>
                    <th>Item</th>
                    <th className="center">Qty</th>
                    <th className="right">Total</th>
                  </tr>
                </thead>
                <tbody>{items}</tbody>
              </table>
            </div>
            <div className="row">
              <div className="col-lg-4 col-sm-5" />

              <div className="col-lg-4 col-sm-5 ml-auto">
                <table className="table table-clear">
                  <tbody>
                    <tr>
                      <td className="left">
                        <strong>Total</strong>
                      </td>
                      <td className="right">
                        <strong>${this.props.order.amount / 100}</strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {this.shipping_info(this.props.order)}
      </Fragment>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return { order: state.orders[ownProps.match.params.id] };
}

export default connect(
  mapStateToProps,
  { fetchOrder }
)(OrderView);
