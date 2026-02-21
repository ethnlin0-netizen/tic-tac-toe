const playBtn = document.getElementById("playBtn");
const backBtn = document.getElementById("backBtn");
const play1 = document.getElementById("1PlayerBtn");
const play2 = document.getElementById("2PlayerBtn");
const start = document.querySelector(".start");
const gameWrapper = document.querySelector(".game-wrapper");
const statusEl = document.querySelector(".status");
const mainMenu = document.getElementById("mainMenu");

let gameOver;

mainMenu.addEventListener("click", () => {
    gameWrapper.classList.add("hidden");
    start.classList.remove("hidden");

    playBtn.classList.remove("hidden");
    backBtn.classList.add("hidden");
    play1.classList.add("hidden");
    play2.classList.add("hidden");
    mainMenu.classList.add("hidden");

    grid = [["","",""],["","",""],["","",""]];
    turn = "X";
    turnCount = 0;
    gameOver = false;
    statusEl.textContent = "";
    board.forEach(square => {
        square.textContent = "";
        square  .classList.remove("x", "o");
    });
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
});

play2.addEventListener("click", () => {
    start.classList.add("hidden");
    gameWrapper.classList.remove("hidden");
    gameOver = false;
});

const board = document.querySelectorAll(".square");
let turn = "X";

board.forEach(square => {
    square.addEventListener("click", () => {
        if(gameOver) return;
        const coordinate = square.dataset.value;
        //use makeMove here
        makeMove(square, coordinate);
    });
});

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

function checkWin(player) {
    for(let pattern of winPatterns) {
        if(pattern.every(([r, c]) => grid[r][c] === player)) {
            return true;
        }
    }
    return false;
}


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



//idea: when each square is clicked, set the text of that square to "X" or "O"
//switch the turn, then update a separate 2d array accordingly
//this array will be used to track if a move is valid or if someone has won
//the data-value of each square will determine which array element to update



