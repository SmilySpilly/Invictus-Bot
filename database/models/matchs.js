const mongoose = require("mongoose");

const MatchSchema = new mongoose.Schema({
  player1: { type: String, required: true},
  player2: { type: String, required: true},
  winner: { type: String, required: true},
  score: { type: String, required: true},
  createdAt: { type: Date, require: false, default: Date.now },
});

const Match = (module.exports = mongoose.model("Match", MatchSchema));
