//Initial References
const message = document.getElementById("message");
const hintRef = document.querySelector(".hint-ref");
const controls = document.querySelector(".controls-container");
const startBtn = document.getElementById("start");
const letterContainer = document.getElementById("letter-container");
const userInpSection = document.getElementById("user-input-section");
const resultText = document.getElementById("result");
const word = document.getElementById("word");
const onWrappers = document.getElementById("wrappers");
const onControl = document.getElementById("controls-containers");
const onOutput = document.getElementById("ttest");
const noteDesign = document.getElementById("note-design");
let randomWord= "",
    randomHint = "";
let winCount = 0,
    lossCount = 0;
const difficultyBtn = document.getElementById("diff-design");
const modal = document.getElementById("difficulty-modal");
difficultyBtn.addEventListener("click", function () {
    modal.style.display = "block";
  });

  window.addEventListener("click", function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });
//Word and Hints Object
const options = {
python: "Build websites and software automate tasks, and conduct data analysis.",
java: "Used to develop mobile apps, web apps, desktop apps, games and much more.",
xamarin: "Building many different types of applications.",
html: "HyperText Markup Language",
css: "Cascading Style Sheets",
binary: "A number system where a number us represented bu using only two digits (0 and 1).",
programming: "The process or activity of writing computer programs.",
bsit: "Bachelor of Science in Information Technology",
firebase: "Is a realtime database.",
firewall: "A network security device that prevents unauthorized access to a network.",
wifi: "A wireless networking technology that uses radio waves to provide wireless high-speed internet access.",
};
const options2 = {
    Iujotm_oy_lat: "Coding is fun <br> Shift:6",
    Hello_World: "olssv dvysk <br> Shift:7",
    Java_is_the_best_language: "Mdyd lv wkh ehvw odqjxdjh <br> Shift:3",
    Zkin_tkbkx_yrkkvy: "Tech never sleeps <br> Shift:6",
    Kbkxeznotm_iuttkizkj: "Everything connected <br> Shift:6",
    Kwlm_qa_xwmbzg: "Code is poetry <br> Shift:8",
    Code_like_a_pro: "Jvkl sprl h wyv <br> Shift:7",
    Kbkxe_ham_oy_g_rkyyut: "Every bug is a lesson <br> Shift:6",
    In_code_we_trust: "Qv kwlm em bzcab <br> Shift:8",
};
let difficulty = 1;
let choosenDifficulty = options;
let words = Object.keys(choosenDifficulty);

const updateChosenDifficulty = () => {
    choosenDifficulty = difficulty === 1 ? options : options2;
    updateWords();
};

const updateWords = () => {
    words = Object.keys(choosenDifficulty);
};

function Easy() {
    difficulty = 1;
    updateChosenDifficulty();
    modal.style.display = "none";
    difficultyBtn.innerText = "Easy";
    difficultyBtn.style.backgroundColor = "#16a34a";
    noteDesign.style.display = "none";
    console.log("Difficulty set to Easy", difficulty);
}

function Normal() {
    difficulty = 2;
    updateChosenDifficulty();
    modal.style.display = "none";
    difficultyBtn.innerText = "Hard";
    difficultyBtn.style.backgroundColor = "#FA4032";
    noteDesign.style.display = "flex";
    console.log("Difficulty set to Normal", difficulty);
}


//Generate random value
const generateRandomValue = (array) => Math.floor(Math.random() * array.length);

//Block all the buttons
const blocker = () => {
    let lettersButtons = document.querySelectorAll(".letters");

    stopGame();
};

//Start Game 
startBtn.addEventListener("click", () => {
    controls.classList.add("hide");
    onWrappers.style.display = "";
    onControl.style.display = "none";
    init();
});

//Stop Game
const stopGame = () => {
    onControl.style.display = "";
    onWrappers.style.display = "none";
    controls.classList.remove("hide");
    startBtn.innerText = "Restart";
};

//Generate Word Function
const generateWord = () => {
    letterContainer.classList.remove("hide");
    userInpSection.innerText = "";
    randomWord = words[generateRandomValue(words)];
    randomHint = choosenDifficulty[randomWord];
    hintRef.innerHTML = `<div id="wordHint">
    <span>Hint:</span>${randomHint}</div>`;
    let displayItem = "";
    randomWord.split("") .forEach((value) => {
        displayItem += '<span class="inputSpace">_ </span>';
    });

    //Display each elements as span
    userInpSection.innerHTML = displayItem;
    userInpSection.innerHTML += `<div id='chanceCount'>Chances Left: ${lossCount}</div>`;
};

//Initial Function
const init = () => {
    winCount = 0;
    lossCount = 5;
    randomWord = "";
    word.innerText = "";
    randomHint = "";
    message.innerText = "";
    resultText.innerText = "";
    userInpSection.innerHTML = "";
    letterContainer.classList.add("hide");
    letterContainer.innerHTML ="";
    generateWord();

    //For creating letter buttons
for (let i=65; i < 92; i++) {
    let button = document.createElement("button");
    button.classList.add("letters");
    button.innerText = String.fromCharCode(i);

    //Number to ASCII[A-Z]
    if (difficulty === 2 && i === 91) {
        button.innerText = String.fromCharCode(95); // Display "_"
    } else if (difficulty === 1 && i === 91) {
        return // Display other characters
    }
    

    //Character button onclick
    button.addEventListener("click", () => {
        message.innerText = `Correct Letter`;
        message.style.color = "#008000";
        let charArray = randomWord.toUpperCase().split("");
        let inputSpace = document.getElementsByClassName("inputSpace");

    //If array contains clicked value replace the matched Dash with Letter
    if(charArray.includes(button.innerText)){
        charArray.forEach((char,index) => {
            //If character in array is same as clicked button
            if(char === button.innerText){
                button.classList.add("correct");
                //Replace dash with letter
                inputSpace[index].innerText = char;
                winCount += 1;
                //if winCount equals word length
                if(winCount == charArray.length){
                    let output_Correct = Math.floor(Math.random() * 4) + 1;
                    console.log(output_Correct);
                    switch(output_Correct){
                        case 1:
                            resultText.innerHTML = "Well done!";
                            break;
                        case 2:
                            resultText.innerHTML = "That's right!";
                            break;
                        case 3:
                            resultText.innerHTML = "Exactly!";
                            break;
                        default:
                            resultText.innerHTML = "Correct!";
                    }
                    resultText.style.color = "#008000";
                    startBtn.innerText = "Restart";
                    //block all buttons
                    blocker();
                }
            }
         });
    }
    else{
        //lose count
        button.classList.add("incorrect");
        button.style.backgroundColor = "red";
        button.style.color = "#ffffff";
        button.style.border= "1px solid red";
        lossCount -= 1;
        document.getElementById("chanceCount").innerText = `Chances Left: ${lossCount}`;
        message.innerText = `Incorrect Letter`;
        message.style.color = "#ff0000";
        if (lossCount == 0){
            word.innerHTML = `The word was: <span style="color: #008000; font-size: 22px;"> ${randomWord}</span>`;
            resultText.innerHTML = "Wrong Answer";
            resultText.style.color = "red";
            blocker();
        }
    }
    //Disable clicked buttons
    button.disabled = true;
    });

    //Append generated buttons to the letters container
    letterContainer.appendChild(button);
    }
};

window.onload = () => {
    init();
};