//variables
var initials;
var timerCountdown = 100;

var score = 0;
var wrongAnswer = 3
//DIV elements on the page 
var quizQuestionEl = document.querySelector("#quizQuestion");
var startScreenEl = document.querySelector("#quiz");
var scoreEntryEl = document.querySelector("#scoreEntry");
var timerEl = document.getElementById("timer");
//Buttons on the page 
var quizChoicesEl = document.querySelectorAll(".quizChoices");
var startButtonEl = document.getElementById("startBtn");
var submitButtonEl = document.getElementById("scoreBtn");
//Current question Index 
var index = 0;
var timeInterval;
var quizQuestionList = [
    {
        question: "What is the square root of 36?",
        choices: ["7", "4", "6", "9"],
        answer: "6"
    },
    {
        question: "Who is the current president of Ukraine?",
        choices: ["Putin", "Zelenskyy", "Lavrov", "Poroshenko"],
        answer: "Zelenskyy"
    },
    {
        question: "Who created sliced bread?",
        choices: ["Otto Frederick Rohwedder", "Marybeth Taylor", "Tony Brewski", "Unknown"],
        answer: "Otto Frederick Rohwedder"
    },
    {
        question: "What year was the internet invented?",
        choices: ["1993", "1983", "1984", "1977"],
        answer: "1983"
    }
]

//previous score List 
var previousScoreSubmissions = JSON.parse(localStorage.getItem("scoreSubmissions"));
console.log(previousScoreSubmissions);
if (previousScoreSubmissions === null) {

    previousScoreSubmissions = [];

}
console.log(previousScoreSubmissions);

//*********** FUNCTIONS  */
function startQuiz() {
    alert("Game begins");
    //Hide the startscreen 
    startScreenEl.style.display = "none";
    //Un-hide the question and choice DIV
    quizQuestionEl.style.display = "block";

    //start the clock function 
    countdown();

    //call the display function 
    displayQandChoices();
}

function displayQandChoices() {
    // console.log("Whole Question", quizQuestionList[index]);
    // console.log(quizQuestionList[index].question);
    //Show the question on the HTML element 
    document.getElementById("question").textContent = quizQuestionList[index].question;
    //loop through all the choices for the current question 
    // console.log("HTML Element", quizChoicesEl)
    // console.log("Choices", quizQuestionList[index].choices);
    for (var i = 0; i < quizChoicesEl.length; i++) {
        //show the text on the choice buttons 
        quizChoicesEl[i].textContent = quizQuestionList[index].choices[i];
        //add an event listener 
        quizChoicesEl[i].addEventListener('click', correctAns);
    }

}

function correctAns() {
    var buttonClicked = this.textContent;
    var rightAnswer = quizQuestionList[index].answer;

    //compare the answers 
    if (buttonClicked === rightAnswer) {
        alert("Right answer")
    } else {
        timerCountdown = timerCountdown - wrongAnswer;
        alert("Wrong answer");
        //update the time display 
        timerEl.textContent = timerCountdown + "seconds left";
    }
    //move to the next question 
    index = index + 1;
    //run out of question then gameover 
    if (quizQuestionList.length === index) {
        alert("Game over");
        endQuiz();
    } else {
        // else you move to the next questoin
        displayQandChoices();
    }

}
function endQuiz() {
    clearInterval(timeInterval); //stops the clock 
    //Hide the quizQuestion DV 
    quizQuestionEl.style.display = "none";

    //un-hide the scoreEntry DIV 
    scoreEntryEl.style.display = "block";
}
function savePlayerScore() {
    //save the initials and time left by the player in localstorage 
    var username = document.getElementById("userInitials").value;
    console.log(username, timerCountdown);
    var playerScore = {
        name: username,
        score: timerCountdown
    }
    //add the new scores to the previous list 
    previousScoreSubmissions.push(playerScore)

    localStorage.setItem("scoreSubmissions", JSON.stringify(previousScoreSubmissions));

    //take to highscore page 
    window.location.href = "scores.html";


}


function countdown() {

    timeInterval = setInterval(function () {

        if (timerCountdown > 1) {
            timerEl.textContent = timerCountdown + ' seconds remaining';
            timerCountdown--;
        }
        else if (timerCountdown === 1) {
            timerEl.textContent = timerCountdown + ' second remaining';
            timerCountdown--;
        } 
        else {
            timerEl.textContent = '';
            // clearInterval(timeInterval); //stops the clock 
            endQuiz()
        }
    }, 1000);
}

//*********** FUNCTIONS  */

//Event Listener 
startButtonEl.addEventListener('click', startQuiz);
submitButtonEl.addEventListener('click', savePlayerScore);