var key = "903e9e034afc51efaa5991d33e9e4306";
var artistURL = "https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?format=jsonp&callback=callback&q_track=Stairway%20to%20Heaven&q_artist=Led%20Zeppelin&apikey=" + key;

function logResults(json) {
    console.log(json);
    for (var i = 0; i < 2; i++ ) {
        console.log(json.message.body.lyrics.lyrics_body.split("\n")[i]);
    }
}

$.ajax({ url: artistURL,
    dataType: "jsonp",
    jsonpCallback: "logResults" 
});

function generateQuestion() {
    return;
}