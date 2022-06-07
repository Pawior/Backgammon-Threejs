const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const leaderboardSchema = new Schema({
  name: String,
  points: Number,
  timeStamp: Date,
  timeStampString: String,
  comment: String,
});

const Leaderboard = model("leaderboard", leaderboardSchema);
module.exports = Leaderboard;
