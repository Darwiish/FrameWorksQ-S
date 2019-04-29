const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let question = new Schema({
        name: {
        type: String
    },
        title: {
        type: String
    },
        input: {
        type: String
    },
        created_date: {
        type : Date,
        default : Date.now()
    }
});

module.exports = mongoose.model('question', question);