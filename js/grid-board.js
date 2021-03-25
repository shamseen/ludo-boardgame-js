console.log('grid script linked');

/* ---- Global Vars ---- */
// number of spaces
const homeLane = 4;
const pathLength = 44;

/* ---- DOM Elements ---- */
const arm1 = document.querySelector('.arm-1');
const arm2 = document.querySelector('.arm-2');
const path = new Array();
layoutPath();

function fillPath() {
    for (let i = 0; i < pathLength; i++) {
        const sp = document.createElement('div');
        sp.className = 'space';
        sp.innerText = `Space ${i + 1}`;
        sp.id = i + 1;

        path.push(sp);
    }
}

function layoutPath() {
    // making the divs
    fillPath();

    // assigning them to grids (see wireframe)
    for (let i = 0; i < homeLane + 1; i++) {
        arm1.appendChild(path[i]);
    }
}