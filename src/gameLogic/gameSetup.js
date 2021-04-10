import GameView from "../components/gameView.js";
import Moves from "./moves.js";
import { Client } from "boardgame.io/react";

/* ---- Game object ---- */
const Ludo = {
    // constructor
    setup: (ctx) => {
        let initialState = {
            currentPlayer: {},
            players: [],
            roll: {},
            canMovePieces: false,
            pathLength: 44,
            homeLength: 4,
            spaces: Array(44).fill(null),
            homeStretch: [
                // TO DO: store player info?
                [Array(4).fill(null)],
                [Array(4).fill(null)],
                [Array(4).fill(null)],
                [Array(4).fill(null)]
            ]

            // TO DO: bases
        }

        /* ---- Player state ---- */
        // only 2 players for now
        let playerProps = [
            {
                color: "red",
                startSpace: 0
            },
            {
                color: "yellow",
                startSpace: 44 * (1 / 4)
            }
            // },
            // {
            //     color: "green",
            //     startSp: 44 * (2 / 4)
            // },
            // {
            //     color: "blue",
            //     startSp: 44 * (3 / 4)
            // }
        ];

        playerProps.forEach((prop, i) => {
            initialState.players[i] = {
                color: prop.color,
                startSpace: prop.startSpace,
                activePieces: 0,
                pieces: [
                    -1,
                    -1,
                    -1,
                    -1
                ]
            }
        });

        // setting current player
        initialState.currentPlayer = initialState.players[0];

        return initialState;
    },


    // event handlers, kindof.
    // takes state, metadata, any other data needed
    moves: { ...Moves },

    turn: {

        // updating game state's current player with every new turn
        onBegin: (G, ctx) => { G.currentPlayer = G.players[ctx.currentPlayer] },
        onEnd: (G, ctx) => { G.canMovePieces = false },

        stages: {
            rolling: {
                next: 'moving'
            },

            moving: {
            }
        }
    }
};


/* ---- Entry point for boardgame.io ---- */
export const GameClient = Client(
    {
        game: Ludo, // game state
        board: GameView,
        numPlayers: 2,
        debug: true
        // TODO: remove debug panel
    }
);