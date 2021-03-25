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
    G: new Player('green', pathLength * (1 / 4)),
    B: new Player('blue', pathLength * (2 / 4)),
    Y: new Player('yellow', pathLength * (3 / 4))
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
mockGame(); // for testing

/* ---- Functions ---- */
function mockGame() {
    // just testing, these won't be the final icons
    players.p1.img = 'https://static.thenounproject.com/png/57226-200.png';
    players.p2.img = 'https://static.thenounproject.com/png/57225-200.png';
}

function movePiece(p) {
    const before = p.pieces[0].spaceNum;
    const move = rollDice();
    const after = before + move;

    // update object
    p.pieces[0].spaceNum = after;
    console.log(`old ${before}\nnew ${after}\n`);

    // update UI
    path[after - 1].style.backgroundImage = `url(${p.img})`

    // // remove background if piece wasn't in the base area
    if (before > 0) { path[before - 1].style.backgroundImage = 'none'; }

    // TO DO: overlapping

}
const prettyPrint = (obj) => {
    console.log(JSON.stringify(obj, null, 4));
}

function rollDice(p) {
    // 2 dice
    const d1 = Math.floor(Math.random() * 6) + 1;
    const d2 = Math.floor(Math.random() * 6) + 1;
    console.log(`first ${d1}\nsecond ${d2}\n`);
    return d1 + d2;
}

/* ---- Event Handlers ---- */
diceP1.addEventListener('click', () => {
    movePiece(players.p1);
});

diceP2.addEventListener('click', () => {
    movePiece(players.p2);
})