const mongoose = require("mongoose");

const ClansSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: false},
  color: { type: String, default: "Gray", unique: false },
  leader: { type: String, required: true, unique: false},
  officers: { type: Array, required: true, unique: false, default: []},
  members: { type: Array, required: true, unique: false, default: []},
  wins: { type: Number, required: true, unique: false, default: 0 },
  losses: { type: Number, required: true, unique: false, default: 0 },
  elo: { type: String, required: true, unique: false, default: "0" },
  roleID: { type: String, required: true, unique: false },
  createdAt: { type: Date,  default: Date.now, unique: false },
});

const Clan = (module.exports = mongoose.model("Clan", ClansSchema));