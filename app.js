/* ---- Global Variables ---- */
const whiteSpaces = 44; // total num before home stretch

// different colors / positions for player to pick
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


/* ---- Functions ---- */
const prettyPrint = (obj) => {
    console.log(JSON.stringify(obj, null, 4));
}
