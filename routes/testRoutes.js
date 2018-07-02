const passport = require("passport");
const mongoose = require("mongoose");
const Mailer = require("../services/Mailer");
require("../models/User");
const Survey = mongoose.model("users");

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

  app.post("/api/upload", async (req, res, next) => {
    req.user.vitaminScore = req.body;
    const user = await req.user.save();
  });

  app.get("/api/upload", (req, res, next) => {
    res.send("ok");
  });
};
