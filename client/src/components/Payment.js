import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { handleToken } from "../actions";
import { connect } from "react-redux";

class Payment extends Component {
  render() {
    return (
      <StripeCheckout
        name="Sendy"
        description="5 credits"
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
        amount={500}
        token={token => {
          console.log(token);
          this.props.handleToken(token);
        }}
      >
        <a className="nav-link btn">Add Credits</a>
      </StripeCheckout>
    );
  }
}

//export default Payment;
export default connect(
  null,
  { handleToken }
)(Payment);
