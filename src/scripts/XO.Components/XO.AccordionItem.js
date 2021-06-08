import XOElement from "./XO.Element.js"

export default class extends XOElement {
    static attributes = {
        header: String,
        shrink: String,
        change(n, v) {
            switch (n) {
                case "header":
                    this.$.label.innerText = v;
                    break;
                case "shrink":
                    if (this.$.content.style.height === "0px") {
                        this.$.content.style.height = this.height;
                        this.$.content.style.paddingTop = "";
                        this.$.content.style.paddingBottom = "";
                        this.$.icon.style.transform = "rotate(180deg)";
                    } else {
                        this.$.content.style.height = "0px";
                        this.$.content.style.paddingTop = "0px";
                        this.$.content.style.paddingBottom = "0px";
                        this.$.icon.style.transform = "rotate(0)";
                    }
                    break;
            }
        }
    }

    static callbacks = {
        create() {
            this.height = window.getComputedStyle(this.$.content).height;
            var observer = new MutationObserver(() => {
                this.$.content.style.height = "";
                this.height = window.getComputedStyle(this.$.content).height;
                if (this.matches("[shrink]")) {
                    this.$.content.style.height = "0px";
                }
            });
            observer.observe(this, {
                childList: true
            });
        },
        attach() {
            this.$.header.addEventListener("click", () => {
                if (this.$.content.style.height === "0px") {
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
        },
        detach() {
            this.$.header.removeEventListener("click", () => {});
        }
    }

    static styles = `
        /* Globals */
        #xo-icon {
            all: unset;
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
        /* Element */
        :host {
            display: block;
            width: 100%;
            box-sizing: content-box !important;
        }
        /* Header */
        :host([theme="water"]) #xo-header {
            background: var(--water);
        }
        :host([theme="fire"]) #xo-header {
            background: var(--fire);
        }
        :host([theme="earth"]) #xo-header {
            background: var(--earth);
        }
        :host([theme="forest"]) #xo-header {
            background: var(--forest);
        }
        :host([theme="night"]) #xo-header {
            background: var(--night);
        }
        :host([theme="water"]) #xo-header, 
        :host([theme="fire"]) #xo-header,
        :host([theme="forest"]) #xo-header,
        :host([theme="night"]) #xo-header {
            color: #fff;
        }
        #xo-header {
            text-decoration: unset;
            width: 100%;
            display: flex;
            color: #1d1d1d;
            overflow: hidden;
            padding: 8px 10px;
            font-size: 22px;
            position: relative;
            border-radius: 5px;
            align-items: center;
            box-sizing: border-box;
            justify-content: space-between;
            background: var(--default);
        }
        /* Icon */
        :host([theme="water"]) #xo-icon svg, 
        :host([theme="fire"]) #xo-icon svg,
        :host([theme="forest"]) #xo-icon svg,
        :host([theme="night"]) #xo-icon svg {
            fill: #fff;
        }
        #xo-icon {
            transition: transform .3s ease-in-out;
        }
        #xo-icon:focus {
            outline: auto;
        }
        #xo-icon svg {
            display: flex;
            width: 20px;
            height: 20px;
            fill: #1d1d1d;
        }
        /* Content */
        #xo-content {
            font-size: 18px;
            padding: 10px 15px;
            overflow: hidden;
            transition: height 0.3s ease-in-out, padding 0.3s ease-in-out;
        }
        /* Variabales */
            /* Container */
            #xo-container {
                {{--xo-container}}
            }
            #xo-container:hover {
                {{--xo-container-hover}}
            }
            /* Header */
            #xo-header {
                {{--xo-header}}
            }
            #xo-header:hover {
                {{--xo-header-hover}}
            }
            /* Label */
            #xo-label {
                {{--xo-label}}
            }
            #xo-label:hover {
                {{--xo-label-hover}}
            }
            /* Icon */
            #xo-icon {
                {{--xo-icon}}
            }
            #xo-icon:hover {
                {{--xo-icon-hover}}
            }
            #xo-icon svg {
                {{--xo-icon-svg}}
            }
            #xo-icon:hover svg {
                {{--xo-icon-svg-hover}}
            }
            /* Content */
            #xo-content {
                {{--xo-content}}
            }
            #xo-content:hover {
                {{--xo-content-hover}}
            }
    `

    render() {
        return /*html*/ `
            <main id="xo-container">
                <div id="xo-header">
                    <label id="xo-label"></label>
                    <button id="xo-icon">
                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000.000000 1000.000000" preserveAspectRatio="xMidYMid meet">
                            <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
                                <path d="M715 7910 c-75 -14 -171 -48 -255 -91 -196 -101 -345 -285 -416 -514 -26 -81 -29 -105 -29 -235 0 -121 4 -158 23 -223 30 -106 80 -209 143 -292 62 -85 4123 -4152 4257 -4265 101 -85 206 -142 332 -182 65 -20 96 -23 230 -23 135 0 165 3 230 24 101 31 203 81 270 131 30 22 1008 993 2173 2158 1481 1481 2132 2138 2166 2187 54 79 101 179 127 275 14 49 18 101 18 210 0 129 -3 155 -28 235 -113 371 -438 615 -821 615 -177 0 -326 -45 -485 -148 -35 -22 -624 -603 -1590 -1567 -1042 -1040 -1554 -1544 -1595 -1571 -83 -53 -195 -100 -287 -118 -155 -32 -357 -15 -493 40 -164 67 -95 2 -1740 1644 -969 967 -1560 1550 -1595 1572 -155 100 -278 139 -455 144 -71 1 -152 -1 -180 -6z"></path>
                            </g>
                        </svg>
                    </button>
                </div>
                <div id="xo-content">
                    <slot></slot>
                </div>
            </main>
        `;
    }
}