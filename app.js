const playBtn = document.getElementById("playBtn");
const backBtn = document.getElementById("backBtn");
const play1 = document.getElementById("1PlayerBtn");
const play2 = document.getElementById("2PlayerBtn");
const start = document.querySelector(".start");
const gameWrapper = document.querySelector(".game-wrapper");
const statusEl = document.querySelector(".status");
const mainMenu = document.getElementById("mainMenu");
const xBtn = document.getElementById("xBtn");
const oBtn = document.getElementById("oBtn");
const msg = document.querySelector(".message");
const mid = document.getElementById("mid");

let gameOver;
let ai = false;
let playerTurn;
let aiTurn;
let turn;

mainMenu.addEventListener("click", () => {
    gameReset();
});

playBtn.addEventListener("click", () => {
    playBtn.classList.add("hidden");
    backBtn.classList.remove("hidden");
    play1.classList.remove("hidden");
    play2.classList.remove("hidden");
});

backBtn.addEventListener("click", () => {
    playBtn.classList.remove("hidden");
    backBtn.classList.add("hidden");
    play1.classList.add("hidden");
    play2.classList.add("hidden");
    msg.textContent = "Tic-Tac-Toe!";
    xBtn.classList.add("hidden");
    oBtn.classList.add("hidden");
});

play1.addEventListener("click", () => {
    msg.textContent = "Would you like to play as X or O?";
    playBtn.classList.add("hidden");
    play1.classList.add("hidden");
    play2.classList.add("hidden");
    xBtn.classList.remove("hidden");
    oBtn.classList.remove("hidden");
});

xBtn.addEventListener("click", () => {
    ai = true;
    playerTurn = "X";
    aiTurn = "O";
    gameStart();
});

oBtn.addEventListener("click", () => {
    ai = true;
    playerTurn = "O";
    aiTurn = "X";
    gameStart();
});

play2.addEventListener("click", () => {
    gameStart();
});

const board = document.querySelectorAll(".square");

board.forEach(square => {
    square.addEventListener("click", () => {
        if(gameOver) return;
        const coordinate = square.dataset.value;
        if(ai == false) {
            makeMove(square, coordinate);
        } else {
            if(turn == playerTurn) {
                makeMove(document.querySelector, coordinate);
                if(!gameOver) {
                    if(playerTurn == "X"){
                        //ai logic here for when ai is O
                        
                    } else {
                        //ai logic here for when ai is X
                    }
                }
            }
        }
    });
});
//AI logic is as follows:
//Loop through empty squares pretending it's the AI's turn. If any move wins, take it
//Loop through empty squares pretending it's the player's turn. If any move wins, block it
//Otherwise, pick a random empty square


let grid = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];

const winPatterns = [
    [[0,0],[0,1],[0,2]],
    [[1,0],[1,1],[1,2]], 
    [[2,0],[2,1],[2,2]],
    [[0,0],[1,0],[2,0]],
    [[0,1],[1,1],[2,1]], 
    [[0,2],[1,2],[2,2]], 
    [[0,0],[1,1],[2,2]], 
    [[0,2],[1,1],[2,0]]  
];

let turnCount = 0;

function makeMove(square, coord) {
    let player = ""
    let row = parseInt(coord[0]);
    let col = parseInt(coord[1]);
    if(grid[row][col] == "") {
        if(turn == "X") {
            player = "X"
            square.classList.add("x");
            square.textContent = turn;
            grid[row][col] = turn;
            turn = "O";
            
        } else {
            player = "O";
            square.classList.add("o");
            square.textContent = turn;
            grid[row][col] = turn;
            turn = "X";
        }
        turnCount += 1;
        if (turnCount >= 5 && checkWin(player)) {
            statusEl.textContent = player + " wins";
            gameOver = true;
            mainMenu.classList.remove("hidden");
        } else if (turnCount === 9) {
            statusEl.textContent = "Draw";
            gameOver = true;
            mainMenu.classList.remove("hidden");
        }
    }
}

//global variables can be accessed by functions
function aiMove() {
    //#1 - if there's a winning move, make it
    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            let tempCoord = `${i}${j}`;
            if(grid[i][j] == "") {
                grid[i][j] = aiTurn;
                if(checkWin(aiTurn)) {
                    grid[i][j] = "";
                    makeMove(document.querySelector('[data-value="' + tempCoord + '"]'), tempCoord)
                    return;
                } else{
                    grid[i][j] = "";
                }
            }
        }
    }
    //#2 - no winning move, but if the player has a winning move, block it
    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            let tempCoord = `${i}${j}`;
            if(grid[i][j] == "") {
                grid[i][j] = playerTurn;
                if(checkWin(playerTurn)) {
                    grid[i][j] = "";
                    makeMove(document.querySelector('[data-value="' + tempCoord + '"]'), tempCoord)
                    return;
                } else{
                    grid[i][j] = "";
                }
            }
        }
    }
    //#3 - otherwise, make a random move
    let emptySquares = [];
    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            if(grid[i][j] == "") {
                emptySquares.push(`${i}${j}`);
            }
        }
    }
    let random = emptySquares[Math.floor(Math.random() * emptySquares.length)];
    makeMove(document.querySelector('[data-value="' + random + '"]'), random); 
}

function gameReset() {
    gameWrapper.classList.add("hidden");
    start.classList.remove("hidden");
    ai = false;
    playerTurn = "";
    turn = "";

    playBtn.classList.remove("hidden");
    backBtn.classList.add("hidden");
    play1.classList.add("hidden");
    play2.classList.add("hidden");
    mainMenu.classList.add("hidden");
    xBtn.classList.add("hidden");
    oBtn.classList.add("hidden");

    grid = [["","",""],["","",""],["","",""]];
    turnCount = 0;
    gameOver = false;
    statusEl.textContent = "";
    board.forEach(square => {
        square.textContent = "";
        square  .classList.remove("x", "o");
    });
}

function checkWin(player) {
    for(let pattern of winPatterns) {
        if(pattern.every(([r, c]) => grid[r][c] === player)) {
            return true;
        }
    }
    return false;
}

function gameStart() {
    turn = "X";
    start.classList.add("hidden");
    gameWrapper.classList.remove("hidden");
    gameOver = false;
    if(playerTurn == "O") {
        setTimeout(() => {
            makeMove(mid, "11");
        }, 600);
    }  
}


