import XOElement from "./XO.Element.js"

export default class extends XOElement {
    static callbacks = {
        create() {
            this.hide();
        },
        attach() {
            this.$.icon.addEventListener("click", () => {
                this.hide();
            });
        },
        detach() {
            this.$.icon.removeEventListener("click", () => {});
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
        }
        /* Container */
        #xo-container {
            transition: opacity 0.3s ease-in-out;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            opacity: 1;
            background: #4040408a;
            pointer-events: all;
            z-index: 2;
        }
        #xo-container[shrink] {
            opacity: 0;
            pointer-events: none;
        }
        /* Icon */
        #xo-icon {
            display: flex;
            cursor: pointer;
            position: absolute;
            top: 10px;
            right: 10px;
        }
        #xo-icon:focus {
            outline: auto;
            color: #1d1d1d;
        }
        #xo-icon svg {
            display: flex;
            width: 30px;
            height: 30px;
            fill: #fff;
        }
        /* Content */
        :host([theme="top"]) #xo-content[shrink] {
            top: -50%;
        }
        :host([theme="right"]) #xo-content[shrink] {
            left: 150%;
        }
        :host([theme="bottom"]) #xo-content[shrink] {
            top: 150%;
        }
        :host([theme="left"]) #xo-content[shrink] {
            left: -50%;
        }
        :host([theme="center"]) #xo-content[shrink] {
            transform: translate(-50%, -50%) scale(0);
        }
        #xo-content {
            transition: top .3s ease-in-out, bottom .3s ease-in-out,
                        left .3s ease-in-out, right .3s ease-in-out,
                        transform .3s ease-in-out;
            pointer-events: all;
            position: absolute;
            top: 50%;
            left: 50%;
            width: 100%;
            transform: translate(-50%, -50%) scale(1);
        }       
        #xo-content[shrink] {
            pointer-events: none;
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
                <button id="xo-icon">
                    <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000.000000 1000.000000" preserveAspectRatio="xMidYMid meet">
                        <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
                            <path d="M1790 8714 c-189 -41 -362 -179 -451 -359 -107 -217 -88 -464 52 -672 17 -27 624 -641 1348 -1366 l1316 -1317 -1316 -1318 c-724 -724 -1331 -1338 -1348 -1365 -266 -397 -66 -918 395 -1028 182 -44 367 -8 534 104 25 16 638 622 1363 1346 l1317 1316 1318 -1316 c724 -724 1337 -1330 1362 -1346 116 -77 216 -112 350 -120 265 -15 511 129 631 372 107 217 88 463 -52 672 -17 27 -624 641 -1348 1365 l-1316 1318 1316 1317 c724 725 1331 1339 1348 1366 140 208 159 455 52 672 -183 369 -633 486 -978 254 -27 -17 -641 -624 -1365 -1348 l-1318 -1316 -1317 1316 c-725 724 -1339 1331 -1366 1348 -159 107 -346 144 -527 105z"/>
                        </g>
                    </svg>
                </button>
                <div id="xo-content">
                    <slot></slot>
                </div>
            </main>
        `;
    }

    show() {
        this.$.container.removeAttribute("shrink");
        this.$.icon.removeAttribute("disabled");
        this.$.content.removeAttribute("shrink");
        this.$.content.querySelector("slot").assignedElements().forEach(e => {
            __block__(e, true);
        });
        var event = new CustomEvent("show", {
            bubbles: true,
            cancelable: true,
        });
        this.dispatchEvent(event);
    }

    hide() {
        this.$.container.setAttribute("shrink", "");
        this.$.icon.setAttribute("disabled", "");
        this.$.content.setAttribute("shrink", "");
        this.$.content.querySelector("slot").assignedElements().forEach(e => {
            __block__(e);
        });
        var event = new CustomEvent("hide", {
            bubbles: true,
            cancelable: true,
        });
        this.dispatchEvent(event);
    }
}

function __block__(el, opt) {
    if (opt) {
        if ("disabled" in el) el.removeAttribute("disabled");
        if ("blocked" in el) el.removeAttribute("blocked");
        el.querySelectorAll("*").forEach(e => {
            __block__(e, true);
        });
        return;
    }
    if ("disabled" in el) el.setAttribute("disabled", "");
    if ("blocked" in el) el.setAttribute("blocked", "");
    el.querySelectorAll("*").forEach(e => {
        __block__(e);
    });
    return;
}