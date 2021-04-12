export function canPlayerChoose(G, moves) {
    const basePiece = getFilteredPieces(G, 'base');
    console.log('base piece - ' + basePiece + G.roll.hasSix)

    if (G.roll.hasSix && basePiece > -1) {
        console.log('needs to move to start')
        moves.moveToStart(basePiece);
        moves.movePiece(basePiece, G.roll.sum - 6);

        return {
            show: false,
            pieces: [],
            move: 'start'
        };
    }


    const inPlay = getFilteredPieces(G, 'play');

    if (G.currentPlayer.activePieces === 1) {
        moves.movePiece(inPlay[0], G.roll.sum);
        return {
            show: false,
            pieces: [],
            move: ''
        };
    }

    console.log(inPlay);
    return {
        show: true,
        pieces: inPlay,
        move: ''
    };

    /* --- copypasta from old code --- */
    // // IF rolled six, check if any rules of six applies
    // if (roll.hasSix()) {
    //     rolledSix();
    //     return;
    // }

    // // ELSE
    // switch (inPlay.length) {
    //     // IF none on board: next turn
    //     case 0: restart(); break;

    //     // ELIF 1 on board: no choice, move that
    //     case 1:
    //         game.currentPiece = inPlay[0];
    //         letsPlay();
    //         break;

    //     // ELSE: move active (player's choice)
    //     default:
    //         showModal();
    //         break;
    // }
}

export function enterHomeStretch(piece) {
    // notify('home');
    // TO DO: define home stretch
    // TO DO: Show piece to home stretch
    // TO DO: enter home area logic
}

function getFilteredPieces(G, loc) {
    switch (loc) {
        case 'base':
            // piece w space num -1 is in base
            return G.currentPlayer.pieces.findIndex(p => p === -1);
        case 'home':
            // piece w space num 50 has left the board
            return G.currentPlayer.pieces.findIndex(p => p === 50);
        case 'play':
            // return G.currentPlayer.pieces.filter((p, i) => p < 44 && p > -1);
            return G.currentPlayer.pieces.map((p, i) => {
                if (p < 44 && p > -1) {
                    return i;
                }
            });
        default: break;
    }
}