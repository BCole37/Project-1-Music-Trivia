// making elements for each id
var questionsEl = document.querySelector("#questions");
var choicesEl = document.querySelector("#choices");
var submitBtn = document.querySelector("#submit");
var startBtn = document.querySelector("#start");
var initialsEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");

var questions = [
  {
    title: "Shape of You",
    choices: ["Ed Sheeran", "The Weeknd", "Tones And I", "Drake"],
    answer: "Ed Sheeran"
  },
  {
      title: "Blinding Lights",
      choices: ["Ed Sheeran", "The Weeknd", "Tones And I", "Drake"],
      answer: "The Weeknd"
  },
  {
      title: "Dance Monkey",
      choices: ["Ed Sheeran", "The Weeknd", "Tones And I", "Drake"],
      answer: "Tones And I"
  },
  {
      title: "One Dance",
      choices: ["Ed Sheeran", "The Weeknd", "Tones And I", "Drake"],
      answer: "Drake"
  }         
];

// quiz variables
var currentQuestionIndex = 0;
var finalScore = 0;

function startQuiz() {
  // hides the start screen
  var startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide");

  // reveals the questions 
  questionsEl.removeAttribute("class");

  getQuestion();
}

function getQuestion() {
  // gets current question from questions variable
  var currentQuestion = questions[currentQuestionIndex];

  // update question
  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;

  // removes old choices
  choicesEl.innerHTML = "";

  // loop through answers
  currentQuestion.choices.forEach(function(choice, i) {
    // create new button for each answer
    var answerButton = document.createElement("button");
    answerButton.setAttribute("class", "choice");
    answerButton.classList.add("btn", "btn-primary");
    answerButton.setAttribute("value", choice);

    answerButton.textContent = i + 1 + ". " + choice;

    // looks for a click on each answer
    answerButton.addEventListener("click", questionClick);

    // display on the page
    choicesEl.appendChild(answerButton);
  });
}

function questionClick() {
  // check if answer is correct
  if (this.value !== questions[currentQuestionIndex].answer) {
   
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
  currentQuestionIndex++;

  // end after last question else move to next question
  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}


// switches display from the questions screen to the results screen
function quizEnd() {
  

  // show end screen
  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.classList.remove("hide");

  // show final score
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = finalScore;

  // hide questions section
  questionsEl.setAttribute("class", "hide");
}


function saveHighscore(e) {
    e.preventDefault();

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

