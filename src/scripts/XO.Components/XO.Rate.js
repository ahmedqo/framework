import XOElement from "./XO.Element.js"

export default class extends XOElement {
    static attributes = {
        read: String,
        count: Number,
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
                case "read":
                    if (this.matches("[read]"))
                        this.stars.forEach(s => {
                            s.setAttribute("disabled", "");
                        });
                    else
                        this.stars.forEach(s => {
                            s.removeAttribute("disabled");
                        });
                    break;
                case "count":
                    this.setStars(v);
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
                    if (this.matches("[read]"))
                        this.stars.forEach(s => {
                            s.setAttribute("disabled", "");
                        });
                    else
                        this.stars.forEach(s => {
                            s.removeAttribute("disabled");
                        });
                    break;
            }
        }
    }

    static properties = {
        value: { default: null, type: Number },
        change(n, v) {
            switch (n) {
                case "value":
                    this.highlight(v - 1);
                    break;
            }
        }
    }

    static callbacks = {
        create() {
            this.setStars(this.count || 5);
            if (this.getAttribute("value")) {
                this.value = this.getAttribute("value");
                this.removeAttribute("value");
            }
        },
        attach() {
            this.$.container.addEventListener("mousemove", e => {
                if (this.matches("[read]") || this.matches("[blocked]")) return;
                let box = this.getBoundingClientRect(),
                    starIndex = Math.floor((e.pageX - box.left) / box.width * this.stars.length);
                this.highlight(starIndex);
            });
            this.$.container.addEventListener("mouseout", () => {
                if (this.matches("[read]") || this.matches("[blocked]")) return;
                this.value = this.value;
            });
        },
        detach() {
            this.$.container.removeEventListener("mousemove", () => {});
            this.$.container.removeEventListener("mouseout", () => {});
            this.stars.forEach(s => {
                s.removeEventListener("click", () => {});
            });
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
            display: inline-block;
            width: max-content;
        }
        :host([read]) #xo-icon,
        :host([blocked]) #xo-icon {
            cursor: unset !important;
        }
        :host([blocked]) #xo-icon {
            opacity: .5;
        }
        /* Container */
        #xo-container {
            justify-content: space-between;
            display: flex;
            width: 100%;
            gap: 5px;
        }
        /* Icon */
        :host([theme="water"]) #xo-icon.active svg {
            fill: var(--water);
        }
        :host([theme="fire"]) #xo-icon.active svg {
            fill: var(--fire);
        }
        :host([theme="earth"]) #xo-icon.active svg {
            fill: var(--earth);
        }
        :host([theme="forest"]) #xo-icon.active svg {
            fill: var(--forest);
        }
        :host([theme="night"]) #xo-icon.active svg {
            fill: var(--night);
        }
        #xo-icon {
            display: flex;
            cursor: pointer;
        }
        #xo-icon:focus {
            outline: auto;
        }
        #xo-icon svg {
            width: 42px;
            height: 42px;
            display: flex;
            fill: #939393;
        }
        #xo-icon.active svg {
            fill: var(--default);
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
            <main role="rate" id="xo-container"></main>
            <label for="xo-text" id="xo-success"></label>
            <label for="xo-text" id="xo-error"></label>
        `;
    }

    highlight(index) {
        this.stars.forEach((star, i) => {
            star.classList.toggle("active", i <= index);
        });
    }

    setStars(val) {
        this.$.container.innerHTML = "";
        for (let i = 0; i < val; i++) {
            this.$.container.innerHTML += `
                <button data-index="${i+1}" id="xo-icon">
                    <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000.000000 1000.000000" preserveAspectRatio="xMidYMid meet">
                        <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
                            <path d="M4935 9746 c-16 -7 -40 -24 -51 -37 -12 -13 -340 -670 -729 -1459 -390 -789 -717 -1447 -727 -1462 -10 -15 -32 -37 -49 -49 -33 -23 86 -5 -2049 -314 -663 -96 -1217 -180 -1231 -186 -58 -23 -99 -88 -99 -157 0 -73 -140 69 1698 -1721 364 -355 664 -652 668 -660 27 -65 26 -68 -248 -1666 -148 -869 -270 -1601 -270 -1626 0 -91 64 -160 155 -166 50 -4 61 1 297 125 1924 1014 2659 1395 2697 1399 39 5 111 -31 1410 -713 1707 -896 1547 -814 1590 -814 79 0 157 65 169 141 4 21 -95 625 -265 1619 -149 872 -271 1603 -271 1625 0 24 9 54 23 76 12 19 346 350 742 734 1290 1253 1469 1427 1538 1495 l67 68 0 85 c0 76 -3 89 -25 115 -13 16 -37 35 -52 41 -22 9 -2047 307 -2998 441 -251 36 -273 41 -308 78 -15 16 -346 674 -745 1482 -801 1620 -740 1511 -850 1517 -34 2 -69 -2 -87 -11z"></path>
                        </g>
                    </svg>
                </button>
            `;
        }
        this.stars = this.queryAll("#xo-icon");
        this.stars.forEach(s => {
            s.addEventListener("click", () => {
                if (this.matches("[read]") || this.matches("[blocked]")) return;
                this.value = Number(s.dataset.index);
                var event = new CustomEvent("change", {
                    bubbles: true,
                    cancelable: true,
                });
                this.dispatchEvent(event);
            });
        });
        this.value = this.value;
    }
}