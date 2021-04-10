// event handlers, kindof.
// takes state, metadata, any other data needed
const Moves = {
    movePiece: (G, ctx, player, piece) => {
        // if (player.activePieces === 0) {
        //     return;
        // }

        ctx.events.endTurn();
    },

    rollDice: (G, ctx) => {
        //returns an array of two dice values
        const dice = ctx.random.Die(6, 2);
        G.roll = {
            A: dice[0],
            B: dice[1]
        }

        G.roll.sum = G.roll.A + G.roll.B;
        G.roll.hasSix = G.roll.A === 6 || G.roll.B === 6;

        if (G.players[ctx.currentPlayer].activePieces === 0) {
            ctx.events.endTurn();
        }
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