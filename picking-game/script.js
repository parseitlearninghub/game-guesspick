const question = [
    {
        question: "Which language is commonly used for web development?" ,
        answer: [
            {text: "JavaScript", correct: true },
            {text: "Phyton", correct: false },
            {text: "C++", correct: false },
            {text: "Java", correct: false },
        ]
    },
    {
        question: "What does 'HTTP' stand for?" ,
        answer: [
            {text: "HyperText Transfer Protocol", correct: true },
            {text: "High Text Transfer Protocol", correct: false },
            {text: "Hyper Tech Transmission Protocol", correct: false },
            {text: "High Transfer Text Protocol", correct: false },
        ]
    },
    {
        question: "Which device is used primarily for data storage?" ,
        answer: [
            {text: "Server", correct: false },
            {text: "Switch", correct: false },
            {text: "Router", correct: false },
            {text: "Hardrive", correct: true },
        ]
    },
    {
        question: "What is cybersecurity focused on protecting?" ,
        answer: [
            {text: "Electricity", correct: false },
            {text: "Software", correct: false },
            {text: "Hardware", correct: false },
            {text: "Information", correct: true},
        ]
    },
    {
        question: "What is the primary function of an operating system?" ,
        answer: [
            {text: "Manage hardware and software resources", correct: true },
            {text: "Perform antivirus scans", correct: false },
            {text: "Serve as a web browser", correct: false },
            {text: "Compile programming languages", correct: false},
        ]
    },
    {
        question: "What is the primary goal of IoT?" ,
        answer: [
            {text: "To reduce internet usage", correct: false },
            {text: "To connect physical devices to the internet for data exchange", correct: true },
            {text: "To develop faster web browsers", correct: false },
            {text: "To create new programming languages", correct: false},
        ]
    },
    {
        question: "Which symbol is used for comments in Python?" ,
        answer: [
            {text: "//", correct: false },
            {text: "'{}'", correct: false },
            {text: "#", correct: true },
            {text: "/* */", correct: false},
        ]
    },
    {
        question: "What does IoT stand for?" ,
        answer: [
            {text: "Internet on Technology", correct: false },
            {text: "Internet of Things", correct: true },
            {text: "Interface of Technology", correct: false },
            {text: "Innovation over Technology", correct: false},
        ]
    },
    {
        question: "What is the output of the following code?<br><br>python: print(10 // 3)" ,
        answer: [
            {text: "3.33", correct: false },
            {text: "3", correct: true },
            {text: "4", correct: false },
            {text: "Error", correct: false},
        ]
    },
    {
        question: "What is a variable in programming?" ,
        answer: [
            {text: "A fixed value", correct: false },
            {text: "A storage location for data", correct: true },
            {text: "A function name", correct: false },
            {text: "A reserved keyword", correct: false},
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex= 0;
let score= 0;

function startQUIZ(){
    currentQuestionIndex = 0;
    score =0;
    nextButton.innerHTML="Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = question[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}
function resetState(){
    nextButton.style.display = "none";
    while (answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";

}
function showScore(){
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${question.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < question.length){
        showQuestion();
    }else{
        showScore();
    }
}
nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < question.length){
        handleNextButton();

    }else{
        startQUIZ();

    }
})

startQUIZ();