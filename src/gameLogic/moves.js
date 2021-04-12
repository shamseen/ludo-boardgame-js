// event handlers, kindof.
// takes state, metadata, any other data needed
const Moves = {
    movePiece: (G, ctx, pieceId, spaces) => {
        const oldSp = G.currentPlayer.pieces[pieceId]

        // empty out old space
        G.spaces[oldSp] = "empty";

        // fill new space
        G.spaces[oldSp + spaces] = G.currentPlayer.color

        // update player state
        G.currentPlayer.pieces[pieceId] += spaces;
        G.players[ctx.currentPlayer] = G.currentPlayer;
        console.log('moved piece ' + pieceId + ' to space ' + G.currentPlayer.pieces[pieceId])
        ctx.events.endTurn();
    },

    moveToStart: (G, ctx, pieceId) => {
        console.log('moved to start - ' + ctx.currentPlayer);

        G.currentPlayer.pieces[pieceId] = G.currentPlayer.startSpace;
        G.currentPlayer.activePieces++;
        G.players[ctx.currentPlayer] = G.currentPlayer;

        // add piece to board
        G.spaces[G.currentPlayer.startSpace] = G.currentPlayer.color;
    },

    rollDice: (G, ctx) => {
        //returns an array of two dice values
        const dice = ctx.random.Die(6, 2);

        // adding dice roll to state
        G.roll = {
            A: dice[0],
            B: dice[1]
        }

        G.roll.sum = G.roll.A + G.roll.B;
        G.roll.hasSix = G.roll.A === 6 || G.roll.B === 6;
        console.log(G.currentPlayer.color + JSON.stringify(G.roll, null, 2));

        if (G.currentPlayer.activePieces === 0 && !G.roll.hasSix) {
            G.canMovePieces = false;
            ctx.events.endTurn();
        }
        else { G.canMovePieces = true; }

        ctx.events.endStage();
    },

    setNewMove: (G, ctx, move) => {
        G.newMove = move;
        G.moveTrigger = !G.moveTrigger;
    },
}

export default Moves;