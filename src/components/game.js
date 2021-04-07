import { Client } from "boardgame.io/react";
import Board from "./board";

/* ---- Game state ---- */
const TicTacToe = {
    setup: () => ({ cells: Array(9).fill(null) }),

    moves: {
        clickCell: (G, ctx, id) => {
            G.cells[id] = ctx.currentPlayer;
        },
    },
};


/* ---- Entry point for boardgame.io ---- */
const GameClient = Client(
    {
        game: TicTacToe,
        board: Board
    }
);

export default GameClient;