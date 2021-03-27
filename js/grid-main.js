/* --- DOM elements --- */
const modal = document.querySelector('.modal');
const btnGroup = modal.querySelector('.btn-group');

setupCards();

/* --- Functions ---- */
function setupCards() {
    // html from bootstrap docs https://getbootstrap.com/docs/5.0/components/button-group/#checkbox-and-radio-button-groups

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
    modal.classList.remove('show');
    modal.style.display = 'none';
}
