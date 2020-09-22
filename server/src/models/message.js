const { model, Schema } = require("mongoose");

const Message = new Schema({
  content: {
    type: String,
  },
  reply: {
    type: String,
  },
  date: {
    type: Date,
  },
});

module.exports = model("messages", Message);
