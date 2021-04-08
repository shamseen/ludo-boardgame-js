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
            this.pieces.push(new Piece(i));
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

    getPieceBySpace(space) {
        return this.pieces.find(p => {
            p.spaceNum === space;
        })
    }

    getRandomPiece(loc) {
        const p = this.getFilteredPieces(loc);

        // if only piece, return it; otherwise random
        const i = p.length === 1 ? 0 : Math.floor(Math.random() * p.length);

        // if no pieces, return undefined
        return p.length === 0 ? undefined : p[i];
    }

    getThemeColor() {
        let theme = '';
        switch (this.color) {
            case 'red': theme = 'danger'; break;
            case 'green': theme = 'success'; break;
            case 'blue': theme = 'primary'; break;
            case 'yellow': theme = 'warning'; break;
            default: break;
        }

        return theme;
    }
}

class Piece {

    constructor(id) {
        this.id = id;

        this.spaceNum = -1; // in base area
        this.pathLeft = 43; // how far to home stretch
        this.inBase = true;
        this.inHome = false;
    }
}

/* --- Variables/Objects --- */
const pathLength = 44;

export const PlayersEnum = Object.freeze(
    {
        R: new Player('red', 0),
        Y: new Player('yellow', pathLength * (1 / 4)),
        G: new Player('green', pathLength * (2 / 4)),
        B: new Player('blue', pathLength * (3 / 4))
    }
);