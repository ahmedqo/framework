import XOElement from "./XO.Element.js"

export default class extends XOElement {
    static attributes = {
        read: String,
        error: String,
        success: String,
        blocked: String,
        placeholder: String,
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
                case "read":
                    if (this.matches("[read]"))
                        this.$.text.setAttribute("readonly", "");
                    else
                        this.$.text.removeAttribute("readonly");
                    break;
                case "error":
                    if (v) this.$.error.innerHTML = icons.error + v;
                    else this.$.error.innerHTML = "";
                    break;
                case "success":
                    if (v) this.$.success.innerHTML = icons.success + v;
                    else this.$.success.innerHTML = "";
                    break;
                case "blocked":
                    if (this.matches("[blocked]"))
                        this.$.text.setAttribute("disabled", "");
                    else
                        this.$.text.removeAttribute("disabled");
                    break;
                case "placeholder":
                    if (v) this.$.label.innerText = v;
                    else this.$.label.innerText = "";
                    break;
            }
        }
    }

    static properties = {
        value: { default: "", type: String },
        change(n, v) {
            switch (n) {
                case "value":
                    this.$.text.value = v;
                    this.$.label.style.setProperty("top", "10px");
                    this.$.label.style.setProperty("font-size", "12px");
                    var event = new CustomEvent("change", {
                        bubbles: true,
                        cancelable: true,
                    })
                    this.dispatchEvent(event);
                    break;
            }
        }
    }

    static callbacks = {
        create() {
            if (this.getAttribute("value")) {
                this.value = this.getAttribute("value");
                this.removeAttribute("value");
            }
        },
        attach() {
            this.$.text.addEventListener("blur", e => {
                if (e.target.value.trim()) {
                    this.$.label.style.setProperty("top", "10px");
                    this.$.label.style.setProperty("font-size", "12px");
                } else {
                    this.$.label.style.setProperty("top", "");
                    this.$.label.style.setProperty("font-size", "");
                }
                this.$.container.style.setProperty("outline", "unset");
            });
            this.$.text.addEventListener("focus", e => {
                if (this.matches("[blocked]") || this.matches("[read]")) return;
                this.$.container.style.setProperty("outline", "auto");
            });
            this.$.text.addEventListener("input", e => {
                if (this.$.text.value.trim() === "") this.value = "";
                else this.value = this.$.text.value;
            });
        },
        detach() {
            this.$.text.removeEventListener("input", () => {});
            this.$.text.removeEventListener("focus", () => {});
            this.$.text.removeEventListener("blur", () => {});
        }
    }

    static styles = `
        /* Globals */
        #xo-container section,
        #xo-text {
            all: unset;
        }
        * {
            font-family: Arial, sans-serif;
            box-sizing: border-box;
        }
        /* Element */
        :host {
            display: inline-block;
            width: 260px;
        }
        :host([blocked]) #xo-container {
            background: #0000001f;
        }
        /* Container */
        #xo-container {
            border: 1px solid #1d1d1d;
            align-items: center;
            position: relative;
            border-radius: 5px;
            background: #fff;
            display: flex;
            width: 100%;
        }
        /* Input */
        #xo-container section {
            position: relative;
            overflow: hidden;
            flex: 1;
        }
        #xo-text {
            box-sizing: border-box;
            padding-right: 9.5px;
            padding-left: 9.5px;
            padding-bottom: 4px;
            padding-top: 15px;
            color: #1d1d1d;
            font-size: 18px;
            width: 100%;
        }
        #xo-label {
            transition: top .3s ease-in-out,
                        font-size .3s ease-in-out;
            transform: translateY(-50%);
            color: rgb(117, 117, 117);
            pointer-events: none;
            position: absolute;
            margin-left: 9.5px;
            font-size: 18px;
            top: 50%;
            left: 0;
        }
        #xo-text:focus+#xo-label {
            font-size: 12px;
            top: 10px;
        }
        /* Labels */
        #xo-error,
        #xo-success {
            font-size: 18px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        #xo-error svg,
        #xo-success svg {
            width: 18px;
            height: 18px;
            order: 2;
        }
        #xo-error {
            color: #dc3545;
        }
        #xo-success {
            color: #28a745;
        }
        #xo-error svg {
            fill: #dc3545;
        }
        #xo-success svg {
            fill: #28a745;
        }
        /* Variables */
            /* Container */
            #xo-container {
                {{--xo-container}}
            }
            #xo-container:hover {
                {{--xo-container-hover}}
            }
            /* Text */
            #xo-text {
                {{--xo-text}}
            }
            #xo-text:hover {
                {{--xo-text-hover}}
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
            <a role="input" id="xo-container">
                <slot name="prefix"></slot>
                <section>
                    <input type="text" id="xo-text">
                    <label for="xo-text" id="xo-label"></label>
                </section>
                <slot name="suffix"></slot>
            </a>
            <label for="xo-text" id="xo-success"></label>
            <label for="xo-text" id="xo-error"></label>
        `;
    }

    empty() {
        if (this.value.trim() === "" || this.value === null || this.value === undefined) return true;
        else return false;
    }
}