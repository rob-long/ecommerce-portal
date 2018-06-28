import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import SurveyNew from "./surveys/SurveyNew";
import SurveyFormReview from "./surveys/SurveyFormReview";

class App extends Component {
  componentDidMount() {
    this.props.authenticate();
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Header />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/surveys/new" component={SurveyNew} />
            <Route path="/surveys/review" component={SurveyFormReview} />
            <Route path="/surveys" component={Dashboard} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(
  null,
  actions
)(App);
