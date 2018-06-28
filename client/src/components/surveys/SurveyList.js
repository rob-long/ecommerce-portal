import React, { Component } from "react";
import { fetchSurveys } from "../../actions";
import { connect } from "react-redux";

class SurveyList extends Component {
  componentWillMount() {
    this.props.fetchSurveys();
  }

  render() {
    const surveys = this.props.surveys.reverse();
    if (!surveys) {
      return;
    }
    const surveyOutput = surveys.map(s => {
      return (
        <div className="card darken-1" key={s._id}>
          <div className="card-content text-white">
            <span className="card-title">{s.title}</span>
            <p>{s.body}</p>
            <p className="right">
              Sent On: {new Date(s.dateSent).toLocaleDateString()}
            </p>
          </div>
          <div class="card-action">
            <a>Yes: {s.yes}</a>
            <a>No: {s.no}</a>
          </div>
        </div>
      );
    });
    return <div>{surveyOutput}</div>;
  }
}

function mapStateToProps({ surveys }) {
  return { surveys };
}

export default connect(
  mapStateToProps,
  { fetchSurveys }
)(SurveyList);
