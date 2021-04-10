import { useState, useEffect, createContext } from "react";
import ChoicesModal from "./choicesModal.js";

export default function ChoicesPanel({ G, moves, player }) {
    useEffect(() => {
        console.log('changed players')
        if (!G.canMovePieces) {
            console.log("can't move pieces"); return null
        }

        const basePiece = getFilteredPieces('base');
        console.log('base piece - ' + basePiece)
        if (G.roll.hasSix && basePiece > -1) {
            console.log('needs to move to start')
            moves.moveToStart(basePiece);
            // moves.movePiece(basePiece);
        }
    }, [player, G.canMovePieces])


    function getFilteredPieces(loc) {
        switch (loc) {
            case 'base':
                // piece w space num -1 is in base
                return G.currentPlayer.pieces.findIndex(p => p === -1);
            case 'home':
                // piece w space num 50 has left the board
                return this.pieces.findIndex(p => p === 50);
            case 'play':
                return this.pieces.filter(p => p < 44 && p > -1);
            default: break;
        }

        return filtered;
    }

    return (
        <div id="choosePieces">
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
            <div className="card" id="rollA">
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
            </div>
        </div>
    )
}