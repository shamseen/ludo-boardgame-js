import { PlayersEnum } from "../../ctxClasses";
import Board from "../board";
import { Client } from "boardgame.io/react";


/* ---- Game object ---- */
const Ludo = {
    // constructor
    setup: () => ({

        // TO DO: map state spaces to board spaces
        spaces: Array(44).fill(null),
        homeStretch: [
            // TO DO: store player info?
            [Array(4).fill(null)],
            [Array(4).fill(null)],
            [Array(4).fill(null)],
            [Array(4).fill(null)]
        ],

        // two players for now
        // players: [PlayersEnum.R, PlayersEnum.Y]

        // TO DO: bases
    }),

    // event handlers, kindof.
    // takes state, metadata, space id
    moves: {
        // boilerplate copypasta
        clickCell: (G, ctx, id) => {
            G.cells[id] = ctx.currentPlayer;
        },

        rollDice: (G, ctx) => {
            //returns an array of two dice values
            const dice = ctx.randomDie(6, 2);
        }
    },
};


/* ---- Entry point for boardgame.io ---- */
export const GameClient = Client(
    {
        game: Ludo, // game state
        board: Board,
        numPlayers: 2,
        debug: false
        // TODO: remove debug panel
    }
);