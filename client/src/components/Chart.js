import React, { Component } from "react";
import { HorizontalBar } from "react-chartjs-2";

class Chart extends Component {
  static defaultProps = {
    displayTitle: true,
    legendPosition: "right"
  };

  render() {
    return (
      <div className="chart row">
        <div className="col s12">
          <HorizontalBar
            data={this.props.chartData}
            options={{
              title: {
                display: this.props.displayTitle,
                text: this.props.title,
                fontSize: 25
              },
              legend: {
                display: this.props.displayLegend,
                position: this.props.legendPosition
              },
              responsive: true
            }}
          />
        </div>
      </div>
    );
  }
}

export default Chart;
