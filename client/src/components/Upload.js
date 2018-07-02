import React from "react";
import csv from "csvtojson";
import { saveFile } from "../actions";
import { connect } from "react-redux";

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      URL: ""
    };
    this.handleUploadCSV = this.handleUploadCSV.bind(this);
  }

  readFileContent(file) {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = event => resolve(event.target.result);
      reader.onerror = error => reject(error);
      reader.readAsText(file);
    });
  }

  async handleUploadCSV(ev) {
    ev.preventDefault();

    const data = new FormData();
    data.append("file", this.uploadInput.files[0]);
    this.readFileContent(this.uploadInput.files[0]).then(content =>
      csv({
        delimiter: "\t",
        output: "csv"
      })
        .fromString(content)
        .then(csvRow => {
          console.log("saving csv file");
          this.props.saveFile(csvRow);
        })
    );

    data.append("filename", this.uploadInput.files[0].name);

    /*
    fetch("/api/uploadFile", {
      method: "POST",
      body: data
    }).then(response => {
      response.json().then(body => {
        this.setState({ URL: `/${body.file}` });
      });
    });
    */
  }

  render() {
    return (
      <form>
        <div className="custom-file">
          <input
            className="custom-file-input"
            ref={ref => {
              this.uploadInput = ref;
            }}
            id="healthscore"
            type="file"
            onChange={this.handleUploadCSV}
          />
          <label className="custom-file-label" htmlFor="healthscore">
            Upload your vitamin scores
          </label>
        </div>
      </form>
    );
  }
}

export default connect(
  null,
  { saveFile }
)(Upload);
