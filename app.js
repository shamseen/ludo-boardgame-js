/* ---- DOM Elements ---- */
const board = document.querySelector('#board');
const rollBtn = document.querySelector('#roll');
const dice = document.querySelector('.dice');
const alrt = document.querySelector('.alert');

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
    },
    gameOver: false
}

/* ---- Executing code ---- */

// test
mockGame();
game.gameOver = false;


// Game logic
function letsPlay() {

    const piece = game.currentPl.pieces[0]; // TO DO: let player choose
    rollDice();

    // check if rules of six applies
    if (roll.hasSix()) {
        rolledSix();
    }

    // otherwise move piece forward
    if (game.currentPl.onBoard > 0) {
        movePiece(piece, roll.sum);
    }

    // check if piece has entered home stretch
    if (piece.pathLeft < 0) {
        enterHomeStretch(piece);
    }

    // TO DO: allow player to split roll

    // updating UI for next turn
    game.changeTurn();
}


/* ---- Functions ---- */
function enterHomeStretch(piece) {
    notify('home');
    // TO DO: define home stretch
    // TO DO: Show piece to home stretch
    // TO DO: enter home area logic
}

function mockGame() {
    // just testing, these won't be the final icons
    players.p1.img = 'https://static.thenounproject.com/png/57225-200.png';
    players.p2.img = 'https://static.thenounproject.com/png/57226-200.png';
}

function movePiece(piece, move) {

    const oldSpace = piece.spaceNum;
    let newSpace = oldSpace + move;

    console.log(`old ${oldSpace}\nnew ${newSpace}\n`);

    // colors moving past red's home stretch (into space1)
    newSpace = newSpace >= pathLength ? newSpace - pathLength : newSpace;

    // update object
    piece.spaceNum = newSpace;

    // update UI
    path[newSpace].style.backgroundImage = `url(${game.currentPl.img})`

    if (oldSpace > -1) {
        path[oldSpace].style.backgroundImage = 'none';
        notify('moved', move);

        piece.pathLeft -= move; // closer to home stretch
        console.log(`${game.currentPl.color}: ${piece.pathLeft} until home`);
    }
}

function moveToStart(piece) {
    // update objects
    movePiece(piece, game.currentPl.startSp + 1);
    game.currentPl.onBoard += 1;
    roll.sum -= 6; // remainder to be used on pieces

    // tell players
    notify('added');
    console.log(`${game.currentPl.color} got a piece on the board!`);
}

function notify(notifn, spaces = null) {
    let msg = '';
    let classColor = '';

    // setting alert color based on player
    switch (game.currentPl.color) {
        case 'red': classColor = 'danger'; break;
        case 'green': classColor = 'success'; break;
        case 'blue': classColor = 'primary'; break;
        case 'yellow': classColor = 'warning'; break;
        default: break;
    }

    // setting msg based on type of notification
    switch (notifn) {
        case 'moved':
            msg = `${game.currentPl.color} moved ${spaces} spaces`;
            break;
        case 'added':
            msg = `${game.currentPl.color} put a piece on the board!`;
            break;
        case 'reset':
            alrt.innerText = '';
            classColor = "light";
            break;
        case 'home':
            msg = `${game.currentPl.color}'s piece entered the home stretch!`;
        default: break;
    }

    alrt.innerText += '\n\n' + msg;
    alrt.classList = [`alert alert-${classColor}`];
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
    // TO DO: pick which piece, if any

    /* - IF: first turn - */
    // set piece on start
    if (game.currentPl.onBoard === 0) {
        moveToStart(game.currentPl.pieces[0]);
    } 
    else { // not first turn, move by whole roll
        movePiece(game.currentPl.pieces[0], roll.sum);
    }
}

/* ---- Event Handlers ---- */
rollBtn.addEventListener('click', () => {
    notify('reset');
    letsPlay();
})
