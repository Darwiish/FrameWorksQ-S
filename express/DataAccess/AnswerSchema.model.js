const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let date = new Date().toLocaleString();

let answer = new Schema({
  name: {
    type: String
  },
  input: {
    type: String
  },
  replyTo: {
    type: String
  },
  votes: {
    type: Number
  },
    date: {
    type: String,
    default: date
  },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "question"
  }
});

module.exports = mongoose.model("answer", answer);
