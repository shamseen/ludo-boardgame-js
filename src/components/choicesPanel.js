import { useState, useEffect } from "react";
import { canPlayerChoose } from "../gameLogic/gameLogic.js";
import ChoiceCard from "./choiceCard.js";

export default function ChoicesPanel({ G, moves, player }) {
    const [modalData, setModalData] = useState(false);

    useEffect(() => {
        console.log('changed players')

        if (!G.canMovePieces) {
            console.log("can't move pieces"); return null
        }

        setModalData(canPlayerChoose(G, moves));

    }, [player, G.canMovePieces]);

    return (
        <div id="choosePieces">

            {modalData.show ? <ChoiceCard G={G} pieces={modalData.pieces} /> : ''}

            <div className="card" id="chooseCard">
                <div className="card-header">Choose</div>
                <div className="card card-content">
                    {/* <!-- src: https://getbootstrap.com/docs/4.0/components/buttons/#checkbox-and-radio-buttons --> */}
                    <div
                        className="btn-group"
                        role="group"
                    ></div>
                </div>
            </div>

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