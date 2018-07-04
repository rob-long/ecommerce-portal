const passport = require("passport");
const mongoose = require("mongoose");
const Mailer = require("../services/Mailer");
require("../models/User");
require("../models/VitaminScore");

const VitaminScore = mongoose.model("vitaminScores");
const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");

module.exports = app => {
  app.use(cors());
  app.use(fileUpload());
  app.use("/public", express.static(__dirname + "/public"));

  app.post("/api/uploadFile", (req, res, next) => {
    let imageFile = req.files.file;
    imageFile.mv(`${__dirname}/public/${req.body.filename}.jpg`, function(err) {
      if (err) {
        return res.status(500).send(err);
      }
      res.json({ file: `public/${req.body.filename}.jpg` });
    });
  });

  app.post("/api/scores", async (req, res, next) => {
    const vitaminScore = new VitaminScore({
      score: req.body,
      _user: req.user.id,
      dateUploaded: Date.now()
    });

    req.user.vitaminScore = req.body;
    if (Object.keys(req.body).length) {
      await req.user.save();
      await vitaminScore.save();
    }
    const scores = await VitaminScore.find({ _user: req.user.id });
    res.send(scores);
  });

  app.get("/api/scores", async (req, res, next) => {
    const scores = await VitaminScore.find({ _user: req.user.id });
    res.send(scores);
  });
};
