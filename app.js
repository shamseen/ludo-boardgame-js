/* ---- Global Variables ---- */
const whiteSpaces = 44; // total num before home stretch
const players = {
    R: new Player('red', 0),
    G: new Player('green', whiteSpaces * (1 / 4)),
    B: new Player('blue', whiteSpaces * (2 / 4)),
    Y: new Player('yellow', whiteSpaces * (3 / 4))
}

/* ---- Functions ---- */
const prettyPrint = (obj) => {
    console.log(JSON.stringify(obj, null, 4));
}
