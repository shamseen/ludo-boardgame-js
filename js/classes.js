/* ---- Class Definitions ---- */
class Player {
    constructor(color, startSp) {
        this.color = color;
        this.startSp = startSp;

        this.pieces = [];
        this.createPieces(); // four pieces

    }

    createPieces() {
        for (let i = 0; i < 4; i++) {
            this.pieces.push(new Piece());
        }
    }

    status(loc) {
        switch (loc) {
            case 'base':
                return this.pieces.filter(p => p.inBase).length;
            case 'home':
                return this.pieces.filter(p => p.inHome).length;
            case 'play':
                return this.pieces.filter(p => !p.inBase && !p.inHome).length;
            default: break;
        }
    }
}

class Piece {
    spaceNum = -1; // in base area
    pathLeft = 43; // how far to home stretch
    inBase = true;
    inHome = false;
    constructor() {

    }
}