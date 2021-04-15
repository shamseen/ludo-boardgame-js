import Moves from "./moves.js";

/* ---- Game object ---- */
export const Ludo = {
    // constructor
    setup: (ctx) => {
        let initialState = {
            players: [],
            roll: {},
            canMovePieces: false,
            pathLength: 44,
            homeLength: 4,
            currentPlayer: {},
            newMove: '',
            moveTrigger: false,
            spaces: Array(44).fill("empty"),
            homeStretch: [
                // TO DO: store player info?
                [Array(4).fill("empty")],
                [Array(4).fill("empty")],
                [Array(4).fill("empty")],
                [Array(4).fill("empty")]
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