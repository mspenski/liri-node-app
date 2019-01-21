require("dotenv").config();

var keys = require("./keys.js");
var axios = require("axios")
var command = process.argv[2];
var content = process.argv[3];


// var spotify = new Spotify(keys.spotify);
var omdb = keys.omdb.key;
var spotify = keys.spotify.key;
var bit = keys.bit.key;



if (command === 'concert-this') {

}
else if (command === 'spotify-this-song') {
    axios.get("https://api.spotify.com/v1/artists/1vCWHaC5f2uS3yhpwWbIA6/albums?album_type=SINGLE&offset=20&limit=10")
}
else if (command === 'movie-this') {
    axios.get("http://www.omdbapi.com/?t=" + content + "&y=&plot=short&apikey=" + omdb + "")
        .then(function (response) {
            console.log("Title: " + response.data.Title);
            console.log("Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.Ratings[1].Value);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[2].Value);
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
        })
}
else if (command === 'do-what-it-says') {

}
else {
    console.log('invalid command')
}