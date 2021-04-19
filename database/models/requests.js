const mongoose = require("mongoose");

const RequestsSchema = new mongoose.Schema({
  player1: { type: String, required: true},
  player2: { type: String, required: true},
  type: { type: String, required: true},
  active: { type: Boolean, required: true, default: true},
  createdAt: { type: Date, require: false, default: Date.now },
});

const Requests = (module.exports = mongoose.model("Requests", RequestsSchema));
