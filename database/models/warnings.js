const mongoose = require("mongoose");

const WarningSchema = new mongoose.Schema({
  user: { type: String, required: true,},
  reason: {type: String, required: true,},
  createdAt: { type: Date,  default: Date.now },
});

const Warning = (module.exports = mongoose.model("Warning", WarningSchema));
