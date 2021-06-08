import XOElement from "./XO.Element.js"

export default class extends XOElement {
    static attributes = {
        value: String,
        error: String,
        success: String,
        checked: Boolean,
        blocked: String,
        change(n, v) {
            var icons = {
                error: `<svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000.000000 1000.000000" preserveAspectRatio="xMidYMid meet">
                        <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
                            <path d="M4750 9993 c-491 -33 -892 -109 -1305 -247 -621 -207 -1134 -496 -1665 -934 -147 -122 -466 -442 -596 -597 -663 -797 -1049 -1705 -1161 -2735 -25 -231 -25 -746 1 -985 99 -938 421 -1768 975 -2510 786 -1054 1949 -1758 3239 -1960 155 -25 167 -25 782 -25 613 0 628 1 780 24 384 61 770 170 1136 322 1014 421 1899 1201 2431 2144 103 181 246 477 308 635 122 309 225 673 287 1015 l31 175 4 609 c4 577 3 618 -17 755 -137 958 -522 1813 -1154 2561 -117 140 -383 406 -526 529 -369 316 -639 495 -1066 710 -574 287 -1183 454 -1843 506 -169 13 -507 18 -641 8z m551 -1613 c683 -68 1303 -319 1834 -743 126 -101 407 -382 507 -507 424 -533 677 -1160 738 -1830 23 -255 8 -618 -35 -873 -53 -307 -174 -676 -317 -961 l-40 -79 -2299 2299 -2298 2298 72 39 c334 177 813 317 1222 356 130 12 496 13 616 1z m-986 -4073 l2296 -2294 -113 -56 c-318 -157 -645 -257 -1038 -319 -128 -20 -181 -22 -460 -22 -277 0 -333 3 -460 22 -229 36 -411 79 -600 142 -305 101 -566 226 -807 387 -191 127 -346 256 -524 433 -189 189 -279 296 -412 490 -291 428 -475 901 -559 1440 -19 128 -22 183 -22 465 0 255 3 344 17 440 42 283 117 573 206 798 59 148 161 367 172 367 4 0 1041 -1032 2304 -2293z"></path>
                        </g>
                    </svg>`,
                success: `<svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000.000000 1000.000000" preserveAspectRatio="xMidYMid meet">
                        <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
                            <path d="M7515 6559 c-2888 -1952 -3986 -2693 -4001 -2702 -6 -4 -202 70 -435 164 -1485 598 -3062 1229 -3065 1226 -2 -1 784 -790 1746 -1752 l1750 -1750 3243 3243 c1783 1783 3240 3242 3237 3242 -3 -1 -1116 -752 -2475 -1671z"></path>
                        </g>
                    </svg>`
            }
            switch (n) {
                case "checked":
                    this.isChecked = this.matches("[checked]");
                    break;
                case "error":
                    if (v) this.$.error.innerHTML = icons.error + v;
                    else this.$.error.innerHTML = "";
                    break;
                case "success":
                    if (v) this.$.success.innerHTML = icons.success + v;
                    else this.$.success.innerHTML = "";
                    break;
            }
        }
    }

    static properties = {
        isChecked: { default: false, type: Boolean },
    }

    static callbacks = {
        create() {
            var label = this.$.label.style,
                slot = this.query("slot");
            if (slot.assignedNodes().length > 0) {
                label.marginLeft = "5px";
                this.text = this.innerText;
            }
        },
        attach() {
            this.addEventListener("click", () => {
                if (this.matches("[blocked]")) return;
                if (this.hasAttribute("checked")) {
                    this.removeAttribute("checked");
                    var event = new CustomEvent("uncheck", {
                        bubbles: true,
                        cancelable: true,
                    });
                    this.dispatchEvent(event);
                } else {
                    this.setAttribute("checked", "");
                    var event = new CustomEvent("check", {
                        bubbles: true,
                        cancelable: true,
                    });
                    this.dispatchEvent(event);
                }
            });
        },
        detach() {
            this.removeEventListener("click", () => {});
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
            box-sizing: content-box !important;
            display: inline-block;
            min-width: 74px;
            height: 42px;
        }
        /* Container */
        #xo-container {
            text-decoration: unset;
            display: flex;
            align-items: center;
            position: relative;
            box-sizing: border-box;
            height: 100%;
            color: #1d1d1d;
            font-size: 20px;
        }
        /* Trigger */
        :host([blocked]) #xo-trigger {
            opacity: 0.5;
        }
        :host([checked]) #xo-trigger::before {
            transform: translateX(100%);
        }
        :host([pill]) #xo-trigger, 
        :host([pill]) #xo-trigger::before {
            border-radius: 100px;
        }
        :host([checked]) #xo-trigger {
            background: var(--default);
        }
        :host([theme="water"][checked]) #xo-trigger {
            background: var(--water);
        }
        :host([theme="fire"][checked]) #xo-trigger {
            background: var(--fire);
        }
        :host([theme="earth"][checked]) #xo-trigger {
            background: var(--earth);     
        }
        :host([theme="forest"][checked]) #xo-trigger {
            background: var(--forest);   
        }
        :host([theme="night"][checked]) #xo-trigger {
            background: var(--night);   
        }
        :host([theme="water"]) #xo-trigger {
            background: var(--waterLight);
        }
        :host([theme="fire"]) #xo-trigger {
            background: var(--fireLight);
        }
        :host([theme="earth"]) #xo-trigger {
            background: var(--earthLight);     
        }
        :host([theme="forest"]) #xo-trigger {
            background: var(--forestLight);   
        }
        :host([theme="night"]) #xo-trigger {
            background: var(--nightLight);   
        }
        #xo-trigger {
            width: 74px;
            height: 100%;
            position: relative;
            background: var(--defaultLight);
            border-radius: 5px;
            transition: background 100ms ease-in-out;
        }
        #xo-trigger::before {
            width: calc((100% /2) - 5px);
            height: calc(100% - 10px);
            position: absolute;
            top: 5px;
            left: 5px;
            content: "";
            background: #ffffff;
            border-radius: 5px;
            transition: transform 100ms ease-in-out;
        }
        /* Label */
        #xo-error,
        #xo-success {
            font-size: 18px;
            display: block;
        }
        #xo-error {
            color: #dc3545;
        }
        #xo-success {
            color: #28a745;
        }
        #xo-error svg,
        #xo-success svg {
            width: 18px;
            height: 18px;
            float: right;
        }
        #xo-error svg {
            fill: #dc3545;
        }
        #xo-success svg {
            fill: #28a745;;
        }
        /* Variables */
            /* Container */
            #xo-container {
                {{--xo-container}}
            }
            #xo-container:hover {
                {{--xo-container-hover}}
            }
            /* Trigger */
            :host([checked]) #xo-trigger {
                {{--xo-trigger-checked}}
            }
            :host([checked]) #xo-trigger:hover {
                {{--xo-trigger-checked-hover}}
            }
            #xo-trigger {
                {{--xo-trigger}}
            }
            #xo-trigger:hover {
                {{--xo-trigger-hover}}
            }
            #xo-trigger::before {
                {{--xo-trigger-thumb}}
            }
            #xo-trigger:hover::before {
                {{--xo-trigger-thumb-hover}}
            }
            /* Label */
            #xo-label {
                {{--xo-placeholder}}
            }
            #xo-label:hover {
                {{--xo-placeholder-hover}}
            }
            /* Success */
            #xo-success {
                {{--xo-success}}
            }
            #xo-success:hover {
                {{--xo-success-hover}}
            }
            #xo-success svg {
                {{--xo-success-icon}}
            }
            #xo-success:hover svg {
                {{--xo-success-icon-hover}}
            }
            /* Error */
            #xo-error {
                {{--xo-error}}
            }
            #xo-error:hover {
                {{--xo-error-hover}}
            }
            #xo-error svg {
                {{--xo-error-icon}}
            }
            #xo-error:hover svg {
                {{--xo-error-icon-hover}}
            }
    `

    render() {
        return /*html*/ `
            <a href onclick="event.preventDefault()" role="switch" id="xo-container">
                <div id="xo-trigger"></div>
                <label id="xo-label">
                    <slot></slot>
                </label>
            </a>
            <label id="xo-error"></label>
            <label id="xo-success"></label>
        `
    }
}