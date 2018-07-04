import React, { Component } from "react";
import { HorizontalBar, Line } from "react-chartjs-2";

class Chart extends Component {
  static defaultProps = {
    displayTitle: true,
    legendPosition: "right"
  };

  render() {
    const options = {
      title: {
        display: this.props.displayTitle,
        text: this.props.title,
        fontSize: 25
      },
      responsive: true,
      maintainAspectRatio: this.props.maintainAspectRatio
    };
    let chart;
    if (this.props.type === "HorizontalBar") {
      chart = <HorizontalBar data={this.props.chartData} options={options} />;
    } else {
      chart = (
        <Line data={this.props.chartData} options={options} height={500} />
      );
    }

    return (
      <div className="chart row">
        <div className="col s12">{chart}</div>
      </div>
    );
  }
}

export default Chart;
