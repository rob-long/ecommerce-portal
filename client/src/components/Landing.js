import React, { Fragment } from "react";

const Landing = props => {
  const loginMessage = props.loginMessage ? (
    <div className="alert alert-danger">
      Please sign in to access this function.
    </div>
  ) : null;
  return (
    <Fragment>
      <div className="row align-items-center">
        <div className="col-6 mx-auto col-md-6 order-md-2">
          <img
            className="img-fluid mb-3 mb-md-0"
            src="https://instagram.fcxh3-1.fna.fbcdn.net/vp/4b780275833dd0800108b35a4def88d1/5BD35739/t51.2885-15/s640x640/e15/29088733_858094154362160_8030385410863529984_n.jpg"
            alt=""
            width="1024"
            height="860"
          />
        </div>
        <div className="col-md-6 order-md-1 text-center text-md-left pr-md-5">
          <h1 className="mb-3 bd-text-purple-bright">Nutrigene</h1>
          <p className="lead text-muted">
            Personalized liquid supplements based on your metabolic data
            delivered to you.
          </p>
          <p className="lead mb-4">
            This customer portal will allow you to make purchases, view your
            orders and track your shipments. Please login on the left to access
            the functions.
          </p>
          {loginMessage}
        </div>
      </div>
      <div className="row align-items-left">
        <div className="col-12 col-md-12">
          <hr />
          <h3>Technology Stack</h3>
          <p>
            The app runs primarily on front-end ReactJS and back-end ExpressJS
            connected to MongoDB. The database is primarily used for storing
            persistent user information such as uploaded vitamin scores.
          </p>
          <h3>Login via Google</h3>
          <p>
            Before gaining access to the system users must sign-in via Google.
            Once signed-in the "Your Health", "Shop" and "Order History" links
            are activated.
          </p>
          <h3>Your Health</h3>
          <p>
            Vitamin scores can be directly uploaded via the app. The app expects
            the same format as given in the case study files. Once uploaded, the
            scores are stored in the database. A "history" chart allows users to
            view their scores over time once more than 1 score file has been
            uploaded.
          </p>
          <h3>Shop</h3>
          <p>
            This was mainly implemented so that we can easily create Stripe
            orders. All data is pulled from the Orders API. Products and skus
            are created directly in Stripe. As an example of SKUs, female and
            male versions of the products were created.
          </p>
          <p>
            Users can create and pay for orders by clicking on any Pay button.
            Because we are integrating with Shippos test account, please use a
            United States address for shipping if you would like to create a
            successful order. The cost of shipping is calculated directly by
            shippo based on the product dimensions and the shipping address
            entered by the user and added as a line item to the order.
          </p>
          <h3>Orders</h3>
          <p>
            Once an order is paid for, the user is directed to the orders view.
            The orders view displays the status of the order (paid or
            fulfilled). In order to demonstrate the ability to fulfill orders
            using the Shippo API, the app allows you to view an order and click
            on the paid status in the top right to toggle it to fulfilled. Once
            fulfilled, a button is added to the Order view which links to
            tracking information.
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default Landing;
