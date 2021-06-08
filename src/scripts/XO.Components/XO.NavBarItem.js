import XOElement from "./XO.Element.js"

export default class extends XOElement {
    static attributes = {
        blocked: String,
        url: String,
        change(n, v) {
            switch (n) {
                case "blocked":
                    if (this.matches("[slot='brand']")) break;
                    if (this.matches("[blocked]")) {
                        this.$.container.setAttribute("disabled", "");
                    } else {
                        this.$.container.removeAttribute("disabled");
                    }
                    break;
            }
        }
    }

    static callbacks = {
        create() {
            if (this.matches("[slot='brand']")) this.$.container.setAttribute("disabled", "");
            this.innerHTML = this.innerHTML.trim();
        },
        attach() {
            this.query("[name='prefix']").addEventListener("slotchange", e => {
                if (e.target.assignedNodes().length > 0)
                    this.$.label.style.marginLeft = "5px";
                else
                    this.$.label.style.marginLeft = "";
            });
            this.query("[name='suffix']").addEventListener("slotchange", e => {
                if (e.target.assignedNodes().length > 0)
                    this.$.label.style.marginRight = "5px";
                else
                    this.$.label.style.marginRight = "";
            });
            this.query("#xo-label slot").addEventListener("slotchange", e => {
                if (e.target.assignedNodes().length > 0) {
                    if (this.query("[name='prefix']").assignedNodes().length > 0)
                        this.$.label.style.marginLeft = "5px";
                    if (this.query("[name='suffix']").assignedNodes().length > 0)
                        this.$.label.style.marginRight = "5px";
                } else {
                    this.$.label.style.marginLeft = "";
                    this.$.label.style.marginRight = "";
                }
            });
            this.addEventListener("click", () => {
                if (this.matches("[dropdown]")) {
                    if (this.$.dropdown.matches("[shrink]")) __show__(this);
                    else __hide__(this);
                    return;
                }
                if (!this.url || this.matches("[local]")) return;
                window.location.href = this.url;
            });
            document.addEventListener("click", e => {
                if (e.path.includes(this) === false) __hide__(this);
            });
        },
        detach() {
            this.query("[name='prefix']").removeEventListener("slotchange", () => {});
            this.query("[name='suffix']").removeEventListener("slotchange", () => {});
            this.query("#xo-label slot").removeEventListener("slotchange", () => {});
            document.removeEventListener("click", () => {});
            this.removeEventListener("click", () => {});
        }
    }

    static styles = `
        /* Globals */
        #xo-container {
            all: unset;
        }
        * {
            font-family: Arial, sans-serif;
            box-sizing: border-box;
        }
        /* Element */
        :host([aside]) {
            display: block;
            width: 100%;
            min-width: max-content;
        }
        :host([slot="brand"][aside]) {
            display: block;
            width: max-content;
        }
        :host {
            display: inline-block;     
        }
        main {
            position: relative;
        }
        #xo-container:hover,main:hover #xo-container {
            outline: auto;
            cursor: pointer !important;
        }
        :host([slot="brand"]) main:hover #xo-container,:host([slot="brand"]) #xo-container:hover {
            cursor: unset;
            outline: none;
        }
        #xo-label {
            pointer-events: none;
        }
        /* Container */
        :host([theme="water"]) #xo-container,
        :host([theme="fire"]) #xo-container,
        :host([theme="forest"]) #xo-container,
        :host([theme="night"]) #xo-container {      
            color: #fff;
        }
        :host([slot="brand"]) #xo-container {
            font-size: 24px;
            font-weight: bolder;
        }
        :host([aside]) #xo-container {
            width: max-content;
            padding: 0;
        }
        #xo-container {
            align-items: center;
            font-size: 14px;
            font-weight: 600;
            color: #1d1d1d;
            display: flex;
        }
        #xo-container:focus {
            outline: auto;
        }
        :host([aside]) #xo-dropdown {
            position: unset;
            top: unset;
            left: unset;
            transform: unset;
            margin-top: 15px;
            box-shadow: unset;
            padding-left: 20px;
        }
        :host([aside]) #xo-dropdown[shrink] {
            opacity: 0;
            pointer-events: none;
            height: 0;
            background: unset;
            margin-top: 0;
        }
        #xo-dropdown {
            transition: top .3s ease-in-out, bottom .3s ease-in-out,
                        left .3s ease-in-out, right .3s ease-in-out,
                        opacity .3s ease-in-out;
            box-shadow: 0px 1px 5px 2px #00000045;
            pointer-events: all;
            position: absolute;
            opacity: 1;
            z-index: 2;
            top: 110%;
            left: 50%;
            width: 180px;
            transform: translateX(-50%);
            background: #ffffff;
        }
        #xo-dropdown[shrink] {
            top: 200%;
            opacity: 0;
            pointer-events: none;
        }
        @media (max-width: 767.98px) {
            /* Element */
            :host {
                display: block;
                width: 100%;
                min-width: max-content;
            }
            /* Container */
            :host #xo-container {
                width: max-content;
                padding: 0;
            }
            #xo-dropdown {
                position: unset;
                top: unset;
                left: unset;
                transform: unset;
                margin-top: 15px;
                background: unset;
                box-shadow: unset;
                padding-left: 20px;
            }
            #xo-dropdown[shrink] {
                opacity: 0;
                pointer-events: none;
                height: 0;
                margin-top: 0px;
            }
        }
        /* Variables */ 
            /* Container */
            #xo-container {
                {{--xo-container}}
            }
            #xo-container:hover {
                {{--xo-container-hover}}
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
            <main>
                <button role="link" id="xo-container">
                    <slot name="prefix"></slot>
                    <label id="xo-label"><slot></slot></label>
                    <slot name="suffix"></slot>
                </button>
                <div id="xo-dropdown" shrink><slot name="dropdown"></slot></div>
            </main>
        `
    }
}

function __show__(el) {
    el.$.dropdown.removeAttribute("shrink");
    el.$.dropdown.querySelector("slot").assignedElements().forEach(e => {
        __block__(e, true);
    });
}

function __hide__(el) {
    el.$.dropdown.setAttribute("shrink", "");
    el.$.dropdown.querySelector("slot").assignedElements().forEach(e => {
        __block__(e);
    });
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
}