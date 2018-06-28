const passport = require("passport");
const mongoose = require("mongoose");
const Mailer = require("../services/Mailer");
require("../models/Survey");
const Survey = mongoose.model("surveys");

module.exports = app => {
  app.get("/test", (req, res) => {
    const survey = new Survey({
      title: "Dinner",
      subject: "Are you coming to dinner?",
      body:
        "Need to rsvp by 5pm! You're welcome to bring any friends if you would like.",
      recipients: [
        { email: "roblong@gmail.com" },
        { email: "mindspike@gmail.com" }
      ],
      _user: 123,
      dateSent: Date.now()
    });
    const mailer = new Mailer(
      {
        subject: survey.subject,
        recipients: survey.recipients
      },
      survey.body
    );
    mailer.send();
    res.send(mailer.getAll());
  });
};
