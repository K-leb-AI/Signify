const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
    logText: {
        type:String,
        required: true
    },
    dateTime: {
        type: Date
    }
});

const TransLog = mongoose.model('TranslationLogs', logSchema);

module.exports = TransLog