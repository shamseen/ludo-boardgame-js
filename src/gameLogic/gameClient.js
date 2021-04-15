import GameView from "../components/gameView.js";
import { Client } from "boardgame.io/react";
import { Ludo } from "./gameSetup.js";
import { SocketIO } from 'boardgame.io/multiplayer'

/* ---- Entry point for boardgame.io ---- */
export const GameClient = Client(
    {
        game: Ludo, // game state
        board: GameView,
        numPlayers: 2,
        debug: true,
        multiplayer: SocketIO({ server: "localhost:8000" })
    }
);