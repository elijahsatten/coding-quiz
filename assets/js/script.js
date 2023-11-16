var questions = [
    {
        question: "What is 2 + 25?",
        answer: ["50", "225", "27", "23"],
        correct: "27"
    },
    {
        question: "What is water made of?",
        answer: ["Protein", "H2O", "Nitrogen", "Carbon Dioxide"],
        correct: "H2O"
    },
    {
        question: "Who wrote the Constitution?",
        answer: ["James Madison", "Alexander Hamilton", "George Washington", "Thomas Jefferson"],
        correct: "James Madison"
    }
];

var questionIndex = 0;
var answerButton = document.querySelectorAll(".btn");
var start = document.querySelector("#start-button");
var qa = document.querySelector("#qa");
var questionTitle = document.querySelector("#question");
var scoreContainer = document.querySelector(".score-container");
var score = 0;
var timeLeft = document.querySelector("#timer");
var timeInterval;
var time = 60;

/* Start Game Function */
function startGame() {
    questionIndex = 0;
    score = 0;
    loadQuestion();
    timer();
}

/* Start Timer Function */
function timer() {
    timeInterval = setInterval(function () {
        if (time >= 1) {
            time--;
            timeLeft.textContent = time;
        } else {
            clearInterval(timeInterval);
            endGame();
        }
    }, 1000);
}

/* Load Question Function */
function loadQuestion() {
    start.classList.add("hide");
    qa.classList.remove("hide");
    questionTitle.textContent = questions[questionIndex].question;
    answerButton.forEach((button) => {
        button.removeEventListener("click", checkAnswer);
    });
    
    answerButton.forEach((button, i) => {
        var answer = questions[questionIndex].answer[i];
        button.textContent = answer;
        button.disabled = false;
        button.addEventListener("click", checkAnswer);
    });
}

/* Check Answer Function */
function checkAnswer() {
    answerButton.forEach((button) => {
        button.disabled = true;
    });

    var answer = this.textContent;
    if (questions[questionIndex].correct === answer) {
        score++;
        nextQuestion();
    } else {
        time -= 10;
        nextQuestion();
    }
}

/* Next Question Function */
function nextQuestion() {
    questionIndex++;
    if (questionIndex < questions.length) {
        loadQuestion();
    } else {
        endGame();
    }
}

/* End Game Function */
function endGame() {
    time = 60;
    clearInterval(timeInterval);
    timeLeft.textContent = 0;
    start.classList.remove("hide");
    scoreContainer.classList.remove("hide");
    qa.classList.add("hide");
    var highscores = {
        name: prompt(score + "/" + questions.length + " What name would you like to save your score as?"),
        score: score
    }
    scoreContainer.push(highscores);
    localStorage.setItem("scoreboard", JSON.stringify(scoreContainer));
}
start.addEventListener("click", startGame);