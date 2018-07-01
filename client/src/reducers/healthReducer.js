import { ACTIONS } from "../actions";
import axios from "axios";

export default function(state = null, action) {
  switch (action.type) {
    case ACTIONS.SAVE_FILE:
      const filtered = action.payload.filter(row => row[3] > 0);
      const labels = filtered.map(row => row[0]);
      const data = filtered.map(row => row[3]);
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
      const datasets = [
        {
          label: "Vitamin Score",
          data: data,
          backgroundColor: backgroundColors
        }
      ];
      const res = axios.post("/api/upload", { labels, datasets });
      return { labels, datasets };
    default:
      return state;
  }
}
