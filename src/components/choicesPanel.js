import { useState, useEffect } from "react";
import { canPlayerChoose } from "../gameLogic/gameLogic.js";
import ChoiceCard from "./choiceCard.js";

export default function ChoicesPanel({ G, moves, player, alertUsers }) {
    const [modalData, setModalData] = useState(false);

    useEffect(() => {
        console.log('changed players')

        if (!G.canMovePieces) {
            console.log("can't move pieces"); return null
        }

        setModalData(canPlayerChoose(G, moves));
        
        if (modalData.move === 'start') {
            alertUsers('start')
        }

    }, [player, G.canMovePieces]);

    const buttonClicked = (event, pieceId) => {
        alertUsers('moved', pieceId, G.roll.sum);
        moves.movePiece(pieceId, G.roll.sum);
        setModalData({
            show: false,
            pieces: []
        });
    }

    return (
        <div id="choosePieces" className="choosePieces">

            {modalData.show ? <ChoiceCard G={G} pieces={modalData.pieces} clicked={buttonClicked} /> : ''}

            {/* <!-- TO DO: Split roll --> */}
            {/* <div className="card" id="rollA">
                <div className="card-header">Which piece should move {G.roll.A} spaces?</div>
                <ul className="list-group list-group-horizontal">
                    <a className="list-group-item list-group-item-action">Action item</a>
                    <a className="list-group-item list-group-item-action">Action item</a>
                    <a className="list-group-item list-group-item-action">Action item</a>
                </ul>
            </div>

            <div className="card" id="rollB">
                <div className="card-header">Which piece should move {G.roll.B} spaces?</div>
                <ul className="list-group list-group-flush">
                    <a className="list-group-item list-group-item-action">Action item</a>
                    <a className="list-group-item list-group-item-action">Action item</a>
                    <a className="list-group-item list-group-item-action">Action item</a>
                </ul>
            </div> */}
        </div>
    )
}