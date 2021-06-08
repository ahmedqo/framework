import XOElement from "./XO.Element.js"

var zindex = 0;

export default class extends XOElement {
    static callbacks = {
        attach() {
            var pos1 = 0,
                pos2 = 0,
                pos3 = 0,
                pos4 = 0;
            this.addEventListener("mousedown", e => {
                pos3 = e.clientX;
                pos4 = e.clientY;
                document.onmouseup = () => {
                    document.onmouseup = null;
                    document.onmousemove = null;
                    this.query("slot").style.pointerEvents = "";
                };
                document.onmousemove = e => {
                    this.query("slot").style.pointerEvents = "none";
                    pos1 = pos3 - e.clientX;
                    pos2 = pos4 - e.clientY;
                    pos3 = e.clientX;
                    pos4 = e.clientY;
                    this.style.top = (this.offsetTop - pos2) + "px";
                    this.style.left = (this.offsetLeft - pos1) + "px";
                };
            });
            this.addEventListener("click", () => {
                zindex++;
                this.style.zIndex = zindex;
            });
        },
        detach() {
            this.removeEventListener("mousedown", () => {});
            this.removeEventListener("click", () => {});
        }
    }

    static styles = `
        /* Globals */
        * {
            font-family: Arial, sans-serif;
            box-sizing: border-box;
        }
        /* Element */
        :host {
            display: block;
            width: max-content;
            height: max-content;
            position: absolute;
            box-sizing: content-box !important;
            background: white;
        }
        slot:hover {
            cursor: move;
        }
    `

    render() {
        return /*html*/ `
            <slot></slot>
        `;
    }
}