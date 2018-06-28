import React, { Component } from "react";
import { connect } from "react-redux";
import formFields from "./fields";
import * as actions from "../../actions";
import { withRouter } from "react-router-dom";

class SurveyFormReview extends Component {
  displayValue({ label, name }) {
    return (
      <div key={name}>
        <label>{label}</label>
        <div>{this.props.formValues[name]}</div>
      </div>
    );
  }

  render() {
    const review = formFields.map(input => this.displayValue(input));

    return (
      <div>
        <h3>Review your Survey</h3>
        <div>{review}</div>
        <button onClick={this.props.onCancel} className="btn">
          Modify my survey
        </button>
        <button
          onClick={() =>
            this.props.submitSurvey(this.props.formValues, this.props.history)
          }
          className="btn right"
        >
          Submit
          <i className="material-icons right">email</i>
        </button>
      </div>
    );
  }
}

function mapStateToProps({ form }) {
  return { formValues: form.surveyForm.values };
}

// withRouter teaches this component about react-router
export default connect(
  mapStateToProps,
  actions
)(withRouter(SurveyFormReview));
