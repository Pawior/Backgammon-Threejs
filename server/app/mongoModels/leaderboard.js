const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const leaderboardSchema = new Schema({
  name: String,
  place: Number,
  timeStamp: Date,
  timeStampString: String,
  points: Number,
});

const Leaderboard = model("leaderboard", leaderboardSchema);
module.exports = Leaderboard;
