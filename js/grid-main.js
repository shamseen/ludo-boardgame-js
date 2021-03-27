/* --- DOM elements --- */
const rollBtn = document.querySelector('.roll-dice');
const btnGroup = rollBtn.querySelector('.btn-group');

setupChoices();

/* --- Functions ---- */
function setupChoices() {
    // html from bootstrap docs https://getbootstrap.com/docs/5.0/components/button-group/#checkbox-and-radio-button-groups

    rollBtn.querySelector("#rollTxt").innerText = "red player roll";

    rollBtn.querySelector(".headerTxt").innerText = "Which piece should enter play?";

    for (let i = 0; i < 4; i++) {

        // radio button
        btnGroup.innerHTML +=
            `<input type="radio" class="btn-check" name="btnradio" id="${i + 1}" autocomplete="off">`;

        // label
        btnGroup.innerHTML +=
            `<label class="btn btn-outline-primary" id="${i}" for="${i + 1}"> ${i + 1}</label>`;
    }
}
