/* --- DOM elements --- */
const rollDiv = document.querySelector('.roll-dice');
const btnGroup = rollDiv.querySelector('.btn-group');

setupChoices();

/* --- Functions ---- */
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

function updateModal(header, inPlay) {
    /* -- adding question to header -- */
    rollDiv.querySelector('.headerTxt').textContent = header;

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
