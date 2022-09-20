
const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    userId: {
        type: Number,
        required: true
    },
    playlists: [{
        playlist: {
            type: [[String]],
            songs: [[String]], //array of arrays of one song each, made to work with songs cmd.
            required: false,
            default: [],
            title: String,
            visibility: Boolean, //public or private.
        }, 
        required: false,
        default: [[]],
    }],
    quotes: {
        type: [String],
        required: false,
        default: []
    },
})

module.exports = model("userSchema", userSchema);


/*
playlists: arr[playlist] //max of like 10 playlists
playlist:arr[String] //max of 100 songs per playlist idk




*/