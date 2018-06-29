import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { handleToken } from "../actions";
import { connect } from "react-redux";

class Payment extends Component {
  render() {
    return (
      <StripeCheckout
        name="Nutrigene"
        description=""
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
        amount={this.props.amount}
        token={token => {
          this.props.handleToken(token);
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
  { handleToken }
)(Payment);
