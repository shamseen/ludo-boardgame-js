/* ---- DOM Elements ---- */
const board = document.querySelector('#board');

/* ---- Global Variables ---- */
const whiteSpaces = 48; // total num before home stretch

// different colors / positions for player to pick
// class definitions: see ./js/classes.js
const pTypes = {
    R: new Player('red', 0),
    G: new Player('green', whiteSpaces * (1 / 4)),
    B: new Player('blue', whiteSpaces * (2 / 4)),
    Y: new Player('yellow', whiteSpaces * (3 / 4))
}

// for now, only 2 players
// TO DO: allow choice
const players = {
    p1: pTypes.R,
    p2: pTypes.Y
}

// storing whose turn and changing turns
const gameState = {
    currentTurn: players.p1,
    updateTurn() {
        this.currentTurn = this.currentTurn === players.p1 ? players.p2 : players.p1;
    }
}

/* ---- Executing code ---- */
makeBoard();

/* ---- Functions ---- */

function makeBoard() {
    for (let i = 0; i < whiteSpaces; i++) {
        const sp = document.createElement('div');
        sp.className = 'space';
        sp.id = i;

        board.appendChild(sp);
    }
}

const prettyPrint = (obj) => {
    console.log(JSON.stringify(obj, null, 4));
}