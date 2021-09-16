// selects the clear section
var clear = document.querySelector("#clear");

function printHighscores() {
    // get from localstorage or set to nothing
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
  
    // sorts scores
    highscores.sort(function(a, b) {
      return b.score - a.score;
    });
  
    highscores.forEach(function(score) {
      // create li element and add to the list
      var scoreAdd = document.createElement("li");
      scoreAdd.textContent = score.initials + " - " + score.score;
  
      // display by appending
      var list = document.getElementById("highscores");
      list.appendChild(scoreAdd);
    });
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