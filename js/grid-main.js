/* --- DOM elements --- */
const rollDiv = document.querySelector('.roll-dice');
const rollBtn = rollDiv.querySelector('button');
const chooseCard = document.querySelector('#chooseCard');
const cardContent = chooseCard.querySelector('.card-content');
const btnGroup = chooseCard.querySelector('.btn-group');
const alerts = document.querySelector('.alerts-container')

/* --- Functions ---- */
function createAlert(classClr, msg) {
    const alrt = document.createElement('div');

    alrt.classList = [`alert alert-${classClr} fade show`];
    alrt.setAttribute('role', 'alert');
    alrt.innerText = msg;

    alerts.append(alrt);

    // remove after fade out
    alrt.addEventListener('animationend', (event) => {
        alrt.remove();
    });
}

function notifyPlayers(nType, classClr, spaces) {
    let msg = '';

    // setting msg based on type of notification
    switch (nType) {
        case 'moved':
            msg += ` moved ${spaces} spaces`;
            break;
        case 'added':
            msg += ` put a piece on the board!`;
            break;
        case 'roll':
            msg += ` rolled ${spaces.A} & ${spaces.B}`;
            break;
        case 'home':
            msg += `'s piece entered the home stretch!`;
            break;
        case 'reset': // blank out alert
            msg = '';
            classClr = "light";
            return;
        default: break;
    }
    createAlert(classClr, msg);
}

function setupChoices() {
    // html from bootstrap docs https://getbootstrap.com/docs/5.0/components/button-group/#checkbox-and-radio-button-groups

    for (let i = 0; i < 4; i++) {

        // radio button
        btnGroup.innerHTML +=
            `<input type="radio" class="btn-check" name="btnradio" id="${i}" autocomplete="off">`;

        // label
        btnGroup.innerHTML +=
            `<label class="btn btn-outline-primary" id="${i}" for="${i}"> ${i + 1}</label>`;
    }
}

function updateBtnColor(classClr) {

    rollBtn.className = `btn btn-${classClr}`;

}

function updateModal(header, inPlay, pColor) {
    /* -- adding question to header -- */
    chooseCard.querySelector('.card-header').textContent = header;

    // setting color
    let classClr = 'light';

    switch (pColor) {
        case 'red': classClr = 'danger'; break;
        case 'green': classClr = 'success'; break;
        case 'blue': classClr = 'primary'; break;
        case 'yellow': classClr = 'warning'; break;
        default: break;
    }

    chooseCard.className = `card bg-${classClr}`;

    /* -- showing only available pieces -- */
    // clearing old choices
    btnGroup.innerHTML = '';

    // updating available pieces
    inPlay.forEach(p => {

        // radio button
        btnGroup.innerHTML +=
            `<input type="radio" class="btn-check" name="btnradio" id="${p.id}" autocomplete="off">`;

        // label
        btnGroup.innerHTML +=
            `<label class="btn btn-outline-primary" id="${p.id}" for="${p.id}">
                Space ${p.spaceNum + 1}
            </label>`;
    });
}
