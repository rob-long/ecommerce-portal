import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Heading from "../Heading";
import Chart from "../Chart";
import Upload from "../Upload";
import { fetchScores } from "../../actions";
import $ from "jquery";

const chartConfig = {
  score: {
    title: "Vitamin Score",
    type: "HorizontalBar",
    maintainAspectRatio: true
  },
  history: {
    title: "Score History",
    type: "Line",
    maintainAspectRatio: false
  }
};

class Health extends Component {
  constructor(props) {
    super(props);
    this.renderChart = this.renderChart.bind(this);
    this.state = { chartID: null, tab: "score" };
    this.handleScoreClick = this.handleScoreClick.bind(this);
    this.handleNavClick = this.handleNavClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchScores();
  }

  makeChartData(chartID) {
    if (this.state.tab === "history") {
      return this.makeHistoryData();
    }

    let lastScore;
    if (chartID) {
      lastScore = this.props.health.find(e => e._id === chartID);
    } else {
      lastScore = this.props.health[this.props.health.length - 1];
    }
    if (!lastScore || !lastScore.score) {
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

  makeHistoryData() {
    const scores = this.props.health;
    let historyData = {};
    let labels = {};
    let datasets = [];
    for (let i = 0; i < scores.length; i++) {
      const score = scores[i].score;
      if (!score) {
        continue;
      }
      const entries = Object.entries(score);
      const timeString = new Date(scores[i].dateUploaded).toLocaleString();
      labels[timeString] = 1;
      entries.forEach(pair => {
        if (!historyData[pair[0]]) {
          historyData[pair[0]] = [];
        }
        historyData[pair[0]].push({ x: scores[i].dateUploaded, y: pair[1] });
      });
    }
    var dynamicColors = function() {
      var r = Math.floor(Math.random() * 255);
      var g = Math.floor(Math.random() * 255);
      var b = Math.floor(Math.random() * 255);
      return "rgb(" + r + "," + g + "," + b + ")";
    };
    for (let vitamin in historyData) {
      const color = dynamicColors();
      datasets.push({
        label: vitamin,
        data: historyData[vitamin],
        fill: false,
        lineTension: 0.1,
        backgroundColor: color,
        borderColor: color,
        pointBorderWidth: 2,
        pointRadius: 2,
        pointHitRadius: 10
      });
    }

    return {
      labels: Object.keys(labels),
      datasets
    };
  }

  handleScoreClick(e) {
    this.setState({ chartID: e.target.id });
    $(".list-group > button").removeClass("active");
    $(`#${e.target.id}`).toggleClass("active");
  }

  handleNavClick(e) {
    this.setState({ tab: e.target.id });
    $(".nav-bordered > li > a").removeClass("active");
    $(`#${e.target.id}`).toggleClass("active");
  }

  renderList() {
    if (this.state.tab !== "score") {
      return;
    }
    const scores = this.props.health;
    const reverse = scores.slice().reverse();
    const dates = reverse.map((score, i) => {
      const className =
        i === 0
          ? "list-group-item list-group-item-action active"
          : "list-group-item list-group-item-action";
      return (
        <button
          className={className}
          onClick={this.handleScoreClick}
          id={score._id}
          key={score._id}
          type="button"
        >
          scores uploaded on {new Date(score.dateUploaded).toLocaleString()}
        </button>
      );
    });
    return (
      <Fragment>
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
          <div className="alert alert-dark">
            You must upload your scores before this dashboard will display any
            information. Once you have uploaded multiple scores you will be able
            to view your health history over time. For an example of a vitamin
            score file: <a href="/example.txt">example</a>.
          </div>
        );
      }
      return (
        <div>
          <ul className="nav nav-bordered">
            <li className="nav-item">
              <a
                className="nav-link active"
                href="#score"
                id="score"
                onClick={this.handleNavClick}
              >
                Score
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#history"
                id="history"
                onClick={this.handleNavClick}
              >
                History
              </a>
            </li>
          </ul>
          <div id="chart-pane">
            <Chart
              title="Vitamin Score"
              maintainAspectRatio={
                chartConfig[this.state.tab].maintainAspectRatio
              }
              type={chartConfig[this.state.tab].type}
              chartData={chartData}
            />
          </div>
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
