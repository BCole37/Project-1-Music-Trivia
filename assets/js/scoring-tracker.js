var tableEl = document.querySelector("#highscores");

// selects the clear section
var clear = document.querySelector("#clear");

function printHighscores() {
  // get from localstorage or set to nothing
  var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

  // sorts scores
  highscores = highscores.sort(function (a, b) {
    return parseInt(b.score) - parseInt(a.score);
  });

  console.log(highscores);

  // creates the table for the highscore
  for (let i = 0; i < highscores.length; i++) {
    // the tables row
    var trEl = document.createElement("tr");
    // the data for the name
    var td1El = document.createElement("td");
    // the data for the score
    var td2El = document.createElement("td");
    // the rank header
    var thEl = document.createElement("th");

    thEl.textContent = (i + 1) + ".";
    thEl.scope = "row";
    td1El.textContent = highscores[i].initials;
    td2El.textContent = highscores[i].score;

    // append the elements to the table row
    trEl.append(thEl, td1El, td2El);

    // append the row to the table
    tableEl.append(trEl);
  }
}

// clear functionality
function clearHighscores() {
  window.localStorage.removeItem("highscores");
  window.location.reload();
}

// actually clears
clear.addEventListener("click", clearHighscores);


// run function when page loads
printHighscores();