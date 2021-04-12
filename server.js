// const Server = require("boardgame.io/server").Server;
// const Client = require("./gameLogic/gameSetup").GameClient;
// const server = Server({ games: [Client] });
// server.run(8000);

const Server = require('boardgame.io/server').Server;
const Ludo = require('./src/gameLogic/gameSetup').Ludo;

const server = Server({ games: [Ludo] });

server.run(8000);