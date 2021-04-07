import Space from "./space";
import "../styles/board.scss";


export default function Board({ game }) {
    // TO DO: render board (css grid?)
    return (
        <div className="board">
            <div className="base-red"></div>
            <div className="base-yellow"></div>
            <div className="base-blue"></div>
            <div className="base-green"></div>

            {/* <!-- player path --> */}
            <div className="arm-1">
                <div className="home-red" id="redLn">
                    <div className="homeLn-container"></div>
                </div>
            </div>
            <div className="arm-2">
                <div className="home-yellow" id="yellowLn">
                    <div className="homeLn-lane-container"></div>
                </div>
            </div>
            <div className="arm-3">
                <div className="home-green" id="greenLn">
                    <div className="homeLn-container"></div>
                </div>
            </div>
            <div className="arm-4">
                <div className="home-blue" id="blueLn">
                    <div className="homeLn-container"></div>
                </div>
            </div>
            <div className="home">
                <div className="roll-dice">
                    <button className="btn" id="collapsed">
                        <div id="rollTxt">Roll dice!</div>
                    </button>
                </div>
            </div>
        </div>
    );
}