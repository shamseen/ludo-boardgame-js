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
        sp.innerText = `Space ${i}`;
        sp.id = i;

        path.push(sp);
    }
}

function layoutPath() {
    // making the divs
    fillPath();

    /*  assigning them to grids (see wireframe) */

    // first half of arm1
    for (let i = 0; i < pathLength; i++) {

        // first half of arm1
        if (i < 5) {
        arm1.appendChild(path[i]);
        }

        // arm2 is weird
        else if (i < 10) {
            arm2.prepend(path[i]);
        }
        else if (i < 16) {
            arm2.appendChild(path[i])
        }

        // arm 3
        else if (i < 23) {
            // first half
            arm3.append(path[i]);

            // second half
        } else if (i < 27) {
            arm3.insertBefore(path[i], path[i - 1]);
        } 

        // arm4 is also weird
        else if (i < 32) {
            arm4.append(path[i]);
        }
        else if (i < 38) {
            arm4.prepend(path[i]);
        }

        // second half of arm1
        else if (i < 39) {
            arm1.appendChild(path[i]);
        }

        else {
            arm1.insertBefore(path[i], path[i - 1]);
        }

    }
}