import { useState, useEffect } from "react";
import { GameClient } from "./gameLogic/gameSetup";
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import "./styles/app.scss";

export default function App() {
    const [playerId, setPlayerId] = useState(null);
    const [view, setView] = useState(null);

    useEffect(() => {
        const jsx = playerId !== null ? <GameClient playerID={playerId} /> :
            (<Card>
                <Typography variant="h5" component="h2">
                    Play as:
                </Typography>

                <Button variant="outlined" className='red' onClick={() => setPlayerId('0')}>
                    Player 1
                </Button>
                <Button variant="outlined" className='yellow' onClick={() => setPlayerId('1')}>
                    Player 2
                </Button>
            </Card>);

        // update state
        setView(jsx);

    }, [playerId])
    return (
        <div className="App">
            {view}
            {/* <GameClient /> */}
        </div>
    );
}