
const { Schema, model } = require("mongoose");

const PlaylistSchema = new Schema({
        songs: [[String]], //array of arrays of one song each, made to work with songs cmd.
        required: false,
        default: [[]],
        title: String,
        visibility: Boolean, //public or private.
});

const Playlist = model("Playlist", PlaylistSchema);
module.exports = Playlist;
