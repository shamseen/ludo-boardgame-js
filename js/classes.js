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

    getFilteredPieces(loc) {
        switch (loc) {
            case 'base':
                return this.pieces.filter(p => p.inBase);
            case 'home':
                return this.pieces.filter(p => p.inHome);
            case 'play':
                return this.pieces.filter(p => !p.inBase && !p.inHome);
            default: break;
        }
    }

    getRandomPiece(loc) {
        const p = this.getFilteredPieces(loc);

        // if only piece, return it; otherwise random
        const i = p.length === 1 ? 0 : Math.floor(Math.random() * p.length);

        // if no pieces, return undefined
        return p.length === 0 ? undefined : p[i];
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