const playBtn = document.getElementById("playBtn");
const backBtn = document.getElementById("backBtn");
const play1 = document.getElementById("1PlayerBtn");
const play2 = document.getElementById("2PlayerBtn");
const start = document.querySelector(".start");
const game = document.querySelector(".game");


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
    game.classList.remove("hidden");
});

const board = document.querySelectorAll(".square");
let turn = "x"
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

function makeMove(square, coord) {
    row = parseInt(coord[0]);
    col = parseInt(coord[1]);
    if(grid[row][col] == "") {
        if(turn == "x") {
            square.classList.add("x");
            square.textContent = "X";
            turn = "o";
            grid[row][col] = "X"
        } else {
            square.classList.add("o");
            square.textContent = "O";
            turn = "x"
            grid[row][col] = "O";
        }
    }
}



//idea: when each square is clicked, set the text of that square to "X" or "O"
//switch the turn, then update a separate 2d array accordingly
//this array will be used to track if a move is valid or if someone has won
//the data-value of each square will determine which array element to update



