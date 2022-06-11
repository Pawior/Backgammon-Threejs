const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const gamesHistorySchema = new Schema({
  users: [String],
  winner: String,
  loser: String,
  checkersData: Schema.Types.Mixed,
  endTime: Date,
  endTimeString: String,
});

const GamesHistory = model("gamesHistory", gamesHistorySchema);
module.exports = GamesHistory;
