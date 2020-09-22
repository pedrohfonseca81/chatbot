const { model, Schema } = require("mongoose");

const User = new Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  date: {
    type: Date,
  },
});

module.exports = model("users", User);
