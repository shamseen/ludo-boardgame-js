/* --- DOM elements --- */
const rollDiv = document.querySelector('.roll-dice');
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
    console.log(msg);

    // remove after fade out
    alrt.addEventListener('animationend', (event) => {
        alrt.remove();
    });
}

function notifyPlayers(nType, pColor, spaces) {
    let classClr = 'light';
    let msg = '';

    // setting alert color based on player
    switch (pColor) {
        case 'red': classClr = 'danger'; break;
        case 'green': classClr = 'success'; break;
        case 'blue': classClr = 'primary'; break;
        case 'yellow': classClr = 'warning'; break;
        default: break;
    }

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
            break;
        default: break;
    }
    createAlert(classClr, msg);
}

function setupChoices() {
    // html from bootstrap docs https://getbootstrap.com/docs/5.0/components/button-group/#checkbox-and-radio-button-groups

    rollDiv.querySelector("#rollTxt").innerText = "red player roll";

    rollDiv.querySelector(".headerTxt").innerText = "Player choice";

    for (let i = 0; i < 4; i++) {

        // radio button
        btnGroup.innerHTML +=
            `<input type="radio" class="btn-check" name="btnradio" id="p${i}-btn" autocomplete="off">`;

        // label
        btnGroup.innerHTML +=
            `<label class="btn btn-outline-primary" id="${i}" for="p${i}-btn"> ${i + 1}</label>`;
    }
}

function updateModal(header, inPlay, pColor) {
    /* -- adding question to header -- */
    chooseCard.querySelector('.card-header').textContent = header;

    // resetting colors
    chooseCard.classList.remove();
    cardContent.classList.remove();


    // setting color
    let classClr = 'light';

    switch (pColor) {
        case 'red': classClr = 'danger'; break;
        case 'green': classClr = 'success'; break;
        case 'blue': classClr = 'primary'; break;
        case 'yellow': classClr = 'warning'; break;
        default: break;
    }

    chooseCard.classList.add(`border-${classClr}`);
    cardContent.classList.add(`text-${classClr}`)

    /* -- showing only available pieces -- */
    // clearing old choices
    btnGroup.innerHTML = '';

    // updating available pieces
    inPlay.forEach(p => {

        // radio button
        btnGroup.innerHTML +=
            `<input type="radio" class="btn-check" name="btnradio" id="p${p.id}-btn" autocomplete="off">`;

        // label
        btnGroup.innerHTML +=
            `<label class="btn btn-outline-primary" id="${p.id}" for="p${p.id}-btn"> 
                Space ${p.spaceNum + 1}
            </label>`;
    });
}
