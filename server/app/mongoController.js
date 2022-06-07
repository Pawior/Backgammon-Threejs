const mongoose = require("mongoose");
const Leaderboard = require("./mongoModels/leaderboard");

module.exports = {
  getFullLeaderboard: async (req, res) => {
    try {
      const gottenLeaderboard = await Leaderboard.find();
      console.log(gottenLeaderboard);

      if (!gottenLeaderboard) {
        throw Error("sth went wron ;(");
      }
      res.status(200).json(gottenLeaderboard);
    } catch (err) {
      res.status(400).json({ msg: err });
      console.log("catch error");
      console.log(err);
    }
  },
  addScore: async (req, res) => {
    // let parsedData = JSON.parse(req.body);

    // console.log(req.body);
    // console.log("Add score ");
    const userScore = await Leaderboard.create({
      name: req.body.name,
      points: req.body.points,
      timeStamp: new Date(),
      timeStampString: new Date().toISOString(),
      comment: req.body.comment,
    });
    console.log(userScore);
    res.status(200).json({ msg: "dodane" });
  },
};
