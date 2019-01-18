require("dotenv").config();

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);
var omdb = new omdb(keys.omdb);
var bit = new bit(keys.bit);


console.log(spotify);