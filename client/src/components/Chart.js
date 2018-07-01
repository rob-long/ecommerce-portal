import React, { Component } from "react";
import { HorizontalBar, Bar, Line, Pie } from "react-chartjs-2";

class Chart extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  static defaultProps = {
    displayTitle: true,
    legendPosition: "right",
    location: "City"
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
              }
            }}
          />
        </div>
      </div>
    );
  }
}

export default Chart;
