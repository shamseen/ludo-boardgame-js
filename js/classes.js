/* ---- Class Definitions ---- */
class Player {
    constructor(color, baseNum) {
        this.color = color;
        this.baseNum = baseNum;

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
    spaceNum = 0; // in base area

    constructor() {

    }
}