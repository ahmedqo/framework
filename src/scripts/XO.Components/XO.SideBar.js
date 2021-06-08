import XOElement from "./XO.Element.js"

export default class extends XOElement {
    static attributes = {
        shrink: Boolean,
        change(n) {
            switch (n) {
                case "shrink":
                    if (this.matches("[shrink]"))
                        this.style.setProperty("width", "45px");
                    else
                        this.style.setProperty("width", "200px");
                    break;
            }
        }
    }

    static callbacks = {
        attach() {
            if (!this.querySelector("[trigger]")) return;
            setTimeout(() => {
                this.querySelector("[trigger]").addEventListener("click", () => {
                    if (this.style.width === "45px") {
                        this.removeAttribute("shrink");
                        var event = new CustomEvent("grow", {
                            bubbles: true,
                            cancelable: true,
                        });
                        this.dispatchEvent(event);
                    } else {
                        this.setAttribute("shrink", "");
                        var event = new CustomEvent("shrink", {
                            bubbles: true,
                            cancelable: true,
                        });
                        this.dispatchEvent(event);
                    }
                });
            }, 100)
        },
        detach() {
            if (!this.querySelector("[trigger]")) return;
            this.querySelector("[trigger]").removeEventListener("click", () => {});
        }
    }

    static styles = `
        /* Globals */
        * {
            font-family: Arial, sans-serif;
            box-sizing: border-box;
            --default: #ecf0f1;
            --water: #3498db;
            --fire: #e74c3c;
            --earth: #f1c40f;
            --forest: #2ecc71;
            --night: #34495e;
            --defaultLight: #f8f9f9;
            --waterLight: #ebf5fb;
            --fireLight: #fdedec;
            --earthLight: #fef9e7;
            --forestLight: #eafaf1;
            --nightLight: #ebedef;
            --defaultDark: #979a9a;
            --waterDark: #21618c;
            --fireDark: #943126;
            --earthDark: #9a7d0a;
            --forestDark: #1d8348;
            --nightDark: #212f3c;
        }
        /* Element */
        :host {
            width: 200px;
            display: block;
            box-sizing: content-box !important;
            overflow: hidden;
            transition: width 0.3s ease-in-out;
            overflow-y: auto;
            background: repeating-linear-gradient(45deg, var(--default), var(--defaultLight) 8%);
        }
        :host([theme="water"]) {
            background: repeating-linear-gradient(45deg, var(--water), var(--waterLight) 8%);
        }
        :host([theme="fire"]) {
            background: repeating-linear-gradient(45deg, var(--fire), var(--fireLight) 8%);
        }
        :host([theme="earth"]) {
            background: repeating-linear-gradient(45deg, var(--earth), var(--earthLight) 8%);
        }
        :host([theme="forest"]) {
            background: repeating-linear-gradient(45deg, var(--forest), var(--forestLight) 8%);
        }
        :host([theme="night"]) {
            background: repeating-linear-gradient(45deg, var(--night), var(--nightLight) 8%);
        }
        /* Container */
        #xo-container {
            height: 100vh;
            width: 200px;
            box-sizing: border-box;
        }
        /* Variables */
            /* Container */
            #xo-container {
                {{--xo-container}}
            }
            #xo-container:hover {
                {{--xo-container-hover}}
            }
    `

    render() {
        return /*html*/ `
            <main id="xo-container">
                <slot />
            </main>
        `;
    }
}