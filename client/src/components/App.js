import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import SurveyNew from "./surveys/SurveyNew";
import SurveyFormReview from "./surveys/SurveyFormReview";
import Orders from "./Orders";
import OrderView from "./orders/OrderView";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faCheckSquare, faCoffee } from "@fortawesome/free-solid-svg-icons";

library.add(fab, faCheckSquare, faCoffee);

class App extends Component {
  componentDidMount() {
    this.props.authenticate();
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <div className="row">
            <Header />
            <Switch>
              <div className="col-md-9 content">
                <Route exact path="/" component={Landing} />
                <Route path="/surveys/new" component={SurveyNew} />
                <Route path="/surveys/review" component={SurveyFormReview} />
                <Route path="/surveys" component={Dashboard} />
                <Route path="/orders/:id" component={OrderView} />
                <Route path="/orders" component={Orders} />
              </div>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(
  null,
  actions
)(App);
