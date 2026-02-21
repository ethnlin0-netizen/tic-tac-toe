const playBtn = document.getElementById("playBtn");
const backBtn = document.getElementById("backBtn");
const play1 = document.getElementById("1PlayerBtn");
const play2 = document.getElementById("2PlayerBtn");
const start = document.querySelector(".start");
const gameWrapper = document.querySelector(".game-wrapper");
const statusEl = document.querySelector(".status");

playBtn.addEventListener("click", () => {
    playBtn.classList.add("hidden");
    backBtn.classList.remove("hidden");
    play1.classList.remove("hidden");
    play2.classList.remove("hidden");
});

backBtn.addEventListener("click", () => {
    start.classList.remove("hidden");
    gameWrapper.classList.add("hidden");
    playBtn.classList.remove("hidden");
    backBtn.classList.add("hidden");
    play1.classList.add("hidden");
    play2.classList.add("hidden");
});

let board;

play2.addEventListener("click", () => {
    start.classList.add("hidden");
    gameWrapper.classList.remove("hidden");
    board = document.querySelectorAll(".square");
});

let turn = "X"
board.forEach(square => {
    square.addEventListener("click", () => {
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
        if(turnCount >= 5) {
            if(checkWin(player)) {
                statusEl.textContent = player + " wins";
                board = null;
                backBtn.classList.remove("hidden");
            }
        }
        if(turnCount === 9) {
            if(checkWin(player)) {
                statusEl.textContent = player + " wins";
            } else {
                statusEl.textContent = ("Draw");
            }
            board = null;
            backBtn.classList.remove("hidden");
        }
    }
}



//idea: when each square is clicked, set the text of that square to "X" or "O"
//switch the turn, then update a separate 2d array accordingly
//this array will be used to track if a move is valid or if someone has won
//the data-value of each square will determine which array element to update



