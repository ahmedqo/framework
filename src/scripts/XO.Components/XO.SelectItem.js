import XOElement from "./XO.Element.js"

export default class extends XOElement {
    static attributes = {
        disabled: String,
        change(n, v) {
            switch (n) {
                case "disabled":
                    if (this.matches("[disabled]")) this.$.container.removeAttribute("href");
                    else this.$.container.href = "";
                    break;
            }
        }
    }

    static properties = {
        value: { default: null, type: String },
        text: { default: null, type: String },
    }

    static callbacks = {
        create() {
            this.text = this.textContent.trim();
            this.value = this.getAttribute("value");
        },
        attach() {
            this.addEventListener("click", e => {
                e.preventDefault();
            });
        },
        detach() {
            this.removeEventListener("click", () => {});
        }
    }

    static styles = `
        :host {
            display: block;
            width: 100%;
            box-sizing: content-box !important;
        }
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
        :host([selected]) #xo-container { 
            background-color: var(--default);
        }
        :host([theme="water"][selected]) #xo-container { 
            background-color: var(--water);
            color: #ffffff;
        }
        :host([theme="water"][selected]) #xo-container:hover { 
            background-color: var(--water);
            color: #ffffff;
        }
        :host([theme="water"]) #xo-container:hover { 
            background-color: var(--waterLight);
        }
        :host([theme="fire"][selected]) #xo-container { 
            background-color: var(--fire);
            color: #ffffff;
        }
        :host([theme="fire"][selected]) #xo-container:hover { 
            background-color: var(--fire);
            color: #ffffff;
        }
        :host([theme="fire"]) #xo-container:hover { 
            background-color: var(--fireLight);
        }
        :host([theme="earth"][selected]) #xo-container { 
            background-color: var(--earth);
            color: #ffffff;
        }
        :host([theme="earth"][selected]) #xo-container:hover { 
            background-color: var(--earth);
            color: #ffffff;
        }
        :host([theme="earth"]) #xo-container:hover { 
            background-color: var(--earthLight);
        }
        :host([theme="forest"][selected]) #xo-container { 
            background-color: var(--forest);
            color: #ffffff;
        }
        :host([theme="forest"][selected]) #xo-container:hover { 
            background-color: var(--forest);
            color: #ffffff;
        }
        :host([theme="forest"]) #xo-container:hover { 
            background-color: var(--forestLight);
        }
        :host([theme="night"][selected]) #xo-container { 
            background-color: var(--night);
            color: #ffffff;
        }
        :host([theme="night"][selected]) #xo-container:hover { 
            background-color: var(--night);
            color: #ffffff;
        }
        :host([theme="night"]) #xo-container:hover { 
            background-color: var(--nightLight);
        }
        #xo-container { 
            display: flex;
            text-decoration: unset;
            padding: 4px 12px;
            font-size: 26px;
            color: #1d1d1d;
            width: 100%
        }
        #xo-container:hover { 
            background-color: var(--defaultLight);
            cursor: pointer;
        }
        /* Variables */
            /* Container */
            #xo-container {
                {{--xo-container}}
            }
            #xo-container:hover {
                {{--xo-container-hover}}
            }
            :host([selected]) #xo-container { 
                {{--xo-container-selected}}
            }
            :host([selected]) #xo-container:hover { 
                {{--xo-container-selected-hover}}
            }
    `

    render() {
        return /*html*/ `
            <a href id="xo-container">
                <slot />
            </a>
        `;
    }
}