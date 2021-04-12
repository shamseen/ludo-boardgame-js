const Server = require("boardgame.io/server").Server;
const Client = require("./gameLogic/gameSetup").GameClient;
const server = Server({ games: [Client] });
server.run(8000);