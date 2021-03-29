/* ---- DOM Elements ---- */
/* from grid-main.js:
// // rollDiv = document.querySelector('.roll-dice');
*/
const board = document.querySelector('#board');
const alrt = document.querySelector('.alert');
const rollBtn = rollDiv.querySelector('#collapsed');


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
    currentPiece: null,
    gameOver: false,
    newTurn() {
        // update object
        this.currentPl = this.currentPl === players.p1 ? players.p2 : players.p1;
        this.currentPiece = null;
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

    // move piece forward
    movePiece(game.currentPiece, roll.sum);

    // check if piece has entered home stretch
    if (game.currentPiece.pathLeft < 0) {
        enterHomeStretch(game.currentPiece);
    }

    // TO DO: allow player to split roll

    restart();
}

/* ---- Functions ---- */
function canPlayerChoose() {
    // const inPlay = game.currentPl.getFilteredPieces('play').length;
    const inPlay = game.currentPl.getFilteredPieces('play');
    
    // IF rolled six, check if any rules of six applies
    if (roll.hasSix()) {
        rolledSix();
        return;
    }

    // ELSE
    switch (inPlay.length) {
        // IF none on board: next turn
        case 0: restart(); break;

        // ELIF 1 on board: no choice, move that
        case 1:
            game.currentPiece = inPlay[0];
            letsPlay();
            break;

        // ELSE: move active (player's choice)
        default:
            showModal();
            break;
    }
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
    // TO DO: pause so player knows

    // update objects
    game.currentPiece = game.currentPl.getRandomPiece('base');
    game.currentPiece.inBase = false;

    // tell players
    notify('added');

    // move piece to start
    movePiece(game.currentPiece, game.currentPl.startSp + 1);
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

    console.log(msg)
    alrt.innerText += '\n\n' + msg;
    alrt.classList = [`alert alert-${classColor}`];
}

function prettyPrint(obj) {
    console.log(JSON.stringify(obj, null, 4));
}

function restart() {
    /* updating objects */
    // enabling dice
    rollBtn.addEventListener('click', rollDice);
    
    // game state
    game.newTurn();
    console.log('new turn)');

    /* updating UI */
    notify('reset');
    rollDiv.querySelector("#rollTxt").innerText = `${game.currentPl.color} player roll`;
}

function rolledSix() {
    // TODO: choice betw adding vs moving active

    // IF pieces in base: add random to board
    if (game.currentPl.getFilteredPieces('base').length > 0) {
        moveToStart();
        roll.sum -= 6; //move piece remainder of roll
        letsPlay(); // continue turn
    }

    // ELSE : move active (player's choice)
    else {
        showModal();
    }

}

function showModal(avail = undefined) {

    const header = `Which piece should move ${roll.sum} spaces?`;
    const inPlay = avail !== undefined ? avail
        : game.currentPl.getFilteredPieces('play');

    // update UI
    updateModal(header, inPlay);
    rollDiv.classList.add('expand');
}

/* ---- Event Handlers ---- */

// player chose a piece
btnGroup.querySelectorAll('.btn').forEach((btn => {
    btn.addEventListener('click', (event) => {
        // store choice
        const id = parseInt(event.target.id);
        game.setPiece(id);

        // close modal
        rollDiv.classList.remove('expand');
        event.stopPropagation();

        // game logic
        letsPlay();
    })
}))

// dice was rolled
rollBtn.addEventListener('click', rollDice);

function rollDice() {
    roll.A = Math.floor(Math.random() * 6) + 1;
    roll.B = Math.floor(Math.random() * 6) + 1;
    roll.sum = roll.A + roll.B;

    // update UI
    notify('roll', roll);
    canPlayerChoose();

    // prevent user from rolling again
    rollDiv.removeEventListener('click', rollDice);
}