import { ACTIONS } from "../actions";
import axios from "axios";

function postData(url, data) {
  // Default options are marked with *
  return fetch(url, {
    body: JSON.stringify(data), // must match 'Content-Type' header
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, same-origin, *omit
    headers: {
      "content-type": "application/json"
    },
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer" // *client, no-referrer
  }).then(response => response.json()); // parses response to JSON
}

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

      postData("/api/upload", chart)
        .then(data => console.log(data)) // JSON from `response.json()` call
        .catch(error => console.error(error));
      return chart;
    default:
      return state;
  }
}
