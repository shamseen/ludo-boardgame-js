/* Using Google web components docs
https://developers.google.com/web/fundamentals/web-components/customelements#define */



/* ---- 1/4th of the outer ring of spaces, 2 corners ---- */
class PathLeg extends HTMLElement {

    // attribute is changed
    attributeChangedCallback(attrName, oldVal, newVal) {

    }

    // when instance is inserted into the dom
    connectedCallback() {
        this.createSpaces();
    }

    // when removed from dom
    disconnectedCallback() {

    }

    createSpaces() {
        for (let i = 0; i < 11; i++) {
            const sp = document.createElement('div');
            sp.className = 'space';
            sp.innerText = `A square ${i}`;
            this.appendChild(sp);
        }
    }
}

window.customElements.define('path-leg', PathLeg);