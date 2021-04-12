
import { useEffect, useState } from "react";

import { useSnackbar } from 'notistack';

export default function SimpleSnackbar({ G, alertData }) {
    // const [msg, setMsg] = useState(undefined);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    // setting alert message based on move just played
    useEffect(() => {

        let msg = `${G.currentPlayer.color} player `;
        switch (alertData.move) {
            case 'roll':
                msg += `rolled ${G.roll.A} and ${G.roll.B}`;
                break;
            case 'start':
                msg += `added a piece to the board`;
                break;
            case 'moved':
                const oldSp = G.currentPlayer.pieces[alertData.pieceId];
                msg += `moved a piece from space ${oldSp} to space ${oldSp + alertData.spaces}`;
                break;
            case undefined: return;
            default:
                console.log(`move ${alertData.move} doesn't exist!`);
                return;
        }

        // add new notif to queue
        enqueueSnackbar(msg);

    }, [G.moveTrigger])

    return (
        <div></div>
    );
}