import XOElement from "./XO.Element.js"

export default class extends XOElement {
    static callbacks = {
        create() {
            if (this.query("slot").assignedElements().length === 0) {
                this.$.icon.innerHTML = this.innerText[0] + "<slot name='icon'></slot>";
            }
            this.$.icon.style.background = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
            this.innerHTML = this.innerHTML.trim();
        },
        attach() {
            this.addEventListener("DOMSubtreeModified", () => {
                if (this.query("slot").assignedElements().length === 0) {
                    this.$.icon.innerHTML = this.innerText[0] + "<slot name='icon'></slot>";
                }
            });
        },
        detach() {
            this.removeEventListener("DOMSubtreeModified", () => {});
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
            display: inline-block;
        }
        /* Container */
        :host([theme="water"]) #xo-container {
            background: var(--water);
        }
        :host([theme="fire"]) #xo-container {
            background: var(--fire);
        }
        :host([theme="earth"]) #xo-container {
            background: var(--earth);
        }
        :host([theme="forest"]) #xo-container {
            background: var(--forest);
        }
        :host([theme="night"]) #xo-container {
            background: var(--night);
        }
        #xo-container {
            box-sizing: border-box;
            width: 100%;
            height: 100%;
            padding: 10px;
            cursor: pointer;
            overflow: hidden;
            flex-wrap: nowrap;
            border-radius: 5px;
            align-items: center;
            display: inline-flex;
            justify-content: space-between;
            background-color: var(--default);
            transition: transform .3s ease-in-out, box-shadow .3s ease-in-out;
        } 
        #xo-container:hover {
            box-shadow: 0 0 3px 3px #40404033;
            transform: scale(1.03);
        }
        /* Icon */
        #xo-icon {
            display: flex;
            width: 60px !important;
            height: 60px !important;
            overflow: hidden;
            border-radius: 50%;
            font-size: 40px;
            align-items: center;
            justify-content: center;
            color: #ffffff;
        }
        /* Label */
        :host([theme="water"]) #xo-label,
        :host([theme="fire"]) #xo-label,
        :host([theme="forest"]) #xo-label,
        :host([theme="night"]) #xo-label {
            color: #fff;
        }
        #xo-label {
            flex: 1;
            margin-left: 10px;
            display: block;
            font-size: 24px;
            font-weight: 600;
            text-align: center;
        }
        /* Variables */
            /* Container */
            #xo-container {
                {{--xo-container}}
            }
            #xo-container:hover {
                {{--xo-container-hover}}
            }
            /* Icon */
            #xo-icon {
                {{--xo-icon}}
            }
            #xo-icon:hover {
                {{--xo-icon-hover}}
            }
            /* Label */
            #xo-label {
                {{--xo-label}}
            }
            #xo-label:hover {
                {{--xo-label-hover}}
            }
    `

    render() {
        return /*html*/ `
            <main id="xo-container">
                <span id="xo-icon">
                    <slot name="icon"></slot>
                </span>
                <label id="xo-label">
                    <slot></slot>
                </label>
            </main>
		`;
    }
}