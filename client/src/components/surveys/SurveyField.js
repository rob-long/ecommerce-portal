import React from "react";

// es6 multi-level destructuring meta->error, touched
const SurveyField = ({ input, label, type, meta: { error, touched } }) => {
  return (
    <div className="input-field">
      <input {...input} type={type} id={input.name} value={input.value} />
      <label htmlFor={input.name} className="active">
        {label}
      </label>
      <span
        className="helper-text red-text"
        data-error="wrong"
        data-success="right"
      >
        {touched && error}
      </span>
    </div>
  );
};

export default SurveyField;
