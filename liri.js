require("dotenv").config();
var fs = require("fs")

var keys = require("./keys.js");
var axios = require("axios")
var command = process.argv[2];
var content = process.argv[3];
var undef = (undef === 'undefined') ? def_val : undef;

var Spotify = require("node-spotify-api");
var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
});

var omdb = keys.omdb.key;

var bit = keys.bit.key;



if (command === 'concert-this') {
    axios.get("https://rest.bandsintown.com/artists/" + content + "/events?app_id=" + bit + "")
        .then(function (response) {
            console.log("\nNext concert: " + response.data[0].venue.name);
            console.log("Location: " + response.data[0].venue.city);
            console.log("Time: " + response.data[0].datetime + "\n");
        });
}
else if (command === 'spotify-this-song') {
    spotify.search({ type: "track", query: "" + content + "", limit: "1" })
        .then(function (response) {
            console.log("\nSong Name: " + response.tracks.items[0].name);
            console.log("artist:" + response.tracks.items[0].album.artists[0].name);
            console.log("Album link: " + response.tracks.items[0].album.external_urls.spotify);
            console.log("Album: " + response.tracks.items[0].album.name + '\n');
        });

}
else if (command === 'movie-this') {
    axios.get("http://www.omdbapi.com/?t=" + content + "&y=&plot=short&apikey=" + omdb)
        .then(function (response) {
            console.log("\nTitle: " + response.data.Title);
            console.log("Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.Ratings[1].Value);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[2].Value);
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors + "\n");
            JSON.stringify(response.data);
        });
    //NEED TO FIGURE OUT HOW TO DEFAULT TO MR NOBODY IF NO INPUT IS ENTERED
}
else if (command === "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }
        // Break the string down by comma separation and store the contents into the output array.
        var output = data.split(",");
        var doitcontent = output[1];

        spotify.search({ type: "track", query: "" + doitcontent + "", limit: "1" })
            .then(function (response) {
                console.log("\nArtist: " + response.tracks.items[0].album.artists[0].name);
                console.log("Song Name: " + response.tracks.items[0].name);
                console.log("Album link: " + response.tracks.items[0].album.external_urls.spotify);
                console.log("Album: " + response.tracks.items[0].album.name + "\n");
            })
            .catch(function (err) {
                console.error("Error occurred: " + err);
            })
    });
}
// else if (command === 'do-what-it-says') {
//     fs.readFile("random.txt", "utf8", function (err, data) {
//         if (err) {
//             return console.log(err);
//         }
//         var output = data.split(",");
//         var doItContent = output[1];

//         spotify.search({ type: "track", query: "" + doItContent + "", limit: "1" })
//             .then(function (response) {
//                 console.log("Song Name: " + response.tracks.items[0].name);
//                 console.log("artist:" + response.tracks.items[0].album.artists[0].name);
//                 console.log("Album link: " + response.tracks.items[0].album.external_urls.spotify);
//                 console.log("Album: " + response.tracks.items[0].album.name);
//             }).catch(function (err) {
//                 console.error("Error Occurred: " + err)
//             })
//     });
// }
else {
    console.log('invalid command')
}