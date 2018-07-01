import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Heading from "../Heading";
import Chart from "../Chart";
import Upload from "../Upload";

class Health extends Component {
  constructor(props) {
    super(props);
    this.renderChart = this.renderChart.bind(this);
  }

  renderChart() {
    if (this.props.health) {
      return (
        <div>
          <Chart
            title="Vitamin Score"
            legendPosition="right"
            chartData={this.props.health}
          />
        </div>
      );
    }
    if (this.props.auth && this.props.auth.vitaminScore) {
      return (
        <div>
          <Chart
            title="Vitamin Score"
            legendPosition="right"
            chartData={this.props.auth.vitaminScore}
          />
        </div>
      );
    }
  }

  render() {
    return (
      <Fragment>
        <Heading subtitle="Nutrigene" title="Your Health" />

        <Upload />
        {this.renderChart()}
      </Fragment>
    );
  }
}

function mapStateToProps({ health, auth }) {
  return { health, auth };
}

export default connect(
  mapStateToProps,
  null
)(Health);
