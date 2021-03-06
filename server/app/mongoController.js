const mongoose = require("mongoose");
const Leaderboard = require("./mongoModels/leaderboard");
const UserStats = require("./mongoModels/userStats");
const GamesHistory = require("./mongoModels/gamesHistory");
let { users, games } = require("./model");
let path = require("path");

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
    console.log(req.body);
    let userName = users.find((elem) => elem.color == req.body.userColor);
    userName = userName.nick;

    const doesUserExit = await UserStats.exists({ userName: userName });
    console.log("doesUserExit: ", doesUserExit);

    if (doesUserExit == null) {
      const userStat = await UserStats.create({
        userName: userName,
        wins: 0,
        loses: 0,
        timeStamp: new Date(),
        timeStampString: new Date().toISOString(),
      });
      console.log(userStat);
      res.status(200).json({ msg: "dodane" });
    }
    if (req.body.result == "win") {
      UserStats.findOneAndUpdate(
        { userName: userName },
        { $inc: { wins: 1 } },
        { new: true },
        function (err, response) {
          console.log(err);
        }
      );
    } else if (req.body.result == "lose") {
      UserStats.findOneAndUpdate(
        { userName: userName },
        { $inc: { loses: 1 } },
        { new: true },
        function (err, response) {
          console.log(err);
        }
      );
    }
  },
  getSpecificUserStat: async (req, res) => {
    let user = req.query.user;
    console.log(user);
    const userStats = await UserStats.findOne({ userName: user }).exec();
    console.log(userStats);
    console.log(userStats.loses);
    // res.sendFile(path.join(__dirname, "..", "..", "client", "stats.html"));
    res.send({
      userName: userStats.userName,
      wins: userStats.wins,
      loses: userStats.loses,
    });
  },
  postSpecificUserStat: async (req, res) => {
    console.log(req.body);
    let userName = users.find((elem) => elem.color == req.body.userColor);
    userName = userName.nick;
    console.log(userName);
    const userStats = await UserStats.findOne({ userName: userName }).exec();
    console.log(userStats);
    console.log(userStats.loses);
    // res.sendFile(path.join(__dirname, "..", "..", "client", "stats.html"));
    res.send({
      userName: userStats.userName,
      wins: userStats.wins,
      loses: userStats.loses,
    });
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
    // console.log(req.body.users);
    // console.log(req.body.users.firstUserName);
    let winnerUserName = users.find(
      (elem) => elem.color == req.body.winnerColor
    );
    winnerUserName = winnerUserName.nick;
    let loserUserName = users.find((elem) => elem.color == req.body.loserColor);
    console.log("loserUserName ", loserUserName);
    if (loserUserName == undefined) {
      loserUserName = "no user";
    } else {
      loserUserName = loserUserName.nick;
    }

    const gamesHistory = await GamesHistory.create({
      users: [winnerUserName, loserUserName],
      winner: winnerUserName,
      loser: loserUserName,
      checkersData: [],
      endTime: new Date(),
      endTimeString: new Date().toISOString(),
    });
    console.log(gamesHistory);
    res.status(200).json({ msg: "dodane" });
  },
};
