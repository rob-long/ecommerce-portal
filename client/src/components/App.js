import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { connect } from "react-redux";
import * as actions from "../actions";
import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import SurveyNew from "./surveys/SurveyNew";
import SurveyFormReview from "./surveys/SurveyFormReview";
import Orders from "./Orders/";
import OrderView from "./Orders/OrderView";
import Profile from "./Profile";
import ProductList from "./ProductList/";

import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faPhone,
  faLaptop,
  faAt
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(fab, faEnvelope, faPhone, faLaptop, faAt);

class App extends Component {
  componentDidMount() {
    this.props.authenticate();
  }

  render() {
    return (
      <ConnectedRouter history={this.props.history}>
        <div className="container">
          <div className="row">
            <Header />
            <div className="col-md-9 content">
              <Switch>
                <Route exact path="/" component={Landing} />
                <Route path="/surveys/new" component={SurveyNew} />
                <Route path="/surveys/review" component={SurveyFormReview} />
                <Route path="/surveys" component={Dashboard} />
                <Route path="/orders/:id" component={OrderView} />
                <Route path="/orders" component={Orders} />
                <Route path="/profile" component={Profile} />
                <Route path="/products" component={ProductList} />
              </Switch>
            </div>
          </div>
        </div>
      </ConnectedRouter>
    );
  }
}

export default connect(
  null,
  actions
)(App);
