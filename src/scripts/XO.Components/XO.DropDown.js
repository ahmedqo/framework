import XOElement from "./XO.Element.js"

export default class extends XOElement {
    static attributes = {
        blocked: String,
        change(n, v) {
            switch (n) {
                case "blocked":
                    if (this.matches("[blocked]")) this.$.trigger.removeAttribute("href");
                    else this.$.trigger.href = "";
                    break;
            }
        }
    }

    static callbacks = {
        create() {
            this.hide();
        },
        attach() {
            this.$.trigger.addEventListener("click", e => {
                e.preventDefault();
                if (this.matches("[blocked]")) return;
                if (this.$.item.matches("[shrink]")) this.show();
                else this.hide();
            });
            document.addEventListener("click", e => {
                if (e.path.includes(this) === false) this.hide();
            });
        },
        detach() {
            this.$.trigger.removeEventListener("click", () => {});
            document.removeEventListener("click", () => {});
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
            display: inline-block;
        }
        /* Container */
        #xo-container {
            text-decoration: unset;
            position: relative;
            display: flex;
        }
        /* Trigger */
        #xo-trigger {
            display: flex;
            cursor: pointer;
            text-decoration: unset;
        }
        #xo-trigger:focus {
            outline: auto;
            color: #1d1d1d;
        }
        /* item */
        #xo-item {
            transition: top .3s ease-in-out, bottom .3s ease-in-out,
                        left .3s ease-in-out, right .3s ease-in-out,
                        opacity .3s ease-in-out;
            box-shadow: 0px 1px 5px 2px #00000045;
            pointer-events: all;
            position: absolute;
            opacity: 1;
            z-index: 2;
            top: 110%;
            left: 0;
        }       
        :host([theme="topRight"]) #xo-item {
            left: 110%;
            top: 0
        }
        :host([theme="topLeft"]) #xo-item {
            left: unset;
            right: 110%;
            top: 0;
        }
        :host([theme="top"]) #xo-item {
            transform: translateX(-50%);
            left: 50%;
            top: 0;
        }
        :host([theme="bottomLeft"]) #xo-item {
            left: 0;
        }
        :host([theme="bottomRight"]) #xo-item {
            left: unset;
            right: 0;
        }
        :host([theme="bottom"]) #xo-item {
            transform: translateX(-50%);
            left: 50%;
        }
        #xo-item[shrink] {
            top: 200%;
            opacity: 0;
            pointer-events: none;
        }
        :host([theme="topLeft"]) #xo-item[shrink] {
            left: 200%;
        }
        :host([theme="topRight"]) #xo-item[shrink] {
            right: 200%;
        }
        :host([theme="top"]) #xo-item[shrink] {
            top: 90%;
        }
    `

    render() {
        return /*html*/ `
            <main id="xo-container">
                <a href id="xo-trigger">
                    <slot name="trigger"></slot>
                </a>
                <div id="xo-item" shrink><slot></slot></div>
            </main>
        `;
    }

    show() {
        this.$.item.removeAttribute("shrink");
        this.$.item.querySelector("slot").assignedElements().forEach(e => {
            __block__(e, true);
        });
        var event = new CustomEvent("grow", {
            bubbles: true,
            cancelable: true,
        });
        this.dispatchEvent(event);
    }

    hide() {
        this.$.item.setAttribute("shrink", "");
        this.$.item.querySelector("slot").assignedElements().forEach(e => {
            __block__(e);
        });
        var event = new CustomEvent("shrink", {
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