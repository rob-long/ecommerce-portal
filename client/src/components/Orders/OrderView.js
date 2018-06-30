import React, { Component, Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ItemRow = ({ item }) => {
  const amount = item.amount / 100;
  return (
    <tr>
      <td className="center">{item.parent}</td>
      <td className="left">{item.description}</td>
      <td className="right">{item.amount}</td>
      <td className="center">{item.quantity}</td>
      <td className="right">${amount}</td>
    </tr>
  );
};

/*
const Contact = ({ shipping }) => {
  return (
    <tr>
      <td className="center">{item.sku}</td>
      <td className="left">{item.description}</td>
      <td className="right">{item.amount}</td>
      <td className="center">1</td>
      <td className="right">{item.amount}</td>
    </tr>
  );
};

*/
class OrderView extends Component {
  constructor(props) {
    super(props);
    this.state = { order: null };
  }

  componentDidMount() {
    console.log(this.props.state);
    if (this.props.location.state) {
      this.setState({ order: this.props.location.state.order });
    }
  }

  renderShipping(order) {
    //const shipping = order.shipping;
  }

  renderItem(item) {
    return <ItemRow item={item} />;
  }

  render() {
    if (!this.state.order) {
      return "Loading...";
    }
    const items = this.state.order.items.map(item => this.renderItem(item));

    return (
      <Fragment>
        <div className="card">
          <div className="card-header">
            Invoice
            <strong> {this.state.order.id}</strong>
            <span className="float-right">
              {" "}
              <strong>Status:</strong> {this.state.order.status}
            </span>
          </div>
          <div className="card-body">
            <div className="row mb-4">
              <div class="col-sm-6">
                <h6 class="mb-3">From:</h6>
                <div>
                  <strong>Nutrigene Inc.</strong>
                </div>
                <div>
                  <FontAwesomeIcon icon="laptop" /> mynutrigene.com
                </div>
              </div>

              <div className="col-sm-6">
                <h6 className="mb-3">To:</h6>
                <div>
                  <strong>Bob Mart</strong>
                </div>
                <div>Attn: Daniel Marek</div>
                <div>43-190 Mikolow, Poland</div>
                <div>Email: marek@daniel.com</div>
                <div>Phone: +48 123 456 789</div>
              </div>
            </div>

            <div className="table-responsive-sm">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th className="center">#</th>
                    <th>Item</th>
                    <th className="right">Unit Cost</th>
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
                        <strong>Subtotal</strong>
                      </td>
                      <td className="right">$8.497,00</td>
                    </tr>
                    <tr>
                      <td className="left">
                        <strong>Discount (20%)</strong>
                      </td>
                      <td className="right">$1,699,40</td>
                    </tr>
                    <tr>
                      <td className="left">
                        <strong>VAT (10%)</strong>
                      </td>
                      <td className="right">$679,76</td>
                    </tr>
                    <tr>
                      <td className="left">
                        <strong>Total</strong>
                      </td>
                      <td className="right">
                        <strong>$7.477,36</strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default OrderView;
