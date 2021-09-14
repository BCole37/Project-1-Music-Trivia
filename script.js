var key = "903e9e034afc51efaa5991d33e9e4306";

var generatedLyrics = [];

function artistResults(json) {
    if (json.message.header.status_code == "200" && json.message.body.artist.artist_name !== "") {
        artist = json.message.body.artist.artist_name;
        getTracks(artist);
    } else {
        console.log("artistsResults() had an error.  Starting over.");
        getArtist();
    }
}

function trackResults(json) {
    if (json.message.header.status_code == "200" && json.message.body.track_list.length > 0) {
        var goodSongs = [];
        for (var i = 0; i < json.message.body.track_list.length; i++) {
            if (json.message.body.track_list[i].track.explicit == 0 && json.message.body.track_list[i].track.has_lyrics == 1) {
                goodSongs.push( {"trackID": json.message.body.track_list[i].track.track_id, 
                "artist": json.message.body.track_list[i].track.artist_name, 
                "trackName": json.message.body.track_list[i].track.track_name });
            }
        }
        if (goodSongs.length == 0) {
            console.log(goodSongs.length);
            getArtist();
        } else {
            var track = randomize(goodSongs.length);
            var trackID = goodSongs[track];
            getLyrics(trackID);
        }
    } else {
        console.log("trackResults() had an error.  Starting over.");
        getArtist();
    }
}

function lyricResults(json) {
    if (json.message.header.status_code == "200" && json.message.body.lyrics_body !== "") {
        console.log(json.message.body.lyrics.lyrics_body);
    } else {
        console.log("lyricResults() had an error.  Starting over.");
        getArtist();
    }
}

function getArtist() {
    var randomID = randomize(9999);
    var artistURL = "https://api.musixmatch.com/ws/1.1/artist.get?format=jsonp&callback=callback&artist_id=" + randomID + "&apikey=" + key;
    $.ajax({ url: artistURL, dataType: "jsonp", jsonpCallback: "artistResults" });
}

function getTracks(artist) {
    var trackURL = "https://api.musixmatch.com/ws/1.1/track.search?format=jsonp&callback=callback&q_artist=" + artist + "&f_lyrics_language=en&f_has_lyrics=1&quorum_factor=1&apikey=" + key;
    $.ajax({ url: trackURL, dataType: "jsonp", jsonpCallback: "trackResults" });
}

function getLyrics(trackID) {
    lyricID = trackID.trackID;
    var trackURL = "https://api.musixmatch.com/ws/1.1/track.lyrics.get?format=jsonp&callback=callback&track_id=" + lyricID + "&apikey=" + key;
    $.ajax({ url: trackURL, dataType: "jsonp", jsonpCallback: "lyricResults" });
}


function randomize(length) {
    return Math.floor(Math.random() * (length - 1));
}


$(".button-search").click(function(event) {
    event.preventDefault();
    getArtist();
});