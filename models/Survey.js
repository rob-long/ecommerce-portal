const mongoose = require("mongoose");
const { Schema } = mongoose;
const recipientSchema = require("./Recipient");

const surveySchema = new Schema({
  title: String,
  subject: { type: String, trim: true },
  body: { type: String, trim: true },
  recipients: [recipientSchema],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user: { type: Schema.Types.ObjectId, ref: "User" },
  dateSent: Date,
  lastResponded: Date
});

mongoose.model("surveys", surveySchema);
