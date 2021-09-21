# Project-1-Music-Trivia
Group Project for the UW Bootcamp

## Table of Contents
* [Links to the Project](#links-to-the-project)
* [About the Project](#about-the-project)
* [Project Demo](#project-demo)
* [Installation](#installation)
* [Execution](#execution)
* [Usage](#usage)
* [Credits](#credits)
* [License](#license)

## Links to the Project
The project has been deployed to GitHub Pages. To get this project up and running, you can use the deployment link below. Or, download the source files and use as a template.

* [GitHub Repository](https://github.com/BCole37/Project-1-Music-Trivia)
* [Deployment Link](https://bcole37.github.io/Project-1-Music-Trivia/)

## About the Project
This project is a Music trivia game app, where the user is provided with a lyric, the user then guesses the song. The user has to answer a series of questions where, each song they get correct increases their score and their score is saved on the leaderboard. It uses the Musixmatch API which allows to search and retieve a lyric, vigourously updated HTML and CSS powered by jQuery displays a highscore board which the user can access past initials of users and their result through the local storage.


### This project is created with:
* HTML
* CSS
* JavaScript
* Bootstrap 4
* Font Awesome
* jQuery
* Musixmatch API
* YouTube API

## Project Demo
### Start Screen
![Start Screen](assets\images\StartScreen.png)
* This screen is displayed when the user first goes to the site.
* They have the option to choose the quiz length from the dropdown.
* They can check previous highscores by clicking the view highscores at the top left.

### Quiz Length
![Quiz Length](assets\images\QuizLength.png)
* The default quiz lengths are 3, 5, or 10 questions.
* The quiz would be scored by the percentage they get correct.
* For this demo we will choose 3 questions for the length.

### First Question
![First Question](assets\images\FirstQuestion.png)
* This is the first question in the quiz out of three.
* The progress bar above is at 0%.

### Second Question
![Second Question](assets\images\SecondQuestion.png)
* This is the second question in the quiz out of three.
* The progress bar above is now at 33%.

### Third Question
![Third Question](assets\images\ThirdQuestion.png)
* This is the third question in the quiz out of three.
* The progress bar above is now at 66%.

### End Screen
![End Screen](assets\images\youtubelinks.png)
* This screen shows the user their final score in percentage.
* The progress bar above is at 100% and is no longer moving.
* They can enter their initials and saved it to the leaderboard.
* Under their final score the user can find the songs in the quiz.
* Each song will have a link to the youtube video followed by the name.

### Highscore Screen
![Highscore Screen](assets\images\ScoreScreen.png)
* This screen the user can view previous highscores.
* If two users has the same score they will be ranked under the previous user.
* This is also a clear highscore button which will clear all scores on the leaderboard.

## Installation
* To clone the repository
    * Make sure you have right access to pull in the reposotiory either by applying 'ssh' keys or by providing a username and password'
    * Make sure your path is proper
    * Copy the git command to where you want to clone the repository
    ```
    git clone git@github.com:BCole37/Project-1-Music-Trivia.git
    ```
    * You will see a `code-quiz` folder.
* An alternate document to clone a repo can also be found at [github](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository-from-github/cloning-a-repository)

## Execution
* You can excute it using the [Deployment Link](https://bcole37.github.io/Project-1-Music-Trivia/) or 
* Save a local copy 
  * Git clone repository locally with [installation](#installation) instructions above.
  * Change directory to `code-quiz` folder
  * You will see a file `index.html`
  * Establish your current working dirctory or your preset working directory
  * Open file the `index.html` (using the path determined above) with any browser.

## Usage
* Users can test their knowledge on random music artists. 
* They can also track their scores on the leaderboard to compete with others.

## Credits
Key sites that helped me with this project were:
* [W3 Schools](https://www.w3schools.com/)
* [Bootstrap 4](https://getbootstrap.com/docs/4.0/getting-started/introduction/)
* [Musixmatch API](https://developer.musixmatch.com/documentation)
* [YouTube Data API](https://developers.google.com/youtube/v3/getting-started)

## License
 ```
© 2021 Trilogy Education Services,
LLC, a 2U, Inc. brand.
Confidential and Proprietary. All Rights Reserved.
```