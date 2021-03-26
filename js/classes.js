/* ---- Class Definitions ---- */
class Player {
    constructor(color, startSp) {
        this.color = color;
        this.startSp = startSp;

        this.pieces = [];
        this.createPieces(); // four pieces

        // TO DO: define home stretch (array?)
    }

    createPieces() {
        for (let i = 0; i < 4; i++) {
            this.pieces.push(new Piece());
        }
    }
}

class Piece {
    spaceNum = -1; // in base area

    constructor() {

    }
}