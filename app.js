/* ---- DOM Elements ---- */
const board = document.querySelector('#board');
const rollBtn = document.querySelector('#roll');
const dice = document.querySelector('.dice');

/* ---- Global Variables ---- */
// From grid-board.js:
// // const homeLane = 4;
// // const pathLength = 44;
// // const path = [ ... ];

// different colors / positions for player to pick
// class definitions: see ./js/classes.js
const pTypes = {
    R: new Player('red', 0),
    Y: new Player('yellow', pathLength * (1 / 4)),
    G: new Player('green', pathLength * (2 / 4)),
    B: new Player('blue', pathLength * (3 / 4)),

}

// for now, only 2 players
// TO DO: allow choice
const players = {
    p1: pTypes.R,
    p2: pTypes.Y
}

// 2 dice
const roll = {
    A: undefined,
    B: undefined,
    sum: undefined,
    hasSix() {
        return (this.A === 6 || this.B === 6);
    }
}

// storing whose turn and changing turns
const game = {
    currentPl: players.p1,
    changeTurn() {
        this.currentPl = this.currentPl === players.p1 ? players.p2 : players.p1;
        rollBtn.innerText = `${this.currentPl.color} player roll`;
        console.log(this.currentPl);
    },
    gameOver: false
}

/* ---- Executing code ---- */

// test
mockGame();
game.gameOver = false;


// Game logic
function letsPlay() {

    rollDice();

    if (roll.hasSix()) {
        rolledSix();
    }

    game.changeTurn();
}


/* ---- Functions ---- */
function mockGame() {
    // just testing, these won't be the final icons
    players.p1.img = 'https://static.thenounproject.com/png/57225-200.png';
    players.p2.img = 'https://static.thenounproject.com/png/57226-200.png';
}

function movePiece(piece, move) {

    const oldSpace = piece.spaceNum;
    const newSpace = oldSpace + move;

    console.log(move);

    console.log(`old ${oldSpace}\nnew ${newSpace}\n`);

    // update object
    piece.spaceNum = newSpace;

    // update UI
    path[newSpace].style.backgroundImage = `url(${game.currentPl.img})`

    if (oldSpace > -1) {
        path[oldSpace].style.backgroundImage = 'none';
        alert(`${game.currentPl.color} moved ${move} spaces`);
    }
}
function prettyPrint(obj) {
    console.log(JSON.stringify(obj, null, 4));
}

function rollDice() {
    roll.A = Math.floor(Math.random() * 6) + 1;
    roll.B = Math.floor(Math.random() * 6) + 1;
    console.log(`first ${roll.A}\nsecond ${roll.B}\n`);

    roll.sum = roll.A + roll.B;

    dice.innerText = JSON.stringify(roll, null, 4);
}

function rolledSix() {
    /* - IF: player has any pieces at base */

    // IF no pieces on board, set piece on start
    movePiece(game.currentPl.pieces[0], game.currentPl.startSp + 1);
    confirm(`${game.currentPl.color} got a piece on the board!`);

    // move piece with remaining roll
    movePiece(game.currentPl.pieces[0], roll.sum - 6);

    // TO DO: pick which piece, if any

}

/* ---- Event Handlers ---- */
rollBtn.addEventListener('click', () => {
    letsPlay();
})
