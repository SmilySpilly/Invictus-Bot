const mongoose = require("mongoose");

module.exports = mongoose.connect("mongodb://localhost:27017/rust-bot", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
