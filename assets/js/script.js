

var startButtonEl = document.querySelector("#start-quiz");
var timerEl = document.querySelector("#timer");
var containerEl = document.querySelector("#container")
var scoreLinkE1 = document.querySelector("#viewHighScore")
var questionId = 0;
var counter = 60;

var savedScore = [];

// array that holds the questions and answers
var questions = [
    {
        question: "Commonly used data types do NOT include:",
        choiceA: "strings",
        choiceB: " booleans",
        choiceC: " alerts",
        choiceD: " numbers",
        correctAnswer: "choiceC"
    },
    {
        question: "Which operator is used to assign a value to a variable?",
        choiceA: "=",
        choiceB: "-",
        choiceC: "*",
        choiceD: "+",
        correctAnswer: "choiceA"
    },
    {
        question: "The condition in an if/else statement is enclosed with ____.",
        choiceA: "Quotes",
        choiceB: "Curly Brackets",
        choiceC: "Parenthesis",
        choiceD: "Square Brackets",
        correctAnswer: "choiceA"
    },
    {
        question: "Arrays in Javascript can be used to store ______.",
        choiceA: "Numbers and Strings",
        choiceB: "Other Arrays",
        choiceC: "Booleans",
        choiceD: "All of the above",
        correctAnswer: "choiceD"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choiceA: "Javascript",
        choiceB: " terminal/bash",
        choiceC: "for loops",
        choiceD: " console.log",
        correctAnswer: "choiceC"
    }
];

// starts the quiz
var startQuiz = function () {
    // starts countdown function
    var countdown = function () {
        counter--;
        timerEl.textContent = counter;
        if (counter <= 0) {
            console.log("ran out of time")
            clearInterval(startTimer);
            timerEl.textContent = 0;
            console.log("Game Ended");
            clearMain();
            endQuiz();
        }
        else if (questionId >= questions.length) {
            clearInterval(startTimer);
            clearMain();
            endQuiz();
        };

    }
    var startTimer = setInterval(countdown, 500);

    // starts quiz 
    questionQuiz();
}

// creates questions and answers on main in HTML 
var questionQuiz = function () {
    clearMain();

    var questionContainerEl = document.createElement("div");
    questionContainerEl.className = "question-holder";

    var questionEl = document.createElement("h2");
    questionEl.textContent = questions[questionId].question;
    questionContainerEl.appendChild(questionEl);

    var choiceA = document.createElement("button");
    choiceA.textContent = questions[questionId].choiceA;
    choiceA.setAttribute("value", "choiceA");
    choiceA.className = "btn choice";
    questionContainerEl.appendChild(choiceA);

    var choiceB = document.createElement("button");
    choiceB.textContent = questions[questionId].choiceB;
    choiceB.setAttribute("value", "choiceB");
    choiceB.className = "btn choice";
    questionContainerEl.appendChild(choiceB);

    var choiceC = document.createElement("button");
    choiceC.textContent = questions[questionId].choiceC;
    choiceC.setAttribute("value", "choiceC");
    choiceC.className = "btn choice";
    questionContainerEl.appendChild(choiceC);

    var choiceD = document.createElement("button");
    choiceD.textContent = questions[questionId].choiceD;
    choiceD.setAttribute("value", "choiceD");
    choiceD.className = "btn choice";
    questionContainerEl.appendChild(choiceD);

    containerEl.appendChild(questionContainerEl);


    var questionDivEl = document.querySelector(".question-holder");

    questionDivEl.addEventListener("click", answerSelected);

}
// clear main content
var clearMain = function () {
    containerEl.innerHTML = "";
}

// compares answer selected with correct answer
var answerSelected = function (event) {
    var targetEl = event.target;
    targetAttribute = targetEl.getAttribute("value");
    var lineDivederEl = document.createElement("hr")
    var answerTextEl = document.createElement("h3")


    if (targetAttribute === questions[questionId].correctAnswer) {
        questionId = questionId + 1;
        answerTextEl.textContent = "Correct!";
    }
    else {
        // deducts seconds from score
        counter = counter - 10;
        questionId = questionId + 1;
        answerTextEl.textContent = "Wrong!";
    }

    // if there are more questions it will go to the next question
    if (questionId < questions.length) {
        questionQuiz();
    }
    else {
        clearMain();
    }
    containerEl.appendChild(lineDivederEl);
    containerEl.appendChild(answerTextEl);

}
// runs after the quiz is over
var endQuiz = function () {
    var score = timerEl.textContent;
    var resultContainerEl = document.createElement("div");
    var resultEl = document.createElement("h2");
    var scoreTextEl = document.createElement("p")

    resultContainerEl.appendChild(resultEl);
    resultContainerEl.appendChild(scoreTextEl);

    if (score === "0") {
        resultEl.textContent = "You ran out of time!";

        var resetButtonEl = document.createElement("button");
        resetButtonEl.textContent = "Try again";
        resetButtonEl.className = "btn";

        resultContainerEl.appendChild(resetButtonEl);
        resetButtonEl.addEventListener("click", restartQuiz);

    }
    else {
        resultEl.textContent = "Congrats on finishing the quiz";
        scoreTextEl.textContent = "Your final score is: " + score;

        var initalForm = document.createElement("form")
        var inputLabel = document.createElement("label");
        inputLabel.for = "scoreInput";
        inputLabel.textContent = "Enter your intials: ";

        var initalInput = document.createElement("input");
        initalInput.type = "text";
        initalInput.id = "submitText";
        initalInput.name = "scoreInput";

        var initalButtonEl = document.createElement("button");
        initalButtonEl.textContent = "Submit";
        initalButtonEl.className = "btn";
        initalButtonEl.id = "submitBtn";

        initalForm.appendChild(inputLabel);
        initalForm.appendChild(initalInput);
        initalForm.appendChild(initalButtonEl);
        resultContainerEl.appendChild(initalForm);
    }

    resultContainerEl.addEventListener("submit", scoreFormHandler);
    containerEl.appendChild(resultContainerEl);
}
// saves score and goes to high score page
var scoreFormHandler = function (event) {
    event.preventDefault();
    score = timerEl.textContent;

    event.preventDefault();
    var scoreNameInput = document.querySelector("input[name='scoreInput']").value;
    var scoreObj = {
        initals: scoreNameInput,
        score: score
    }
    savedScore.push(scoreObj);
    saveScore();
    printScore();
}
// saves score to local storage
var saveScore = function () {
    localStorage.setItem("quizScore", JSON.stringify(savedScore));
}
// loads any saved score
var loadScore = function () {
    var highScores = localStorage.getItem("quizScore")
    if (!highScores) {
        return false;
    }
    highScores = JSON.parse(highScores);

    for (i = 0; i < highScores.length; i++) {
        savedScore.push(highScores[i]);
    }
}
// prints high score on screen
var printScore = function () {

    clearMain();
    var highScoreContainer = document.createElement("div");
    var highScoreTitle = document.createElement("h2");
    highScoreTitle.textContent = "Saved Scores";
    highScoreContainer.appendChild(highScoreTitle);

    var highScoreList = document.createElement("ol");

    // loops to print every high score saved
    for (i = 0; i < savedScore.length; i++) {
        var highScoreItem = document.createElement("li");
        highScoreItem.textContent = savedScore[i].initals + " - " + savedScore[i].score;
        highScoreList.appendChild(highScoreItem);
    }


    var resetButtonEl = document.createElement("button");
    resetButtonEl.textContent = "Try again";
    resetButtonEl.className = "btn";

    var clearButtonEl = document.createElement("button");
    clearButtonEl.textContent = "Clear High Score";
    clearButtonEl.className = "btn";


    highScoreContainer.appendChild(highScoreList);
    highScoreContainer.appendChild(resetButtonEl);
    highScoreContainer.appendChild(clearButtonEl);
    containerEl.appendChild(highScoreContainer);

    resetButtonEl.addEventListener("click", restartQuiz);
    clearButtonEl.addEventListener("click", clearScore);
}
// restarts quiz by refreshing page
var restartQuiz = function () {
    location.reload();
}
// view high score from a cllick
var viewScore = function (event) {
    event.preventDefault();
    printScore();
}
// clear local storage
var clearScore = function () {
    localStorage.clear("quizScore");
    window.alert("High Score cleared");
    restartQuiz();
}

// event listener on start button quiz
startButtonEl.addEventListener("click", startQuiz);
scoreLinkE1.addEventListener("click", viewScore);
