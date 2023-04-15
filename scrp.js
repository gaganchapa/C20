// Add this function to handle speaking
function speak(text) {
    ResponsiveVoice.speak(text);
}

// Modify the startQuiz function
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

// Modify the showQuestion function
function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    // Speak the question
    speak(currentQuestion.question);

    currentQuestion.answer.forEach((answer, index) => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);

        // Speak the answer options
        speak("Option " + (index + 1) + ": " + answer.text);
    });
}

// Modify the handlenextbtn function
function handlenextbtn() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

// Modify the nextButton click event listener
nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handlenextbtn();
    } else {
        startQuiz();
    }
});
startQuiz();