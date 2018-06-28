import React, { Component } from "react";
// redux-form automatically maps our form values to the redux store
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import SurveyField from "./SurveyField";
import validateEmails from "../../utils/validateEmails";
import formFields from "./fields";

class SurveyForm extends Component {
  renderField({ label, type, name }) {
    return (
      <Field
        key={name}
        label={label}
        type={type}
        name={name}
        component={SurveyField}
      />
    );
  }

  onSubmit(values) {
    this.props.onSurveySubmit();
    return null;
  }

  // handleSubmit comes for free from redux-form!
  // https://redux-form.com/6.0.0-alpha.4/docs/api/props.md/
  render() {
    const inputs = formFields.map(input => this.renderField(input));

    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}>
        {inputs}
        <button type="submit" className="btn right">
          Submit
          <i className="material-icons right">done</i>
        </button>&nbsp;
        <Link className="btn red" to="/surveys">
          Cancel
        </Link>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};
  formFields.forEach(({ name, label }) => {
    if (!values[name]) {
      errors[name] = `Enter a ${label}`;
    }
  });

  const badEmails = validateEmails(values["recipients"]);
  if (badEmails.length > 0) {
    errors["recipients"] = `The following emails are not valid: ${badEmails}`;
  }

  // if errors is empty, the form is fine to submit
  return errors;
}

// validate function runs everytime we submit the form
export default reduxForm({
  validate,
  form: "surveyForm", // a unique identifier for this form,
  destroyOnUnmount: false
})(SurveyForm);
