import { useState } from "react";
import Board from "./board.js";
import AlertToasts from "./alertToasts.js";
import ChoicesPanel from "./choicesPanel.js";
import { SnackbarProvider } from 'notistack';
import "../styles/app.scss";


// takes game state, game metadata, possible moves
export default function GameView({ G, ctx, moves }) {
    const [alertData, setAlert] = useState({});

    const alertUsers = (move, pieceId = null, spaces = null) => {
        // trigger <AlertToasts /> useEffect
        moves.setNewMove(move);

        setAlert({
            move: move,
            pieceId: pieceId,
            spaces: spaces
        });

        console.log(' new move =======================');
    }
    return (
        <div className="gameView">
            <ChoicesPanel G={G} moves={moves} player={ctx.currentPlayer} alertUsers={alertUsers} />
            <Board G={G} ctx={ctx} moves={moves} alertUsers={alertUsers} />
            <SnackbarProvider maxSnack={5}>
                <AlertToasts alertData={alertData} G={G} />
            </SnackbarProvider>
        </div>
    )
}