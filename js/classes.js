/* ---- Class Definitions ---- */
class Player {
    constructor(color, startSp) {
        this.color = color;
        this.startSp = startSp;
        this.onBoard = 0;

        this.pieces = [];
        this.createPieces(); // four pieces
    }

    createPieces() {
        for (let i = 0; i < 4; i++) {
            this.pieces.push(new Piece());
        }
    }
}

class Piece {
    spaceNum = -1; // in base area
    pathLeft = 43; // how far to home stretch

    constructor() {

    }
}