const { Schema, model } = require("mongoose");

const snipeSchema = new Schema({
    channelId: {
        type: String,
        required: true
    },

    message: {
        type: String,
        required: true
    },

    author: {
        type: String,
        required: true
    },
    time: {
        type: Number,
        required: true
    }
})

module.exports = model("snipeSchema", snipeSchema);