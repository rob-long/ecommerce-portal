import React, { Component } from "react";
import SurveyForm from "./SurveyForm";
import { reduxForm } from "redux-form";
import SurveyFormReview from "./SurveyFormReview";

class SurveyNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewForm: false
    };
    this.onSurveySubmit = this.onSurveySubmit.bind(this);
  }

  onSurveySubmit() {
    this.setState({ reviewForm: !this.state.reviewForm });
  }

  render() {
    if (this.state.reviewForm) {
      return <SurveyFormReview onCancel={this.onSurveySubmit} />;
    }
    return <SurveyForm onSurveySubmit={this.onSurveySubmit} />;
  }
}

// connecting reduxForm without the option of destroyOnUnmount clears the form values whenver we mount SurveyNew
export default reduxForm({
  form: "surveyForm"
})(SurveyNew);
