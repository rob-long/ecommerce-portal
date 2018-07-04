const mongoose = require("mongoose");

const { Schema } = mongoose;

const vitaminScoreSchema = new Schema({
  dateUploaded: Date,
  score: Object,
  _user: { type: Schema.Types.ObjectId, ref: "User" }
});

mongoose.model("vitaminScores", vitaminScoreSchema);

module.exports = vitaminScoreSchema;
