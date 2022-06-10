const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userStatsSchema = new Schema({
  userName: String,
  wins: Number,
  loses: Number,
  timeStamp: Date,
  timeStampString: String,
});

const UserStats = model("userStats", userStatsSchema);
module.exports = UserStats;
