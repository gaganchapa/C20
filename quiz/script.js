const questions =[
    {
        question: "what the world?",
        answer:[
            {text:"shark",correct:false},
            {text:"shark",correct:false},
            {text:"India",correct:true},
            {text:"shark",correct:false},
        ]
    },
    {
        question: "what the fuck?",
        answer:[
            {text:"shark",correct:false},
            {text:"shark",correct:false},
            {text:"India",correct:true},
            {text:"shark",correct:false},
        ]
    },
    {
        question: "whta the fuck?",
        answer:[
            {text:"shark",correct:false},
            {text:"india",correct:true},
            {text:"shark",correct:false},
            {text:"shark",correct:false},
        ]
    },
    {
        question: "whta the fuck?",
        answer:[
            {text:"india",correct:true},
            {text:"shark",correct:false},
            {text:"shark",correct:false},
            {text:"shark",correct:false},
        ]
    }

];
const questionElement  = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex+1;
    questionElement.innerHTML=questionNo+". "+currentQuestion.question;

    currentQuestion.answer.forEach(answer=>{
        const button = document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}
 
function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
            
    }
}
    
function selectAnswer(e){
    const seletedBtn = e.target;
    const iscorrect = seletedBtn.dataset.correct == "true";

    if(iscorrect){
        seletedBtn.classList.add("correct");
        score++;
    }else{
        seletedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct=="true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display ="block";
}

function showScore(){
    resetState();
    questionElement.innerHTML =`you scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display ="block";
}

function handlenextbtn(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        handlenextbtn();
    }else{
        startQuiz();
    }
});

startQuiz();
function clickButtonByText(text) {
    const buttons = document.querySelectorAll(".btn");
    for (const button of buttons) {
      if (button.textContent.toLowerCase() === text.toLowerCase()) {
        button.click();
        break;
      }
    }
  }

  // Annyang integration
  if (annyang) {
    // Define commands
    const commands = {
      "answer :text": (text) => {
        clickButtonByText(text);
      },
      'next': function() {
        var button = document.getElementById('next-btn'); // Select the button element by its ID
        button.click(); // Simulate a click event on the button
      }
    };
    
    // Add commands to annyang
    annyang.addCommands(commands);

    // Start listening
    annyang.start();
  }

