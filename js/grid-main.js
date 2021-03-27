/* --- DOM elements --- */
const rollBtn = document.querySelector('.roll-dice');
const btnGroup = rollBtn.querySelector('.btn-group');

setupChoices();

/* --- Functions ---- */
function setupChoices() {
    // html from bootstrap docs https://getbootstrap.com/docs/5.0/components/button-group/#checkbox-and-radio-button-groups

    rollBtn.querySelector("#rollTxt").innerText = "red player roll";

    rollBtn.querySelector(".headerTxt").innerText = "Choose piece";

    for (let i = 0; i < 4; i++) {

        // radio button
        btnGroup.innerHTML +=
            `<input type="radio" class="btn-check" name="btnradio" id="${i}" autocomplete="off">`;

        // label
        btnGroup.innerHTML +=
            `<label class="btn btn-outline-primary" for="${i}"> ${i + 1}</label>`;
    }
}

function closeModal() {
    // rollDice.classList.toggle("closed");
    // modalOverlay.classList.toggle("closed");
}
