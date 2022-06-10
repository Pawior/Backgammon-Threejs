const mongoose = require("mongoose");
const Leaderboard = require("./mongoModels/leaderboard");
const UserStats = require("./mongoModels/userStats");
const GamesHistory = require("./mongoModels/gamesHistory");

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
  getAllStat: async (req, res) => {
    try {
      const gottenStats = await UserStats.find();
      console.log(gottenStats);

      if (!gottenStats) {
        throw Error("sth went wron ;(");
      }
      res.status(200).json(gottenStats);
    } catch (err) {
      res.status(400).json({ msg: err });
      console.log("catch error");
      console.log(err);
    }
  },

  addUserStat: async (req, res) => {
    // let parsedData = JSON.parse(req.body);

    // console.log(req.body);
    // console.log("Add score ");
    const userStat = await UserStats.create({
      userName: req.body.userName,
      wins: req.body.wins,
      loses: req.body.loses,
      timeStamp: new Date(),
      timeStampString: new Date().toISOString(),
    });
    console.log(userStat);
    res.status(200).json({ msg: "dodane" });
  },

  getGamesHistory: async (req, res) => {
    try {
      const gottenGames = await GamesHistory.find();
      console.log(gottenGames);

      if (!gottenGames) {
        throw Error("sth went wron ;(");
      }
      res.status(200).json(gottenGames);
    } catch (err) {
      res.status(400).json({ msg: err });
      console.log("catch error");
      console.log(err);
    }
  },
  addGameToHistory: async (req, res) => {
    console.log(req.body);
    console.log(req.body.users);
    console.log(req.body.users.firstUserName);
    const gamesHistory = await GamesHistory.create({
      firstUserName: req.body.users.firstUserName,
      secondUserName: req.body.users.secondUserName,
      winner: req.body.winner,
      loser: req.body.loser,
      checkersData: [],
      endTime: new Date(),
      endTimeString: new Date().toISOString(),
    });
    console.log(gamesHistory);
    res.status(200).json({ msg: "dodane" });
  },
};
