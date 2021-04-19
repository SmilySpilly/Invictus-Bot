const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  user: { type: String, required: true, unique: true },
  username: { type: String, required: true},
  wins: { type: Number, required: true},
  losses: { type: Number, required: true },
  elo: { type: String, required: true },
  inClan: { type: Boolean, default: false },
  createdAt: { type: Date,  default: Date.now },
});

const User = (module.exports = mongoose.model("User", UserSchema));
