const { Schema, model } = require("mongoose");
const User = require("./userSchema.js");

const PlaylistSchema = new Schema({
        songs: [[{
            songTitle: String,
            url: String,
        }]], //array of arrays of one song each, made to work with songs cmd.
        required: false,
        default: [[]],
        count: {
            type: Number,
            default: 0
        },
        title: String,
        visibility: Boolean, //public or private.
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
});

const Playlist = model("Playlist", PlaylistSchema);
module.exports = Playlist;