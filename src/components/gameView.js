import { useState } from "react";
import { Switch, Route } from 'react-router-dom';
import { usePubNub } from 'pubnub-react';
import Board from "./board.js";
import AlertToasts from "./alertToasts.js";
import ChoicesPanel from "./choicesPanel.js";
import { SnackbarProvider } from 'notistack';
import "../styles/app.scss";


// takes game state, game metadata, possible moves
export default function GameView({ G, ctx, moves }) {
    /* ---- Multiplayer functionality ---- */
    // const pubnub = usePubNub();

    const [alertData, setAlert] = useState({});
    const alertUsers = (move, pieceId = null, spaces = null) => {
        // trigger <AlertToasts /> useEffect
        moves.setNewMove(move);

        setAlert({
            move: move,
            pieceId: pieceId,
            spaces: spaces
        });
    }

    return (
        <div className="gameView">
            <ChoicesPanel G={G} moves={moves} player={ctx.currentPlayer} alertUsers={alertUsers} />
            <Board G={G} ctx={ctx} moves={moves} alertUsers={alertUsers} />
            <SnackbarProvider maxSnack={5} autoHideDuration={2000}>
                <AlertToasts alertData={alertData} G={G} />
            </SnackbarProvider>
        </div>
    );
}