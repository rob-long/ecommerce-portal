const keys = require("../config/keys");

module.exports = survey => {
  return `
  <html>
  <body>
  <div style="text-align: center">
    <h3>We need your feedback!</h3>
    <div>${survey.body}</div>
    <div>
      <a href="${keys.domain}/api/surveys/${survey.id}/yes">Yes</a>
    </div>
    <div>
      <a href="${keys.domain}/api/surveys/${survey.id}/no">No</a>
    </div>
  </div>
  </body>
  `;
};
