var key = "903e9e034afc51efaa5991d33e9e4306";

var generatedResults = [];

function artistResults(json) {
    if (json.message.header.status_code == "200" && json.message.body.artist.artist_name !== "") {
        artist = json.message.body.artist.artist_name;
        console.log("Artist name: " + artist);
        getTracks(artist);
    } else {
        console.log("artistsResults() had an error.  Starting over.");
        getArtist();
    }
}

function trackResults(json) {
    generatedResults = [];
    console.log(json);
    
    if (json.message.header.status_code == "200" && json.message.body.track_list.length > 0) {
        for (var i = 0; i < json.message.body.track_list.length; i++) {
            console.log(json.message.body.track_list[i].track.track_id);
            if (json.message.body.track_list[i].track.explicit == 0 && json.message.body.track_list[i].track.has_lyrics == 1) {
                generatedResults.push( {"trackID": json.message.body.track_list[i].track.track_id, 
                "artist": json.message.body.track_list[i].track.artist_name, 
                "trackName": json.message.body.track_list[i].track.track_name });
            }
        }
        if (generatedResults.length == 0 || generatedResults.length < 5) {
            getArtist();
        } else {
            var answer = randomize(generatedResults.length);
            var trackID = generatedResults[answer];
            generatedResults.push( { "correctID": trackID });
            generatedResults.splice([answer], 1);
            getLyrics(trackID);
        }
    } else {
        console.log("trackResults() had an error.  Starting over.");
        getArtist();
    }
}

function lyricResults(json) {
    if (json.message.header.status_code == "200" && json.message.body.lyrics_body !== "") {
        lyric = json.message.body.lyrics.lyrics_body;   
        generateQuestions(lyric);
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

function generateQuestions(lyric) {
    var question = [];
    var answer = generatedResults[generatedResults.length - 1].correctID.trackName;
    console.log(answer);
    // { lyric: lyric,
    // trackname1: trackname1,
    // trackname2: trackname2,
    // trackname3: trackname3,
    // trackname4: trackname4,
    // correctAnswer: selectedtrackname }
    console.log(generatedResults);
    question.push( { "lyric": lyric } );
    for (var i = 0; i < 5; i++) {
        var randomIndex = randomize(generatedResults.length);
        var random = generatedResults[randomIndex].trackName;
        console.log(random);
        question.push( { "trackname": generatedResults[randomIndex].trackName} );
        generatedResults.splice([randomIndex], 1);
    }
    var randomTrack = randomize(question.length);
    question[randomTrack].trackname = answer;
    console.log(question);
    question.push( { "correctAnswer": answer} );
}


function randomize(length) {
    return Math.floor(Math.random() * (length - 1));
}

function init() {
    generatedResults = [];
}

init();

$(".button-random").click(function(event) {
    event.preventDefault();
    getArtist();
});