import XOElement from "./XO.Element.js"

export default class extends XOElement {
    static attributes = {
        min: String,
        max: String,
        step: String,
        read: String,
        error: String,
        success: String,
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
                case "min":
                    this.$.input.min = v;
                    break;
                case "max":
                    this.$.input.max = v;
                    break;
                case "step":
                    this.$.input.step = v;
                    break;
                case "read":
                    if (this.matches("[read]"))
                        this.$.input.setAttribute("readonly", "");
                    else
                        this.$.input.removeAttribute("readonly");
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
                        this.$.input.setAttribute("disabled", "");
                    else
                        this.$.input.removeAttribute("disabled");
                    break;
            }
        }
    }

    static properties = {
        value: { default: null, type: Number },
        change(n, v) {
            switch (n) {
                case "value":
                    var val = (Number(v) - Number(this.$.input.min)) / (Number(this.$.input.max) - Number(this.$.input.min)) * 100;
                    this.$.input.style.background = `linear-gradient(90deg, var(--pros) ${val}%, var(--back) ${val}%)`;
                    this.$.input.value = v;
                    break;
            }
        }
    }

    static callbacks = {
        attach() {
            this.value = 0;
            if (this.getAttribute("value")) {
                this.value = this.getAttribute("value");
                this.removeAttribute("value");
            }
            this.$.input.addEventListener("input", e => {
                this.value = e.target.value;
                var event = new CustomEvent("input", {
                    bubbles: true,
                    cancelable: true,
                })
                this.dispatchEvent(event);
            });
            this.$.input.addEventListener("change", e => {
                this.value = e.target.value;
                var event = new CustomEvent("change", {
                    bubbles: true,
                    cancelable: true,
                })
                this.dispatchEvent(event);
            });
        },
        detach() {
            this.$.input.removeEventListener("input", e => {});
            this.$.input.removeEventListener("change", e => {});
            this.$.input.removeEventListener("input", e => {});
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
            width: 100%;
        }
        /* Container */
        :host([blocked]) #xo-container {
            opacity: 0.5;
        }
        #xo-container {
            width: 100%;
            height: 10px;
            display: block;
            margin-bottom: 10px;
        }
        /* Input */
        :host([pill]) #xo-input { 
            border-radius: 100px;
        }
        :host([theme="water"]) #xo-input {
            --back: var(--waterLight);
            --pros: var(--water);
        }
        :host([theme="fire"]) #xo-input {
            --back: var(--fireLight);
            --pros: var(--fire);
        }
        :host([theme="earth"]) #xo-input {
            --back: var(--earthLight);
            --pros: var(--earth);
        }
        :host([theme="forest"]) #xo-input {
            --back: var(--forestLight);
            --pros: var(--forest);
        }
        :host([theme="night"]) #xo-input {
            --back: var(--nightLight);
            --pros: var(--night);
        }
        :host([theme="water"]) #xo-input::-webkit-slider-thumb {
            background: var(--waterDark);
        }
        :host([theme="fire"]) #xo-input::-webkit-slider-thumb {
            background: var(--fireDark);
        }
        :host([theme="earth"]) #xo-input::-webkit-slider-thumb {
            background: var(--earthDark);
        }
        :host([theme="forest"]) #xo-input::-webkit-slider-thumb {
            background: var(--forestDark);
        }
        :host([theme="night"]) #xo-input::-webkit-slider-thumb {
            background: var(--nightDark);
        }
        #xo-input {
            --back: var(--defaultLight);
            --pros: var(--default);
            all: unset;
            -webkit-appearance: none;
            appearance: none;
            width: 100%;
            height: 100%;
            border-radius: 5px;
        }
        #xo-input::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            cursor: pointer;
            background: var(--defaultDark);
        }
        #xo-input:focus {
            outline: auto;
        }
        /* Labels */
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
            #xo-container { {{--xo-container}} }
            #xo-container:hover { {{--xo-container-hover}} }
            /* Input */
            #xo-input { {{--xo-input}} }
            #xo-input:hover { {{--xo-input-hover}} }
            #xo-input::-webkit-slider-thumb{ {{--xo-input-thumb}} }
            #xo-input:hover::-webkit-slider-thumb { {{--xo-input-thumb-hover}} }
            /* Success */
            #xo-success { {{--xo-success}} }
            #xo-success:hover { {{--xo-success-hover}} }
            #xo-success svg { {{--xo-success-icon}} }
            #xo-success:hover svg { {{--xo-success-icon-hover}} }
            /* Error */
            #xo-error { {{--xo-error}} }
            #xo-error:hover { {{--xo-error-hover}} }
            #xo-error svg { {{--xo-error-icon}} }
            #xo-error:hover svg { {{--xo-error-icon-hover}} }
    `

    render() {
        return /*html*/ `
            <main id="xo-container">
                <input id="xo-input" type="range" min="0" max="100" value="0">
            </main>
            <label for="xo-input" id="xo-error"></label>
            <label for="xo-input" id="xo-success"></label>
        `;
    }
}