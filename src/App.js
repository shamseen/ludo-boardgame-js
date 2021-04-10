import { GameClient } from "./gameLogic/gameSetup";
import "./styles/app.scss";

export default function App() {
    return (
        <div className="App">
            <GameClient />
        </div>
    );
}