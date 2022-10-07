
const { Schema, model } = require("mongoose");
const playlistSchema = require("./playlistSchema.js").schema;

const globalSchema = new Schema({
    id: { //i hate this so much
        type: Number,
        default: 0
    },
    mostPlayed:{
        type: [playlistSchema],
        default: [],
        validate: [arrayLimit, '{PATH} exceeds the limit of 10'],
    },
});
function arrayLimit(val) {
    return val.length <= 10;
  }

const Global = model("Global", globalSchema);
module.exports = Global;