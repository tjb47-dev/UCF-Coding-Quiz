const beginQuizContainer = document.querySelector(".begin-quiz-container")
const startQuizBtn = document.querySelector(".start-quiz-btn")
const questionsContainer = document.querySelector(".questions-container")
const questionContainer = document.querySelector(".single-question-container")
const answerResult = document.querySelector(".answer-result-text")
const questionHeading = document.querySelector(".question")
const finalScoreContainer = document.querySelector(".final-score-container")
const finalScoreDisplay = document.querySelector(".final-score")
const submitScoresBtn = document.querySelector(".submit-score-btn")
const timerEl = document.querySelector(".time-remaining")
const highScoresContainer = document.querySelector(".score-container")
const initialsValueDisplay = document.querySelector(".initials-value-input")
const scoreValueDisplay = document.querySelector(".score-value-display")
const highScoresList = document.querySelector(".high-score-list")
const goBackBtn = document.querySelector(".go-back-btn")
const clearScoresBtn = document.querySelector(".clear-score-btn")
const viewHighScoresBtn = document.querySelector(".view-high-score") 
const questions = [
    {
        numb: 1,
        question: "What does CSS stand for?",
        answer: "Cascading Style Sheet",
        options: [
          "Common Style Sheet",
          "Colorful Style Sheet",
          "Computer Style Sheet",
          "Cascading Style Sheet"
        ],
        points: 5
    },
    {
        numb: 2,
        question: "What does HTML stand for?",
        answer: "Hyper Text Markup Language",
        options: [
          "Hyper Text Preprocessor",
          "Hyper Text Markup Language",
          "Hyper Text Multiple Language",
          "Hyper Tool Multi Language"
        ],
        points: 5
    },
    {
        numb: 3,
        question: "What does SQL stand for?",
        answer: "Structured Query Language",
        options: [
          "Stylish Question Language",
          "Stylesheet Query Language",
          "Statement Question Language",
          "Structured Query Language"
        ],
        points: 5
    },
    {
        numb: 4,
        question: "What does SASS stand for?",
        answer: "Syntactically Awesome Style Sheets",
        options: [
          "Structured Awesome Style Sheets",
          "Syntactically Awesome Style Sheets",
          "Syntactically Aligned Style Sheets",
          "Structured Awesome Style Sheets"
        ],
        points: 5
    },        
]



let timeInterval
let timeLeft = 30;
let questionsIndex = 0;
let score = 0;
let initials = ""
let userChoice

function startTimer() {
    timeInterval = setInterval(function () {
        timeLeft--;
        timerEl.textContent = timeLeft
    
        if(timeLeft === 0) {
          clearInterval(timeInterval)
          // STOPS QUIZ
 
          // HIDES QUIZ
          questionsContainer.classList.add('hide')

          finalScoreContainer.classList.remove('hide')
    
          finalScoreDisplay.innerHTML = score
        }
    
      }, 1000);
}

function getNextQuestion() {
    if(questionsIndex < questions.length) {
        questionContainer.innerHTML = `
                <h2 class="question">${questions[questionsIndex].question}</h2>
                    <ol class="question-answer-options">
                        <li class="question-answer-choice">${questions[questionsIndex].options[0]}</li>
                        <li class="question-answer-choice">${questions[questionsIndex].options[1]}</li>
                        <li class="question-answer-choice">${questions[questionsIndex].options[2]}</li>
                        <li class="question-answer-choice">${questions[questionsIndex].options[3]}</li>
                    </ol>
            `

        // ONCE YOU CHOOSE AN ANSWER YOU WILL MOVE TO THE NEXT QUESTION   
        const questionChoices = document.querySelectorAll(".question-answer-choice")
        
        questionChoices.forEach((questionChoice) => {
           questionChoice.addEventListener('click', answerChoice)
       })
    } else {
 
        // SETS TIMER TO 0
        clearInterval(timeInterval)

        timerEl.innerHTML = 0

        // HIDE QUIZ
        questionsContainer.classList.add('hide')

        // INITIALS INPUT
        finalScoreContainer.classList.remove('hide')
        
        // SHOW FINAL SCORE
        finalScoreDisplay.innerHTML = score
        
        // CLEARS INITIALS ON RETAKE
        initialsValueDisplay.value = ""

        // ONCE YOU INPUT INITIALS AND CLICK SUBMIT
        submitScoresBtn.addEventListener("click", recordScore) 
    }
    
}

function recordScore(event) {
    // SCORE & INITIALS SAVED TO LOCAL STORAGE AND SCOREBOARD
    event.preventDefault()
    highScoresContainer.classList.remove('hide')
    finalScoreContainer.classList.add('hide')
    
    // ONCE SUBMIT IS CLICKED FINAL SCORE GETS HIDDEN AND WILL SHOW THE HIGH SCORE
    initials = initialsValueDisplay.value
    highScoresList.innerHTML += `
        <li>
            <p class="initials-value-display">${initials}</p>
            <p class="score-value-display">${score}</p>
        </li>
    `
    
    // EVENT LISTNERS FOR GO BACK BUTTON AND CLEAING THE SCOREBOARD
    goBackBtn.addEventListener("click", function() {
        highScoresContainer.classList.add("hide")
        beginQuizContainer.classList.remove("hide")
        userChoice = ""
        answerResult.innerHTML = ""
    })

    clearScoresBtn.addEventListener("click", function() {
        highScoresList.innerHTML = ""
    })
}

function answerChoice(event) {
    // CHECKS IF CHOICE IS CORRECT OR INCORRECT
    userChoice = event.target
    if (userChoice.innerHTML === questions[questionsIndex].answer) {
       // IF ANSWERED CORRECTLY THEN DISPLAY 'CORRECT'
        answerResult.innerHTML = 'CORRECT'
       // ADD POINTS TO SCORE
        score += questions[questionsIndex].points
    } else {
        // IF ANSWERED INCORRECTLY THEN DISPLAY 'WRONG'
        answerResult.innerHTML = 'WRONG'

        // DEDUCTS POINTS IF ANSWERED INCORRECTLY
        timeLeft -= 5
        timerEl.innerHTML = timeLeft
    }
        questionsIndex++
        getNextQuestion() 
}

function viewHighScores() {
    beginQuizContainer.classList.add("hide")
    finalScoreContainer.classList.add('hide')
    highScoresContainer.classList.remove("hide")
    goBackBtn.addEventListener("click", function() {
    highScoresContainer.classList.add("hide")
    beginQuizContainer.classList.remove("hide")
    userChoice = ""
    answerResult.innerHTML = ""
})

// CLICK EVENT LISTENER TO CLEAR SCOREBOARD
clearScoresBtn.addEventListener("click", function() {
    highScoresList.innerHTML = ""
})

}

function startQuiz() {
    questionsIndex = 0
    // RESETS SCORE
    score = 0
    // RESET COUNTDOWN
    timeLeft = 30
    timerEl.innerHTML = timeLeft
    // ONCE START QUIZ BUTTON IS CLICKED THE CONTAINER IS HIDDEN
    beginQuizContainer.classList.add("hide")
    // HIDE FINAL SCORE SECTION
    finalScoreContainer.classList.add("hide")
    highScoresContainer.classList.add("hide")
    questionsContainer.classList.remove("hide")
    // START TIMER
    startTimer()
    // DISPLAY NEXT QUESTION
    getNextQuestion()
}



viewHighScoresBtn.addEventListener("click", viewHighScores)
startQuizBtn.addEventListener("click", startQuiz);