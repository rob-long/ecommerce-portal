const _ = require("lodash");
const Path = require("path-parser").default;
const { URL } = require("url");
const mongoose = require("mongoose");
require("../models/Survey");
const requireLogin = require("../middlewares/requireLogin");
const hasCredit = require("../middlewares/hasCredit");
const Mailer = require("../services/Mailer");
const Survey = mongoose.model("surveys");

module.exports = app => {
  app.get("/api/surveys", requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select({
      recipients: false
    });

    res.send(surveys);
  });

  app.get("/api/surveys/:surveyId/:choice", (req, res) => {
    const user = req.user;
    res.send("Thanks for your response!");
  });

  app.post("/api/surveys", requireLogin, hasCredit(1), async (req, res) => {
    const { title, subject, body, recipients } = req.body;
    const recipientList = recipients.split(",").map(e => {
      return { email: e };
    });

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipientList,
      _user: req.user.id,
      dateSent: Date.now()
    });

    try {
      const mailer = new Mailer(survey);
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();
      res.send(user);
    } catch (err) {
      console.log("error!", err);
      res.status(422).send(err);
    }
  });

  app.post("/api/surveys/webhooks", (req, res) => {
    const p = new Path("/api/surveys/:surveyId/:choice");
    _.chain(req.body)
      .map(({ email, url }) => {
        if (!url) {
          return;
        }
        const match = p.test(new URL(url).pathname);
        if (match) {
          return {
            email,
            surveyId: match.surveyId,
            choice: match.choice
          };
        }
      })
      .compact()
      .uniqBy("email", "surveyId")
      .each(({ email, surveyId, choice }) =>
        updateEvent(surveyId, email, choice)
      )
      .value();
    res.send({ a: "b" });
  });
};

// mongoose update statement
// find survey by id and recipient child who has email and responded properties
// increment survey.choice and recipient.responded
function updateEvent(surveyId, email, choice) {
  Survey.updateOne(
    {
      _id: surveyId,
      recipients: {
        $elemMatch: { email: email, responded: false }
      }
    },
    {
      // es 2016 key interpolation
      // increment yes or no by 1
      $inc: { [choice]: 1 },
      $set: { "recipients.$.responded": true },
      lastResponded: new Date()
    }
  ).exec();
}
