// event handlers, kindof.
// takes state, metadata, any other data needed
const Moves = {
    movePiece: (G, ctx, pieceIds) => {
        // if (player.activePieces === 0) {
        //     return;
        // }

        ctx.events.endTurn();
    },

    moveToStart: (G, ctx, pieceId) => {
        console.log('moved to start - ' + ctx.currentPlayer);
        G.currentPlayer.pieces[pieceId] = G.currentPlayer.startSpace;
        G.currentPlayer.activePieces++;
        G.players[ctx.currentPlayer] = G.currentPlayer;

        ctx.events.endTurn();
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

    /* --- State get functionality --- */

    getPieceBySpace: (G, ctx, space) => {
        return G.currentPlayer.pieces.find(p => {
            p.spaceNum === space;
        })
    },


    /* --- DEBUGGING ONLY --- */
    getPlayers: (G, ctx, str) => {
        let print;
        switch (str) {
            case "c": print = ctx; break;
            case "s": print = ctx.player.state; break;
            default: print = ctx.player; break;
        }
        console.log(JSON.stringify(print, null, 2));
        return print;
    }
}

export default Moves;