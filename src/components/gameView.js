// import { useState, useEffect } from "react";
import Board from "./board.js";
// import AlertToasts from "./alertToasts.js";
import ChoicesPanel from "./choicesPanel.js";
import "../styles/app.scss";


// takes game state, game metadata, possible moves
export default function GameView({ G, ctx, moves }) {
    return (
        <div className="gameView">
            <ChoicesPanel G={G} moves={moves} />
            <Board G={G} ctx={ctx} moves={moves} />
            {/* <AlertToasts/> */}
        </div>
    )
}