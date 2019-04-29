const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    created_date: {
        type : Date,
        default : Date.now()
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'question'
    },
});

module.exports = mongoose.model('answer', answer);