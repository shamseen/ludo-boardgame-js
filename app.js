/* ---- DOM Elements ---- */
const board = document.querySelector('#board');
const diceP1 = document.querySelector('#p1Roll');
const diceP2 = document.querySelector('#p2Roll');

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

// storing whose turn and changing turns
const game = {
    currentPl: players.p1,
    changeTurn() {
        this.currentPl = this.currentPl === players.p1 ? players.p2 : players.p1;
    },
    gameOver: false
}

/* ---- Executing code ---- */

// test
mockGame();
game.gameOver = false;

// Game logic
do {
    // TO DO: confirm start
    const roll = rollDice(game.currentPl);
    console.log(roll);

    if (roll.includes(6)) {
        rolledSix();
        game.changeTurn();
    }
} while (!game.gameOver);

/* ---- Functions ---- */
function mockGame() {
    // just testing, these won't be the final icons
    players.p1.img = 'https://static.thenounproject.com/png/57225-200.png';
    players.p2.img = 'https://static.thenounproject.com/png/57226-200.png';
}

function movePiece(piece, newSpace) {
    console.log(newSpace);
    const oldSpace = piece.spaceNum;

    console.log(`old ${oldSpace}\nnew ${newSpace}\n`);

    // update object
    piece.spaceNum = newSpace;

    // update UI
    path[newSpace].style.backgroundImage = `url(${game.currentPl.img})`

    if (oldSpace > -1) {
        path[oldSpace].style.backgroundImage = 'none';
    }

    if (game.currentPl === players.p2) {
        console.log(game.currentPl)
        game.gameOver = true;
    }

}
const prettyPrint = (obj) => {
    console.log(JSON.stringify(obj, null, 4));
}

function rollDice(p) {
    // 2 dice
    const d1 = Math.floor(Math.random() * 6) + 1;
    const d2 = Math.floor(Math.random() * 6) + 1;
    console.log(`first ${d1}\nsecond ${d2}\n`);

    return [d1, d2];
}

function rolledSix() {
    /* - IF: player has any pieces at base */
    // IF no pieces on board, set piece on start
    movePiece(game.currentPl.pieces[0], game.currentPl.startSp)

    // TO DO: pick which piece, if any

}

/* ---- Event Handlers ---- */
// diceP1.addEventListener('click', () => {

//     move(players.p1);
// });

// diceP2.addEventListener('click', () => {
//     move(players.p2);
// })
