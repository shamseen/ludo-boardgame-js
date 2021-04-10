// import "../styles/choicesModal.scss";

export default function ChoiceCard({ G, pieces }) {

    return (
        <div className="card bg-danger" id="chooseCard">
            <div className="card-header">Which piece should move {G.roll.sum} spaces?</div>
            <div className="card card-content">
                {/* <!-- src: https://getbootstrap.com/docs/4.0/components/buttons/#checkbox-and-radio-buttons --> */}
                <div className="btn-group" role="group">
                    {pieces.map(p => {
                        return (
                            <div key={p}>
                                <input type="radio" className="btn-check" name="btnradio" id={p} autocomplete="off" />
                                <label className="btn btn-outline-primary" id={p} for={p}>
                                    Space {G.currentPlayer.pieces[p] + 1}
                                </label>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )

}