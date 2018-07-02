import { ACTIONS } from "../actions";
import axios from "axios";

export default function(state = null, action) {
  switch (action.type) {
    case ACTIONS.SAVE_FILE:
      const filtered = action.payload.filter(row => row[3] > 0);
      const backgroundColors = filtered.map(row => {
        if (row[3] > 85) {
          return "#4fc3f7";
        } else if (row[3] > 70) {
          return "#29b5f6";
        } else if (row[3] > 55) {
          return "#03a9f4";
        } else if (row[3] > 40) {
          return "#039be5";
        } else if (row[3] > 25) {
          return "#0288d1";
        } else if (row[3] > 10) {
          return "#0277bd";
        } else {
          return "#01579b";
        }
      });
      const labels = filtered.map(row => row[0]);
      const chart = {
        labels,
        datasets: [
          {
            label: "Vitamin Score",
            data: filtered.map(row => row[3]),
            backgroundColor: backgroundColors
          }
        ]
      };
      try {
        axios.post("/api/upload", chart);
      } catch (err) {
        console.log(err);
      }
      return chart;
    default:
      return state;
  }
}
