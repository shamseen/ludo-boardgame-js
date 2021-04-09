import Board from "../board";
import { Client } from "boardgame.io/react";

/* ---- Game object ---- */
const Ludo = {
    // constructor
    setup: (ctx) => {
        let initialState = {
            players: [],
            roll: {},
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
                pieces: {
                    p1: -1,
                    p2: -1,
                    p3: -1,
                    p4: -1
                }
            }
        });

        return initialState;
    },


    // event handlers, kindof.
    // takes state, metadata, any other data needed
    moves: {
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
    },

    turn: {
        stages: {
            rollDice: {
                moves: {
                    rollDice: (G, ctx) => {
                        //returns an array of two dice values
                        const dice = ctx.random.Die(6, 2);
                        G.roll = {
                            A: dice[0],
                            B: dice[1],
                            sum: this.A + this.B,
                            hasSix: this.A === 6 || this.B === 6
                        }
                    }
                 }
            },

            movePieces: {
                moves: {
                    movePiece: (G, ctx, player, piece) => {

                    }
                }
            }
        }
    }
};


/* ---- Entry point for boardgame.io ---- */
export const GameClient = Client(
    {
        game: Ludo, // game state
        board: Board,
        numPlayers: 2,
        debug: true
        // TODO: remove debug panel
    }
);