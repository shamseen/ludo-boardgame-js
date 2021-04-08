import { useState, useEffect } from "react";
import { BoardRegion } from "./boardRegion";
import "../styles/board.scss";


// takes game state, game metadata, possible moves
export default function Board({ G, ctx, moves }) {

    // setting up each segment of path
    const [segmentProps, setSegmentProps] = useState([]);

    /* --- Populating pathArms --- */
    useEffect(() => {
        makeBoard();
    }, []);

    // warning - this layout is WEIRD.
    const makeBoard = () => {
        // temp obj for state
        const regions = [
            {
                arm: 'arm-1',
                path: [],
                color: 'red',
                home: []
            },
            {
                arm: 'arm-2',
                path: [],
                color: 'yellow',
                home: []
            },
            {
                arm: 'arm-3',
                path: [],
                color: 'green',
                home: []
            },
            {
                arm: 'arm-4',
                path: [],
                color: 'blue',
                home: []
            }
        ];
        // TODO: link spaces to G.spaces, add home spaces
        /* -- Adding & assigning spaces to segments -- */
        let arm = '';
        let addTo = '';
        for (let i = 0; i < G.spaces.length; i++) {
            // new space for board
            const spaceDiv = <div className="space path" id={i} key={i}></div>;

            /*  assigning spaces to grids (see wireframe) */
            // first half of arm1
            if (i < 5) {
                arm = 1;
                addTo = 'end';
            }

            // arm2 is weird
            else if (i < 10) {
                arm = 2;
                addTo = 'start'
            }
            else if (i < 16) {
                arm = 2;
                addTo = 'end';
            }

            // arm 3
            else if (i < 23) {
                // first half
                arm = 3;
                addTo = 'end';

                // second half
            } else if (i < 27) {
                arm = 3;
                addTo = 'middle';
            }

            // arm4 is also weird
            else if (i < 32) {
                arm = 4;
                addTo = 'end';

            }
            else if (i < 38) {
                arm = 4;
                addTo = 'start';
            }

            // second half of arm1
            else if (i < 39) {
                arm = 1;
                addTo = 'end';
            }

            else {
                arm = 1;
                addTo = 'middle';
            }

            // storing layout
            switch (addTo) {
                case 'start':
                    regions[arm - 1].path.unshift(spaceDiv);
                    break;
                case 'end':
                    regions[arm - 1].path.push(spaceDiv);
                    break;
                case "middle":
                    regions[arm - 1].path.splice(i, 0, spaceDiv);
                    break;
            }
        }

        /* --- Updating state with child components --- */
        setSegmentProps([...regions]);
    }

    return (
        <div className="board">

            {/* <!-- player base --> */}
            <div className="base-red"></div>
            <div className="base-yellow"></div>
            <div className="base-blue"></div>
            <div className="base-green"></div>

            {/* <!-- player path --> */}
            {segmentProps.map((p, i) => {
                return <BoardRegion key={i} region={p} />;
            })}

            {/* <!-- win space + dice btn --> */}
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