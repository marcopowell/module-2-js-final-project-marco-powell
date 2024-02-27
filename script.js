// Initial references
const gameContainer = document.getElementById('game-container');
const canvasAnimation = document.getElementById('canvas-animation');
const optionBtns = document.getElementById('option-btns');
const guessingInputBox = document.getElementById('guessing-input-box');
const keyboardLetters = document.getElementById('keyboard-letters');
const newGameContainer = document.getElementById('new-game-container');
const newGameBtn = document.getElementById('new-game-btn');
const gameResult = document.getElementById('game-result');

// Option buttons values
let options = {
    html: [
        "Markup", 
        "Element", 
        "Heading", 
        "Body", 
        "Browser", 
        "Hyperlink", 
        "Title", 
        "DOCTYPE", 
        "Website", 
        "Tags", ],
    css: [
        "Property",
        "Declaration",
        "Class", 
        "Pseudo",
        "Cascading",
        "Styles",
        "Selector",
        "Display", 
        "Rules",
        "Block",
    ],
    js: [
        "Array",
        "Function",
        "Constructor",
        "Variable",
        "Loop",
        "Undefined",
        "Instance",
        "Programming",
        "Console",
        "Debug",
    ],
};

// Count
let winCount = 0;
let count = 0;

let ChosenWord = "";

// Display Option menu
const displayOptionMenu = () => {
    optionBtns.innerHTML += `<h3>Select a Word Category</h3>`;
    let buttonCont  = document.createElement("div");
    for (let value in options) {
        buttonCont.innerHTML += `<button class="options" onclick="generateWord('${value}')">${value}</button>`;
    }
    optionBtns.appendChild(buttonCont);
};

// Block all the Buttons
const blocker = () => {
    let optionSelection = document.querySelectorAll(".options");
    let letterButtons = document.querySelectorAll(".letters");
    // Disable all options 
    optionSelection.forEach((button) => {
        button.disabled = true;
    });

    //disable all letters
    letterButtons.forEach((button) => {
        button.disabled.true;
    });
    newGameContainer.classList.remove("hide");
};

//Word Generator
const generateWord = (optionValue) => {
    let optionSelection = document.querySelectorAll(".options");
    // If optionValue matches the button innerText then highlight the selected button
    optionSelection.forEach((button) => {
        if (button.innerText.toLowerCase() === optionValue) {
            button.classList.add("active");
        }
        button.disabled = true;
    });

    //initial hide letters, clear previous word
    keyboardLetters.classList.remove("hide");
    guessingInputBox.innerText = "";

    let optionArray = options[optionValue];
    //Choose random word
    chosenWord = optionArray[Math.floor(Math.random
    () * optionArray.length)];
    chosenWord = chosenWord.toUpperCase();
    console.log(chosenWord);

    // Replace each letter with span containing dash
    let displayItem = chosenWord.replace(/./g, `<span class="dashes">_</span>`);

    //Display each element as span 
    guessingInputBox.innerHTML = displayItem;
};

//Initial function (called when page loads/user presses new game)

const initializer = () => {
    winCount = 0;
    count = 0;

    // Initially erase all content and hide letters and new game button
    guessingInputBox.innerHTML = "";
    optionBtns.innerHTML = "";
    keyboardLetters.classList.add("hide");
    newGameContainer.classList.add("hide");
    keyboardLetters.innerHTML = "";

    //KEYBOARD
    // For creating the letter buttons
    for (let i  = 65; i<91; i++){
        let button = document.createElement("button");
        button.classList.add("letters");
        //Number to ASCII [A-Z]
        button.innerText = String.fromCharCode(i);
        // Character button click
        button.addEventListener("click", () => {
            let charArray = chosenWord.split("");
            let dashes = document.getElementsByClassName("dashes");

            // IF array contains clicked value replace the dash with the letter else draw on canvas
            if (charArray.includes(button.innerText)) {
                charArray.forEach((char, index) => {
                    // IF character in array same as clicked button
                    if (char === button.innerText) {
                        // Replace dash with letter 
                        dashes[index].innerText = char;
                        //increment counter
                        winCount += 1;
                        //if winCount equals word length
                        if (winCount === charArray.length) {
                            gameResult.innerHTML = `<h2 class="win-msg">You won!</h2><p>The word was <span>${chosenWord}</span></p>`;
                            //block all buttons
                            blocker();
                        }
                    }
                });
            }
            else {
                // Lose count
                count += 1;
                // For drawing stick figure
                drawFigure(count);
                // Count == 6 because head, body, left arm, right arm, left leg, right leg
                // console.log(count);
                if (count == 6) {
                    gameResult.innerHTML = `<h2 class="lose-msg">You lost!</h2><p>The correct word was <span>${chosenWord}</span></p>`;
                    blocker();
                }
            }
            // disable clicked button
            button.disabled = true;
        });

        keyboardLetters.append(button);
    };

    displayOptionMenu();
    // Call to canvasCreator (for clearing previous canvas and creating initial canvas)
    let {initialDrawing} = canvasCreator();
    // InitialDrawing would draw the frame
    initialDrawing();
};

// Canvas 
const canvasCreator = () => {
    let context = canvasAnimation.getContext("2d");
    context.beginPath();
    context.strokeStyle = "#000";
    context.lineWidth = 2;

    // For drawing lines
    const drawLine = (fromX, fromY, toX, toY) => {
        context.moveTo(fromX, fromY);
        context.lineTo(toX, toY);
        context.stroke();
    };

    const head = () => {
        context.beginPath();
        context.arc(70, 30, 10, 0, Math.PI * 2, true);
        context.stroke();
    };

    const body = () => {
        drawLine(70, 40, 70, 80);
    };

    const LeftArm = () => {
        drawLine(70, 50, 50, 70);
    };

    const rightArm = () => {
        drawLine(70, 50, 90, 70);
    };

    const leftLeg = () => {
        drawLine(70, 80, 50, 110);
    };

    const rightLeg = () => {
        drawLine(70, 80, 90, 110);
    };

    // Initial frame
const initialDrawing = () => {
    //clear canvas 
    context.clearRect(0, 0, context.canvas.width, 
    context.canvas.height);
    //bottom line
    drawLine(10, 130, 130, 130);
    //left line
    drawLine(10, 10, 10, 131);
    //top line
    drawLine(10, 10, 70, 10);
    //hanging pole
    drawLine(70, 10, 70, 20);
    };
    
    return {initialDrawing, head, body, LeftArm, rightArm, leftLeg, rightLeg};
};

// draw the man 
const drawFigure = (count) => {
    let {head, body, LeftArm, rightArm, leftLeg, rightLeg
    } = canvasCreator();
    switch (count) {
        case 1:
            head();
            break;
        case 2:
            body();
            break;
        case 3:
            leftArm();
            break;
        case 4: 
            rightArm();
            break;
        case 5:
            leftLeg();
            break;
        case 6: 
            rightLeg();
            break;
        default:
            break;
    }
};


window.onload = initializer;

// New game 
newGameBtn.addEventListener("click", initializer);
window.onload = initializer;




// Game container 
// gameContainer.innerHTML = '<p>This is the game area</p>'
gameContainer.style.height = '80vh';
gameContainer.style.width = '80vw';
// gameContainer.style.backgroundColor = 'rgb(200, 216, 74)';
// gameContainer.style.display = 'flex';
// gameContainer.style.flexDirection = 'column';
// gameContainer.style.justifyContent = 'center';
// gameContainer.style.alignItems = 'center';

// Figure image 


console.log('This is hangman');
