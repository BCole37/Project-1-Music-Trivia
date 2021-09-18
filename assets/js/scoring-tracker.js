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
  // highscores.forEach(function (score) {
  //   // create li element and add to the list
  //   // var scoreAdd = document.createElement("li");
  //   // scoreAdd.textContent = score.initials + " - " + score.score;

  //   // display by appending
  //   // var list = document.getElementById("highscores");
  //   // list.appendChild(scoreAdd);
  // }

  for (let i = 0; i < highscores.length; i++) {
    var trEl = document.createElement("tr");
    var td1El = document.createElement("td");
    var td2El = document.createElement("td");
    var thEl = document.createElement("th");

    thEl.textContent = (i + 1) + ".";
    thEl.scope = "row";
    td1El.textContent = highscores[i].initials;
    td2El.textContent = highscores[i].score;

    trEl.append(thEl, td1El, td2El);

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