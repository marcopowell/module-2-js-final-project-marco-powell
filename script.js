// Initial references
const gameContainer = document.getElementById('game-container');
const canvasAnimation = document.getElementById('canvas-animation');
const optionBtns = document.getElementById('option-btns');
const guessingInputBox = document.getElementById('guessing-input-box');
const keyboardLetters = document.getElementById('keyboard-letters');
const newGameContainer = document.getElementById('new-game-container');
const newGameBtn = document.getElementById('new-game-btn');
const gameResult = document.getElementById('game-result');

// Option menu values
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

// COUNT
let winCount = 0;
let count = 0;
let ChosenWord = "";

// DISPLAY OPTION MENU
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

//WORD GENERATOR
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
    // console.log(chosenWord); //to show word in the console

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
    for (let i = 65; i<91; i++){
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
                            gameResult.setTimeout = "2000";

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
                // For filling bucket with water
                fillBucket(count);
                // Count == 6 because six fill levels
                // console.log(count);
                if (count == 6) {
                    //to delay popup message and allow time for water to drop
                    setTimeout(() => {
                        gameResult.innerHTML = `<h2 class="lose-msg">You lost!</h2><p>The correct word was <span>${chosenWord}</span></p>`;
                    blocker();
                    }, 2000); // Added 2 second delay
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


// CANVAS DRAWINGS AND SHAPES

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

    // Water level 1
    const waterOne = () => {
        context.beginPath();
        context.fillStyle = "#4d87e3"
        context.fillRect(70, 62, 60, 8);        
    };
    // Water level 2
    const waterTwo = () => {
        context.beginPath();
        context.fillStyle = "#4d87e3"
        context.fillRect(70, 54, 60, 8);   
    };
    // Water level 3
    const waterThree = () => {
        context.beginPath();
        context.fillStyle = "#4d87e3"
        context.fillRect(70, 46, 60, 8);   
    };
    // Water level 4
    const waterFour = () => {
        context.beginPath();
        context.fillStyle = "#4d87e3"
        context.fillRect(70, 38, 60, 8);   
    };
    // Water level 5
    const waterFive = () => {
        context.beginPath();
        context.fillStyle = "#4d87e3"
        context.fillRect(70, 30, 60, 8);   
    };
    // Water level 6
    const waterSix = () => {
        context.beginPath();
        context.fillStyle = "#4d87e3"
        context.fillRect(70, 22, 60, 8);   
    };

    // Initial frame
const initialDrawing = () => {
    //clear canvas 
    context.clearRect(0, 0, context.canvas.width, 
        context.canvas.height);

    // Base and poles
    //bottom line
    drawLine(10, 148, 290, 148); //done
    //left line
    drawLine(10, 5, 10, 148); // done
    //top line
    drawLine(10, 5, 100, 5); // done 
    //hanging pole
    drawLine(100, 5, 100, 20); // done

    // Bucket
    //lid
    drawLine(70, 20, 130, 20); // done // will move
    //left side
    drawLine(70, 20, 70, 70); // done // will move
    //right side
    drawLine(130, 20, 130, 70); // done // will move
    //bottom
    drawLine(70, 70, 130, 70); // done // will move

    // Static stick figure
    //head
    context.beginPath();
    context.arc(100, 110, 5, 0, Math.PI * 2, true);
    context.stroke(); //
    //body
    drawLine(100, 115, 100, 130); // done
    //left arm 
    drawLine(100, 120, 90, 115); // done
    //right arm 
    drawLine(100, 120, 110, 115); // done
    //left leg
    drawLine(100, 130, 105, 148); // done
    //right leg
    drawLine(95, 148, 100, 130); // done
    };





    // TEST AREA TEST AREA TEST AREA -------- START

    // const drawWaterLevel = (x, y) => {
    //     context.beginPath();
    //     context.fillStyle = "#4d87e3";
    //     context.fillRect(x, y, 60, 8);
    // };
    
    // // Initial positions for water levels
    // let waterLevelPositions = [
    //     { x: 70, y: 62 },
    //     { x: 70, y: 54 },
    //     { x: 70, y: 46 },
    //     { x: 70, y: 38 },
    //     { x: 70, y: 30 },
    //     { x: 70, y: 22 }
    // ];
    
    // // Function to change the positions of water levels after an event (e.g., click)
    // const changeWaterLevelPositions = () => {
    //     for (let i = 0; i < waterLevelPositions.length; i++) {
    //         waterLevelPositions[i].x = Math.floor(Math.random() * canvas.width);
    //         waterLevelPositions[i].y = Math.floor(Math.random() * canvas.height);
    //     }
    
    //     // Redraw the water levels with updated positions
    //     drawWaterLevels();
    // };
    
    // // Function to draw all water levels with their current positions
    // const drawWaterLevels = () => {
    //     for (let i = 0; i < waterLevelPositions.length; i++) {
    //         drawWaterLevel(waterLevelPositions[i].x, waterLevelPositions[i].y);
    //     }
    // };
    
    // // Example of usage:
    // // drawWaterLevels(); // Initial drawing of water levels
    
    // // Add an event listener to trigger the change in water level positions
    // document.addEventListener('click', changeWaterLevelPositions);
    

    // TEST AREA TEST AREA TEST AREA -------- END


    return {initialDrawing, waterOne, waterTwo, waterThree, waterFour, waterFive, waterSix};
};

// WATER LEVEL CASE

const fillBucket = (count) => {
    let {waterOne, waterTwo, waterThree, waterFour, waterFive, waterSix
    } = canvasCreator();
    switch (count) {
        case 1:
            waterOne();
            break;
        case 2:
            waterTwo();
            break;
        case 3:
            waterThree();
            break;
        case 4: 
            waterFour();
            break;
        case 5:
            waterFive();
            break;
        case 6: 
            waterSix();
            break;
        // case 7: 
        //     drawWaterLevels();
        //     break;
        default:
            break;
    }
};

// New game 
newGameBtn.addEventListener("click", initializer);
window.onload = initializer;


// Game container styles
// gameContainer.innerHTML = '<p>This is the game area</p>'
gameContainer.style.height = '85vh';
gameContainer.style.width = '80vw';
// gameContainer.style.backgroundColor = 'rgb(200, 216, 74)';
// gameContainer.style.display = 'flex';
// gameContainer.style.flexDirection = 'column';
// gameContainer.style.justifyContent = 'center';
// gameContainer.style.alignItems = 'center';



console.log('Test test');
