const { Schema, model } = require("mongoose");

const guildSchema = new Schema({
    guildId: {
        type: Number,
        required: true
    },
    movies:{
        type: [String],
        required: false,
        default: [],
    },
});


const Guild = model("Guild", guildSchema);
module.exports = Guild;