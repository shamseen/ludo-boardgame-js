/* ---- DOM Elements ---- */
/* from grid-main.js:
// const modal = document.querySelector('#exampleModal');
*/
const board = document.querySelector('#board');
const rollBtn = document.querySelector('#roll');
const alrt = document.querySelector('.alert');
const modal2 = document.querySelector('#modal');
// const btnGroup = chooseCard.lastElementChild;


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
    // currentPiece: null,
    currentPiece: players.p1.pieces[0],
    gameOver: false,
    changeTurn() {
        // update object
        this.currentPl = this.currentPl === players.p1 ? players.p2 : players.p1;
        // this.currentPiece = null;
        this.currentPiece = players.p1.pieces[0];

        // update UI
        rollBtn.firstChild = `${this.currentPl.color} player roll`;
    },
    setPiece(id) {
        this.currentPiece = this.currentPl.pieces[id];
    }
}

/* ---- Executing code ---- */

// test
mockGame();
game.gameOver = false;


// Game logic
function letsPlay() {
    rollDice();
    choosePieces();

    // check if rules of six applies
    if (roll.hasSix()) {
        rolledSix();
    }

    // move piece forward
    if (game.currentPl.status('play')) {
        movePiece(game.currentPiece, roll.sum);
    }

    // check if piece has entered home stretch
    if (game.currentPiece.pathLeft < 0) {
        enterHomeStretch(game.currentPiece);
    }

    // TO DO: allow player to split roll

    // updating UI for next turn
    game.changeTurn();
}


/* ---- Functions ---- */
async function choosePieces(addPiece = false) {

    /* IF 0 or 1 piece on board & not adding a new, no choice */
    if (!addPiece && game.currentPl.status('play') < 2) {
        return;
    }

    /* ELSE update modal */
    const msg = addPiece ?
        `Which piece should enter play?` :
        `Which piece should move ${roll.sum} spaces?`;

    // change modal header
    modal.querySelector('.modal-header').textContent = msg;

    // show modal
    modal.style.visibility = 'visible';
}

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

function moveToStart() {
    // player chooses which piece
    choosePieces(true);

    // update objects
    movePiece(game.currentPiece, game.currentPl.startSp + 1);
    game.currentPiece.inBase = false;

    // tell players
    notify('added');
}

function notify(notifn, spaces = null) {
    let msg = game.currentPl.color;
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
            msg += ` moved ${spaces} spaces`;
            break;
        case 'added':
            msg += ` put a piece on the board!`;
            break;
        case 'roll':
            msg += ` rolled ${spaces.A} & ${spaces.B}`;
            break;
        case 'home':
            msg += `'s piece entered the home stretch!`;
            break;
        case 'reset': // blank out alert
            msg = '';
            alrt.innerText = '';
            classColor = "light";
            break;
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
    roll.sum = roll.A + roll.B;

    notify('roll', roll);
}

function rolledSix() {
    /* IF: no pieces at play, set on start */
    if (game.currentPl.status('play') === 0) {
        moveToStart();
        roll.sum -= 6; //move piece remainder of roll
    }
}

function updateModal() {

}

/* ---- Event Handlers ---- */
rollBtn.addEventListener('click', (event) => {
    modal2.classList.add('expand');
    console.log(modal2);
    notify('reset');
    letsPlay();
})

btnGroup.addEventListener('click', (event) => {
    const id = parseInt(event.target.id);
    game.setPiece(id);

    closeModal();
    console.log(game.currentPiece);
})
