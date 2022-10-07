const { Schema, model } = require("mongoose");
const playlistSchema = require("./playlistSchema.js").schema;


const userSchema = new Schema({
    userId: {
        type: Number,
        required: true
    },
    playlists:[playlistSchema],
    quotes: {
        type: [String],
        required: false,
        default: []
    },
});

const User = model("User", userSchema);
module.exports = User;

/*
https://mongoosejs.com/docs/populate.html
playlists: arr[playlist] //max of like 10 playlists
playlist:arr[String] //max of 100 songs per playlist idk
*/