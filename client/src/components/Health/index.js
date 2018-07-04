import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Heading from "../Heading";
import Chart from "../Chart";
import Upload from "../Upload";
import { fetchScores } from "../../actions";
import $ from "jquery";

class Health extends Component {
  constructor(props) {
    super(props);
    this.renderChart = this.renderChart.bind(this);
    this.state = { chartID: null };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchScores();
  }

  makeChartData(chartID) {
    let lastScore;
    if (chartID) {
      lastScore = this.props.health.find(e => e._id === chartID);
    } else {
      lastScore = this.props.health[this.props.health.length - 1];
    }
    if (!lastScore) {
      return null;
    }
    const entries = Object.entries(lastScore.score);
    const labels = entries.map(pair => pair[0]);
    const data = entries.map(pair => pair[1]);
    const backgroundColor = data.map(p => {
      if (p > 85) {
        return "#4fc3f7";
      } else if (p > 70) {
        return "#29b5f6";
      } else if (p > 55) {
        return "#03a9f4";
      } else if (p > 40) {
        return "#039be5";
      } else if (p > 25) {
        return "#0288d1";
      } else if (p > 10) {
        return "#0277bd";
      } else {
        return "#01579b";
      }
    });

    return {
      labels,
      datasets: [
        {
          label: "Efficiency",
          data,
          backgroundColor
        }
      ]
    };
  }

  handleClick(e) {
    this.setState({ chartID: e.target.id });
    $(".list-group > button").removeClass("active");
    $(`#${e.target.id}`).toggleClass("active");
  }

  renderList() {
    const scores = this.props.health;
    const reverse = scores.slice().reverse();
    const dates = reverse.map(score => {
      return (
        <button
          onClick={this.handleClick}
          id={score._id}
          key={score._id}
          type="button"
          className="list-group-item list-group-item-action"
        >
          scores uploaded on {new Date(score.dateUploaded).toLocaleDateString()}
        </button>
      );
    });
    return (
      <Fragment>
        <hr />
        <div className="list-group">
          <li className="list-group-header">Past Scores</li>
          {dates}
        </div>
      </Fragment>
    );
  }

  renderChart(chartID) {
    if (this.props.health) {
      const chartData = this.makeChartData(chartID);
      if (!chartData) {
        return (
          <div className="alert alert-light">
            Please upload your vitamin score
          </div>
        );
      }
      return (
        <div>
          <Chart
            title="Vitamin Score"
            legendPosition="right"
            chartData={chartData}
          />
          {this.renderList()}
        </div>
      );
    }
  }

  render() {
    return (
      <Fragment>
        <Heading subtitle="Nutrigene" title="Your Health" />

        <Upload />
        {this.renderChart(this.state.chartID)}
      </Fragment>
    );
  }
}

function mapStateToProps({ health, auth }) {
  return { health, auth };
}

export default connect(
  mapStateToProps,
  { fetchScores }
)(Health);
