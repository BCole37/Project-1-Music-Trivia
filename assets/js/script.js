// making elements for each id
var questionsEl = document.querySelector("#questions");
var choicesEl = document.querySelector("#choices");
var submitBtn = document.querySelector("#submit");
var startBtn = document.querySelector("#start");
var initialsEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");

var key = "903e9e034afc51efaa5991d33e9e4306";

var generatedResults = [];
var answer = "";

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
    results = [];
    generatedResults= [];
    
    if (json.message.header.status_code == "200" && json.message.body.track_list.length > 0) {
      console.log(json);
        for (var i = 0; i < 5; i++) {
            if (json.message.body.track_list[i].track.explicit == 0 && json.message.body.track_list[i].track.has_lyrics == 1) {
              if (!results.includes(json.message.body.track_list[i].track.track_name)) {
                generatedResults.push( {"trackID": json.message.body.track_list[i].track.track_id, 
                "artist": json.message.body.track_list[i].track.artist_name, 
                "trackName": json.message.body.track_list[i].track.track_name });
            }
          }
        }
        if (generatedResults.length == 0 || generatedResults.length < 5) {
            getArtist();
        } else {
            var random = randomize(generatedResults.length);
            var trackID = generatedResults[random];
            answer = trackID.trackName;
            console.log(generatedResults);
            getLyrics(trackID);
        }
    } else {
        console.log("trackResults() had an error.  Starting over.");
        getArtist();
    }
}

function lyricResults(json) {
    if (json.message.header.status_code == "200" && json.message.body.lyrics_body !== "") {
        var lyric = json.message.body.lyrics.lyrics_body.split(/\r?\n/);
        var lyrics = [];
        for (var i = 0; i < 3; i++) {
          lyrics += lyric[i] + "\n";
        }  
        generateQuestions(lyrics);
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
    var titleEl = document.getElementById("question-title");
    titleEl.textContent = lyric;

    choicesEl.innerHTML = "";

    for (var i = 0; i < generatedResults.length; i++) {
      var choice = generatedResults[i].trackName;
      var answerButton = document.createElement("button");
      answerButton.setAttribute("class", "choice");
      answerButton.setAttribute("value", choice);

      answerButton.textContent = i + 1 + ". " + choice;

      answerButton.addEventListener("click", questionClick);

      choicesEl.appendChild(answerButton);
    }
    console.log(answer);
}


function randomize(length) {
    return Math.floor(Math.random() * (length - 1));
}

// quiz variables
var currentQuestionIndex = 0;
var finalScore = 0;

function startQuiz() {
  // hides the start screen
  var startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide");

  // reveals the questions 
  questionsEl.removeAttribute("class");

  getArtist();
}

function questionClick() {
  // check if answer is correct
  if (this.value !== answer) {
   
    feedbackEl.textContent = "Incorrect";
    } else {
    feedbackEl.textContent = "Correct";
    finalScore++;
    }

  // feedback on if the answer was right or wrong
  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function() {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 2000);

 
  
  // next question

  // currentQuestionIndex++;

  // end after last question else move to next question
  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
     getArtist();
  }
}


// switches display from the questions screen to the results screen
function quizEnd() {
  

  // show end screen
  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");

  // show final score
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = finalScore;

  // hide questions section
  questionsEl.setAttribute("class", "hide");
}


function saveHighscore() {
  // get initials
  var initials = initialsEl.value.trim();

  if (initials !== "") {
    // get from localstorage or set to nothing
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

    // format the new score
    var newScore = {
      score: finalScore,
      initials: initials
    };

    // save to localstorage
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    // got to highscores page
    window.location.href = "HighscorePage.html";
  }
}

// submit initials
submitBtn.addEventListener("click", saveHighscore);

// start quiz
startBtn.addEventListener("click", startQuiz);

