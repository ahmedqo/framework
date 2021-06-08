import XOElement from "./XO.Element.js"

export default class extends XOElement {
    static properties = {
        value: { default: 0, type: Number },
        change(n, v) {
            switch (n) {
                case "value":
                    if (v >= 100) {
                        this.$.container.style.setProperty('--width', "100%");
                        this.$.label.innerText = "100%";
                        var event = new CustomEvent("complete", {
                            bubbles: true,
                            cancelable: true,
                        })
                        this.dispatchEvent(event);
                    }
                    if (v <= 0) {
                        this.$.container.style.setProperty('--width', "0%");
                        this.$.label.innerText = "0%";
                        var event = new CustomEvent("start", {
                            bubbles: true,
                            cancelable: true,
                        })
                        this.dispatchEvent(event);
                    }
                    if (v > -1 && v < 101) {
                        this.$.container.style.setProperty('--width', v + "%");
                        this.$.label.innerText = v + "%";
                        var event = new CustomEvent("progress", {
                            bubbles: true,
                            cancelable: true,
                        })
                        this.dispatchEvent(event);
                    }
                    break;
            }
        }
    }

    static callbacks = {
        create() {
            this.value = 0;
            if (this.getAttribute("value")) {
                this.value = this.getAttribute("value");
                this.removeAttribute("value");
            }
        },
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
            display: block;
            box-sizing: content-box !important;
            width: 100%;
            height: 34px;
        }
        /* Container */
        :host([theme="water"]) #xo-container {
            background: var(--waterLight);
        }
        :host([theme="fire"]) #xo-container {
            background: var(--fireLight);
        }
        :host([theme="earth"]) #xo-container {
            background: var(--earthLight);
        }
        :host([theme="forest"]) #xo-container {
            background: var(--forestLight);
        }
        :host([theme="night"]) #xo-container {
            background: var(--nightLight);
        }
        :host([theme="water"]) #xo-container,
        :host([theme="fire"]) #xo-container,
        :host([theme="forest"]) #xo-container,
        :host([theme="night"]) #xo-container {
            color: #fff;
        }
        :host([theme="water"]) #xo-container::before {
            background: var(--water);
        }
        :host([theme="fire"]) #xo-container::before {
            background: var(--fire);
        }
        :host([theme="earth"]) #xo-container::before {
            background: var(--earth);
        }
        :host([theme="forest"]) #xo-container::before {
            background: var(--forest);
        }
        :host([theme="night"]) #xo-container::before {
            background: var(--night);
        }
        #xo-container {
            width: 100%;
            background: var(--defaultLight);
            height: 100%;
            border-radius: 5px;
            color: #1d1d1d;
            position: relative;
            --width: 0;
        }
        #xo-container::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: var(--width);
            height: 100%;
            background: var(--default);
            border-radius: 5px;
            transition: width 0.3s ease-in-out
        }
        /* Label */
        #xo-label {
            display: flex;
            width: 100%;
            height: 100%;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            position: absolute;
            top: 0;
            left: 0;
        }
        /* Variables */
            /* Container */
            #xo-container {
                {{--xo-container}}
            }
            #xo-container:hover {
                {{--xo-container-hover}}
            }
            #xo-container::before {
                {{--xo-container-progress}}
            }
            #xo-container:hover::before {
                {{--xo-container-progress-hover}}
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
                <label id="xo-label"></label>
            </main>
        `;
    }
}