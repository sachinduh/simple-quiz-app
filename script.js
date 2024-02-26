const question = [
    {
        question: "What is the popular programming language ?",
        answers: [
            {text : "Python", correct : false},
            {text : "Java", correct : false},
            {text : "JavaScript", correct : true},
            {text : "C++", correct : false},
        ]
    },
    {
        question: "What are the two methods of forms transfer ?",
        answers: [
            {text : "Get and receive", correct : false},
            {text : "Post and receive", correct : false},
            {text : "Get and post", correct : true},
            {text : "Post and take", correct : false},
        ]
    },
    {
        question: "What should be the very last thing in an HTML document ?",
        answers: [
            {text : "The heading", correct : false},
            {text : "Title", correct : false},
            {text : "Body", correct : false},
            {text : "Doctype", correct : true},
        ]
    },
    {
        question: "Which of the following is not an HTML tag ?",
        answers: [
            {text : "Doctype", correct : true},
            {text : "P", correct : false},
            {text : "Table", correct : false},
            {text : "Style", correct : false},
        ]
    },
    {
        question: "How many ways you can apply colors in CSS ?",
        answers: [
            {text : "1", correct : false},
            {text : "2", correct : false},
            {text : "3", correct : false},
            {text : "7", correct : true},
        ]
    },
    {
        question: "How can you clear a floated element ?",
        answers: [
            {text : "Clear:both", correct : true},
            {text : "Press the delete key", correct : false},
            {text : "Del tag", correct : false},
            {text : "Strike tag", correct : false},
        ]
    },
    {
        question: "Which of the following is described as a collection of images put in a single image ?",
        answers: [
            {text : "Float", correct : false},
            {text : "Align", correct : false},
            {text : "Sprite", correct : true},
            {text : "Image", correct : false},
        ]
    },
    {
        question: "A collection of data containing both properties and methods is called.... ?",
        answers: [
            {text : "Tag", correct : false},
            {text : "Selector", correct : false},
            {text : "Object", correct : true},
            {text : "Class", correct : false},
        ]
    },
    {
        question: "In JavaScript, 'this' refers to the object that____ the object.",
        answers: [
            {text : "Receives", correct : false},
            {text : "Depends", correct : false},
            {text : "Direct", correct : false},
            {text : "Owns", correct : true},
        ]
    },
    {
        question: "What is the runtime complexity of Fibonacci sequence ?",
        answers: [
            {text : "O (on)", correct : true},
            {text : "O (2n)", correct : false},
            {text : "(n)", correct : false},
            {text : "N (o)", correct : false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz () {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = question[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct =answer.correct;
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

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    })
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${question.length}!`;
    nextButton.innerHTML = "play again";
    nextButton.style.display = "block";
}

function handleNextButton (){
    currentQuestionIndex++;
    if(currentQuestionIndex<question.length){
        showQuestion();
    } else{
        showScore();
    }
}

nextButton.addEventListener("click",() => {
    if(currentQuestionIndex < question.length){
        handleNextButton();
    } else {
        startQuiz();
    }
})
startQuiz ();
