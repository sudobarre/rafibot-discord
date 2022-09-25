
const { Schema, model } = require("mongoose");

const guildSchema = new Schema({
    movies:{
        type: [String],
        required: false,
        default: [],
    },
});

module.exports = model("Guild", guildSchema);