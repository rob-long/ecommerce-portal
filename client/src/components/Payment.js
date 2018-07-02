import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { handleToken, handleOrder } from "../actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class Payment extends Component {
  render() {
    return (
      <StripeCheckout
        name="Nutrigene"
        description=""
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
        shippingAddress={true}
        billingAddress={true}
        amount={Number(this.props.amount)}
        token={token => {
          this.props.handleOrder(token, this.props.sku, this.props.history);
        }}
      >
        <a className="btn btn-primary btn-block paybutton">Pay</a>
      </StripeCheckout>
    );
  }
}

//export default Payment;
export default connect(
  null,
  { handleToken, handleOrder }
)(withRouter(Payment));
