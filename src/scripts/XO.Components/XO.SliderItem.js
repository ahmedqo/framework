import XOElement from "./XO.Element.js"

export default class extends XOElement {
    static attributes = {
        src: String,
        change(n, v) {
            switch (n) {
                case "src":
                    this.$.container.style.setProperty("background-image", `url(${v})`);
                    break;
            }
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
            box-sizing: content-box !important;
            flex-shrink: 0;
            width: 100%;
        }
        /* Container */
        #xo-container {
            flex-shrink: 0;
            width: 100%;
            height: 100%;
            background-position: center;
            background-repeat: no-repeat;
            background-size: contain;
            background-color: gray;
            pointer-events: none;
        }
        :host([active])  #xo-container {
            pointer-events: all;
        }
        /* Variables */
            /* Container */
            #xo-container { {{--xo-container}} }
            #xo-container:hover { {{--xo-container-hover}} }
    `

    render() {
        return /*html*/ `
            <main id="xo-container">
                <slot></slot>
            </main>
		`;
    }
}