import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { handleToken, handleOrder } from "../actions";
import { connect } from "react-redux";

class Payment extends Component {
  render() {
    return (
      <StripeCheckout
        name="Nutrigene"
        description=""
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
        amount={Number(this.props.amount)}
        token={token => {
          this.props.handleOrder(token, this.props.sku);
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
)(Payment);
