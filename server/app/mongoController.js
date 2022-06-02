const mongoose = require("mongoose");
const Leaderboard = require("./mongoModels/leaderboard");

module.exports = {
  addScore: async (req, res) => {
    // let parsedData = JSON.parse(req.body);
    // console.log(parsedData);

    console.log("Add score");
    const userScore = await Leaderboard.create({
      name: "Adam's record",
      place: 2,
      timeStamp: new Date(),
      timeStampString: new Date().toISOString(),
      points: 121,
    });

    console.log(userScore);
  },
};
