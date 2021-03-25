console.log('grid script linked');

/* ---- Global Vars ---- */
// number of spaces
const homeLane = 4;
const pathLength = 44;

/* ---- DOM Elements ---- */
const arm1 = document.querySelector('.arm-1');
const arm2 = document.querySelector('.arm-2');
const arm3 = document.querySelector('.arm-3');
const arm4 = document.querySelector('.arm-4');
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

    /*  assigning them to grids (see wireframe) */

    // first half of arm1
    for (let i = 0; i < homeLane + 1; i++) {
        arm1.appendChild(path[i]);
    }

    // TO DO: wrap-reverse arm2
    for (let i = 5; i < 16; i++) {
        arm2.appendChild(path[i]);
    }

    // AYYY ARM3 WORKS
    for (let i = 16; i < 27; i++) {
        arm3.appendChild(path[i]);
    }

    // TO DO: wrap-reverse arm4
    for (let i = 27; i < 38; i++) {
        arm4.appendChild(path[i]);
    }

    // TO DO: wrap-reverse second half arm1
    for (let i = 38; i < pathLength; i++) {
        arm1.appendChild(path[i]);
    }
}