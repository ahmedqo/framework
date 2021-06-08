import XOElement from "./XO.Element.js"

class test extends XOElement {
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
                case "error":
                    if (v) this.$.error.innerHTML = icons.error + v;
                    else this.$.error.innerHTML = "";
                    break;
                case "success":
                    if (v) this.$.success.innerHTML = icons.success + v;
                    else this.$.success.innerHTML = "";
                    break;
                case "blocked":
                    if (this.matches("[blocked]")) {
                        this.$.text.setAttribute("disabled", "");
                        this.$.icon.setAttribute("disabled", "");
                    } else {
                        this.$.text.removeAttribute("disabled");
                        this.$.icon.removeAttribute("disabled");
                    }
                    break;
                case "placeholder":
                    if (v) this.$.label.innerText = v;
                    else this.$.label.innerText = "";
                    break;
            }
        }
    }

    static properties = {
        seconds: { default: null, type: Number },
        minutes: { default: null, type: Number },
        hours: { default: null, type: Number },
        value: { default: null, type: String },
        change(n, v) {
            switch (n) {
                case "value":
                    if (v === null) break;
                    var [HOURS, MINUTES, TYPE] = __getTime__(Number(v.split(":")[0]), Number(v.split(":")[1]));
                    this.hours = Number(v.split(":")[0]);
                    this.minutes = Number(v.split(":")[1]);
                    this.seconds = 0;
                    if (HOURS < 10) HOURS = "0" + HOURS;
                    if (MINUTES < 10) MINUTES = "0" + MINUTES;
                    this.$.am.removeAttribute("active");
                    this.$.pm.removeAttribute("active");
                    if (TYPE === "AM") this.$.am.setAttribute("active", "");
                    if (TYPE === "PM") this.$.pm.setAttribute("active", "");
                    this.$.text.value = HOURS + ":" + MINUTES + " " + TYPE;
                    this.$.digits[0].innerHTML = HOURS;
                    this.$.digits[1].innerHTML = MINUTES;
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
            this.$.items.querySelectorAll("button").forEach(b => {
                b.setAttribute("disabled", "");
            });
            if ((window.innerWidth - this.offsetLeft) < 290) {
                this.$.items.style.setProperty("left", "unset");
                this.$.items.style.setProperty("right", "0");
            } else {
                this.$.items.style.setProperty("left", "");
                this.$.items.style.setProperty("right", "");
            }
        },
        attach() {
            var [HOURS, MINUTES, TYPE] = __getTime__(new Date().getHours(), new Date().getMinutes());
            if (HOURS < 10) HOURS = "0" + HOURS;
            if (MINUTES < 10) MINUTES = "0" + MINUTES;
            this.$.digits[0].innerHTML = HOURS;
            this.$.digits[1].innerHTML = MINUTES;
            if (TYPE === "AM") this.$.am.setAttribute("active", "");
            if (TYPE === "PM") this.$.pm.setAttribute("active", "");
            if (this.getAttribute("value")) {
                this.value = this.getAttribute("value");
                this.$.label.style.setProperty("top", "10px");
                this.$.label.style.setProperty("font-size", "12px");
                this.removeAttribute("value");
            }
            this.$.hPrev.addEventListener("click", () => {
                var i = Number(this.$.digits[0].innerHTML) - 1;
                if (i > 0) {
                    if (i < 10) i = "0" + i;
                    this.$.digits[0].innerHTML = i;
                } else {
                    this.$.digits[0].innerHTML = 12;
                }
            });
            this.$.hNext.addEventListener("click", () => {
                var i = Number(this.$.digits[0].innerHTML) + 1;
                if (i <= 12) {
                    if (i < 10) i = "0" + i;
                    this.$.digits[0].innerHTML = i;
                } else {
                    this.$.digits[0].innerHTML = "0" + 1;
                }
            });
            this.$.mPrev.addEventListener("click", () => {
                var i = Number(this.$.digits[1].innerHTML) - 1;
                if (i > 0) {
                    if (i < 10) i = "0" + i;
                    this.$.digits[1].innerHTML = i;
                } else {
                    this.$.digits[1].innerHTML = 59;
                }
            });
            this.$.mNext.addEventListener("click", () => {
                var i = Number(this.$.digits[1].innerHTML) + 1;
                if (i < 60) {
                    if (i < 10) i = "0" + i;
                    this.$.digits[1].innerHTML = i;
                } else {
                    this.$.digits[1].innerHTML = "0" + 0;
                }
            });
            this.$.text.addEventListener("change", e => {
                var reg = /^(1[0-2]|0?[1-9]):[0-5][0-9] (AM|PM)$/g,
                    val = e.target.value;
                if (!val.match(reg)) {
                    e.target.value = "";
                    this.value = null;
                    this.hours = null;
                    this.minutes = null;
                    this.seconds = null;
                } else {
                    var t = new Date("1999-10-10 " + val);
                    this.value = t.getHours() + ":" + t.getMinutes() + ":00";
                }
            })
            this.$.text.addEventListener("blur", () => {
                this.$.container.style.setProperty("outline", "unset");
                if (this.$.text.value.trim()) {
                    this.$.label.style.setProperty("top", "10px");
                    this.$.label.style.setProperty("font-size", "12px");
                } else {
                    this.$.label.style.setProperty("top", "");
                    this.$.label.style.setProperty("font-size", "");
                }
            });
            this.$.text.addEventListener("focus", () => {
                if (this.matches("[blocked]") || this.matches("[read]")) return;
                this.$.container.style.setProperty("outline", "auto");
            });
            this.$.text.addEventListener("click", () => {
                this.$.icon.click();
            });
            this.$.icon.addEventListener("click", () => {
                if (this.matches("[blocked]") || this.matches("[read]")) return;
                if (this.$.items.matches("[shrink]")) {
                    this.$.items.removeAttribute("shrink");
                    this.$.items.querySelectorAll("button").forEach(b => {
                        b.removeAttribute("disabled");
                    });
                    this.$.container.style.setProperty("outline", "auto");
                } else {
                    this.$.items.setAttribute("shrink", "");
                    this.$.items.querySelectorAll("button").forEach(b => {
                        b.setAttribute("disabled", "");
                    });
                    this.$.container.style.setProperty("outline", "unset");
                }
            });
            this.$.am.addEventListener("click", () => {
                TYPE = "AM";
                this.$.am.setAttribute("active", "");
                this.$.pm.removeAttribute("active");
            });
            this.$.pm.addEventListener("click", () => {
                TYPE = "PM";
                this.$.pm.setAttribute("active", "");
                this.$.am.removeAttribute("active");
            });
            this.$.ok.addEventListener("click", () => {
                var d = new Date("1995-06-06 " + this.$.digits[0].innerHTML + ":" + this.$.digits[1].innerHTML + " " + TYPE);
                this.$.items.querySelectorAll("button").forEach(b => {
                    b.setAttribute("disabled", "");
                });
                this.$.items.setAttribute("shrink", "");
                this.$.container.style.setProperty("outline", "unset");
                this.value = d.getHours() + ":" + d.getMinutes() + ":00";
                if (this.$.text.value.trim()) {
                    this.$.label.style.setProperty("top", "10px");
                    this.$.label.style.setProperty("font-size", "12px");
                } else {
                    this.$.label.style.setProperty("top", "");
                    this.$.label.style.setProperty("font-size", "");
                }
            });
            window.addEventListener("resize", () => {
                if ((window.innerWidth - this.offsetLeft) < 290) {
                    this.$.items.style.setProperty("left", "unset");
                    this.$.items.style.setProperty("right", "0");
                } else {
                    this.$.items.style.setProperty("left", "");
                    this.$.items.style.setProperty("right", "");
                }
            });
            document.addEventListener("click", e => {
                if (e.target !== this) {
                    this.$.items.setAttribute("shrink", "");
                    this.$.container.style.setProperty("outline", "unset");
                    this.$.items.querySelectorAll("button").forEach(b => {
                        b.setAttribute("disabled", "");
                    });
                    if (this.$.text.value.trim()) {
                        this.$.label.style.setProperty("top", "10px");
                        this.$.label.style.setProperty("font-size", "12px");
                    } else {
                        this.$.label.style.setProperty("top ", "");
                        this.$.label.style.setProperty("font-size", "");
                    }
                }
            });
        },
        detach() {
            this.$.hNext.removeEventListener("click", () => {});
            this.$.hPrev.removeEventListener("click", () => {});
            this.$.mNext.removeEventListener("click", () => {});
            this.$.mPrev.removeEventListener("click", () => {});
            this.$.text.removeEventListener("change", () => {});
            this.$.text.removeEventListener("click", () => {});
            this.$.text.removeEventListener("focus", () => {});
            this.$.icon.removeEventListener("click", () => {});
            this.$.text.removeEventListener("blur", () => {});
            this.$.am.removeEventListener("click", () => {});
            this.$.pm.removeEventListener("click", () => {});
            this.$.ok.removeEventListener("click", () => {});
            document.removeEventListener("click", () => {});
            window.removeEventListener("resize", () => {});
        }
    }

    static styles = `
        /* Globals */
        #xo-container section,
        #xo-hPrev,
        #xo-hNext,
        #xo-mPrev,
        #xo-mNext,
        #xo-icon,
        #xo-am,
        #xo-pm,
        #xo-ok,
        #xo-text {
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
            transition: top .3s ease-in-out, font-size .3s ease-in-out;
            transform: translateY(-50%);
            color: rgb(117, 117, 117);
            pointer-events: none;
            position: absolute;
            margin-left: 9.5px;
            font-size: 18px;
            top: 50%;
            left: 0;
        }
        /* Icon */
        #xo-icon {
            margin-right: 9.5px;
            width: max-content;
            cursor: pointer;
            display: flex;
        }
        #xo-icon:focus {
            outline: auto;
        }
        #xo-icon svg {
            width: 20px;
            height: 20px;
            fill: #1d1d1d;
        }
        /* Items */
        #xo-items {
            transition: top .3s ease-in-out, bottom .3s ease-in-out, opacity .3s ease-in-out;
            box-shadow: 0px 1px 5px 2px #00000045;
            align-content: space-between;
            justify-content: center;
            background: #ffffff;
            pointer-events: all;
            position: absolute;
            border-radius: 5px;
            min-width: 290px;
            overflow: hidden;
            flex-wrap: wrap;
            padding: 10px;
            display: flex;
            width: 100%;
            opacity: 1;
            z-index: 2;
            top: 110%;
            left: 0;
            gap: 20px;
        }
        #xo-items[shrink] {
            top: 200%;
            opacity: 0;
            pointer-events: none;
        }
        /* Columns */
        #xo-column {
            display: flex;
            align-items: center;
        }
        #xo-digits {
            color: #1d1d1d;
            font-size: 80px;
            width: 100px;
            text-align: center;
        }
        #xo-hPrev,
        #xo-hNext,
        #xo-mPrev,
        #xo-mNext {
            display: flex;
            cursor: pointer;
            width: 40px;
            height: 40px;
        }
        #xo-hPrev:focus,
        #xo-hNext:focus,
        #xo-mPrev:focus,
        #xo-mNext:focus {
            outline: auto;
        }
        #xo-row {
            width: 100%;
            display: flex;
            align-items: center;
        }
        #xo-am,
        #xo-pm,
        #xo-ok {
            display: flex;
            font-size: 20px;
            padding: 5px 10px;
            color: #1d1d1d;
            border-radius: 5px;
        }
        #xo-am:focus,
        #xo-pm:focus,
        #xo-ok:focus {
            outline: auto;
        }
        #xo-am:hover,
        #xo-pm:hover,
        #xo-ok:hover {
            background: var(--defaultLight);
            cursor: pointer;
        }
        #xo-am[active],
        #xo-pm[active] {
            background: var(--default);
        }
        :host([theme="water"]) #xo-am:hover,
        :host([theme="water"]) #xo-pm:hover,
        :host([theme="water"]) #xo-ok:hover {
            background: var(--waterLight);
        }
        :host([theme="water"]) #xo-am[active],
        :host([theme="water"]) #xo-pm[active] {
            background: var(--water);
            color: #fff;
        }
        :host([theme="fire"]) #xo-am:hover,
        :host([theme="fire"]) #xo-pm:hover,
        :host([theme="fire"]) #xo-ok:hover {
            background: var(--fireLight);
        }
        :host([theme="fire"]) #xo-am[active],
        :host([theme="fire"]) #xo-pm[active] {
            background: var(--fire);
            color: #fff;
        }
        :host([theme="earth"]) #xo-am:hover,
        :host([theme="earth"]) #xo-pm:hover,
        :host([theme="earth"]) #xo-ok:hover {
            background: var(--earthLight);
        }
        :host([theme="earth"]) #xo-am[active],
        :host([theme="earth"]) #xo-pm[active] {
            background: var(--earth);
        }
        :host([theme="forest"]) #xo-am:hover,
        :host([theme="forest"]) #xo-pm:hover,
        :host([theme="forest"]) #xo-ok:hover {
            background: var(--forestLight);
        }
        :host([theme="forest"]) #xo-am[active],
        :host([theme="forest"]) #xo-pm[active] {
            background: var(--forest);
            color: #fff;
        }
        :host([theme="night"]) #xo-am:hover,
        :host([theme="night"]) #xo-pm:hover,
        :host([theme="night"]) #xo-ok:hover {
            background: var(--nightLight);
        }
        :host([theme="night"]) #xo-am[active],
        :host([theme="night"]) #xo-pm[active] {
            background: var(--night);
            color: #fff;
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
            ;
        }        
        @media (max-width: 767.98px) {
            /* Container */
            #xo-container {
                position: initial;
            }
            /* Items */
            #xo-items {
                position: fixed;
                top: unset;
                bottom: 0;
            }
            #xo-items[shrink] {
                bottom: -100%;
                top: unset;
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
            /* items */
            #xo-items {
                {{--xo-items}}
            }
            #xo-items:hover {
                {{--xo-items-hover}}
            }
            /* Column */
            #xo-column {
                {{--xo-column}}
            }
            #xo-column:hover {
                {{--xo-column-hover}}
            }
            /* Arrows */
            #xo-hPrev, #xo-hNext, #xo-mPrev, #xo-mNext {
                {{--xo-arrows}}
            }
            #xo-hPrev:hover, #xo-hNext:hover, #xo-mPrev:hover, #xo-mNext:hover {
                {{--xo-arrows-hover}}
            }
            /* Digits */
            #xo-digits {
                {{--xo-digits}}
            }
            #xo-digits:hover {
                {{--xo-digits-hover}}
            }
            /* Row */
            #xo-row {
                {{--xo-row}}
            }
            #xo-row:hover {
                {{--xo-row-hover}}
            }
            /* Type */
            #xo-am, #xo-pm {
                {{--xo-type}}
            }
            #xo-am:hover, #xo-pm:hover {
                {{--xo-type-hover}}
            }
            #xo-am[active], #xo-pm[active] {
                {{--xo-type-active}}
            }
            #xo-am[active]:hover, #xo-pm[active]:hover {
                {{--xo-type-active-hover}}
            }
            /* Btn */
            #xo-ok {
                {{--xo-btn}}
            }
            #xo-ok:hover {
                {{--xo-btn-hover}}
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
                    <input type="text" id="xo-text" readonly>
                    <label for="xo-text" id="xo-label"></label>
                </section>
                <button id="xo-icon">
                    <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000.000000 1000.000000" preserveAspectRatio="xMidYMid meet">
                        <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
                            <path d="M4935 9989 c-204 -25 -380 -168 -452 -370 -26 -71 -27 -84 -31 -322 -4 -243 -4 -247 -26 -251 -11 -3 -55 -10 -96 -16 -490 -76 -1025 -267 -1468 -522 -239 -138 -420 -265 -669 -470 l-81 -68 -114 116 c-62 63 -113 119 -113 123 0 4 207 218 460 474 253 257 461 471 463 476 2 5 -34 41 -80 81 -447 388 -1051 507 -1603 317 -247 -85 -474 -232 -660 -429 -259 -273 -406 -587 -452 -967 -28 -227 2 -510 78 -733 69 -204 200 -429 329 -568 l60 -65 505 510 504 510 67 -65 c36 -36 88 -91 115 -123 l50 -59 -49 -56 c-536 -633 -894 -1436 -1011 -2274 -46 -325 -53 -807 -16 -1123 106 -912 452 -1717 1042 -2421 168 -200 441 -463 641 -618 34 -27 62 -51 62 -53 0 -2 -47 -97 -105 -212 -135 -271 -149 -311 -142 -422 3 -68 10 -98 35 -150 74 -156 233 -249 402 -236 92 7 170 42 245 109 59 54 69 71 165 265 56 115 103 209 104 211 2 1 62 -25 134 -57 615 -280 1237 -405 1932 -388 307 8 515 32 795 94 321 70 600 163 888 293 l128 59 101 -202 c55 -111 117 -222 138 -247 94 -112 262 -165 405 -126 148 39 250 138 296 287 41 132 24 199 -122 492 l-114 229 31 26 c17 15 80 67 140 116 138 113 432 406 556 556 533 644 875 1405 997 2220 37 247 46 379 45 675 -1 502 -65 923 -211 1380 -87 274 -243 627 -383 870 -112 193 -290 449 -437 626 -35 42 -63 81 -63 86 0 12 183 193 195 193 6 0 227 -219 492 -487 l483 -488 55 60 c345 374 492 931 385 1455 -186 913 -1096 1508 -1980 1295 -286 -70 -528 -198 -745 -398 l-50 -46 195 -198 c107 -109 327 -331 488 -493 l292 -295 -104 -104 -104 -104 -49 45 c-286 264 -813 588 -1228 756 -274 110 -635 212 -916 257 -90 14 -174 28 -186 31 -23 4 -23 5 -23 217 0 239 -10 308 -61 414 -44 93 -159 208 -251 251 -105 49 -193 64 -303 51z m370 -2029 c804 -69 1557 -430 2109 -1011 509 -536 817 -1194 913 -1954 24 -192 24 -576 -1 -770 -47 -372 -138 -702 -281 -1015 -477 -1041 -1429 -1761 -2545 -1924 -409 -60 -861 -37 -1263 64 -766 193 -1435 656 -1907 1320 -141 198 -301 502 -393 745 -300 794 -285 1724 38 2489 191 453 428 801 776 1141 342 334 719 568 1191 738 223 81 569 157 808 176 141 12 419 12 555 1z"></path>
                            <path d="M4930 7491 c-78 -25 -151 -89 -184 -160 l-21 -46 0 -1315 0 -1315 21 -45 c26 -54 83 -114 138 -143 l41 -22 765 0 765 0 47 23 c54 27 123 98 145 150 8 20 15 61 16 92 1 145 -87 254 -227 279 -38 7 -259 11 -608 11 l-548 0 -2 1143 -3 1142 -28 57 c-28 57 -72 100 -137 133 -38 20 -141 29 -180 16z"></path>
                        </g>
                    </svg>
                </button>
                <div id="xo-items" shrink>
                    <div id="xo-column">
                        <button id="xo-hPrev">
                            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000.000000 1000.000000" preserveAspectRatio="xMidYMid meet">
                                <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
                                    <path d="M6927 9980 c-141 -25 -265 -80 -381 -167 -80 -60 -4242 -4222 -4293 -4293 -64 -88 -100 -158 -133 -260 -27 -81 -33 -114 -37 -225 -7 -190 33 -346 128 -495 31 -49 578 -602 2168 -2193 1169 -1171 2153 -2148 2187 -2172 77 -56 157 -96 264 -131 76 -25 100 -27 230 -28 123 -1 157 3 225 22 105 30 245 100 321 161 125 100 246 288 291 451 25 92 25 339 -1 430 -22 81 -73 191 -122 267 -25 38 -562 583 -1574 1598 -1650 1653 -1580 1578 -1645 1745 -67 171 -74 395 -17 570 68 208 -45 85 1661 1795 970 972 1551 1560 1573 1595 113 176 155 328 145 529 -7 139 -24 206 -82 328 -108 222 -309 390 -545 454 -85 23 -284 33 -363 19z"></path>
                                </g>
                            </svg>
                        </button>
                        <div id="xo-digits">10</div>
                        <button id="xo-hNext">
                            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000.000000 1000.000000" preserveAspectRatio="xMidYMid meet">
                                <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
                                    <path d="M2747 9971 c-247 -54 -469 -232 -582 -464 -58 -122 -75 -189 -82 -328 -10 -201 32 -353 145 -529 22 -35 603 -624 1573 -1595 1706 -1710 1593 -1587 1661 -1795 57 -175 50 -399 -17 -570 -65 -167 5 -92 -1645 -1745 -1012 -1015 -1549 -1560 -1574 -1598 -49 -76 -100 -186 -122 -267 -14 -50 -19 -101 -19 -215 0 -175 12 -231 80 -372 106 -218 292 -377 530 -449 81 -25 105 -28 240 -28 137 0 157 3 235 28 107 35 185 74 269 133 78 54 4233 4205 4303 4298 66 88 103 158 139 265 77 230 38 521 -97 726 -34 52 -579 603 -2167 2192 -1167 1168 -2149 2143 -2182 2167 -80 57 -188 110 -277 135 -108 31 -295 36 -411 11z"></path>
                                </g>
                            </svg>
                        </button>
                    </div>
                    <div id="xo-column">
                        <button id="xo-mPrev">
                            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000.000000 1000.000000" preserveAspectRatio="xMidYMid meet">
                                <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
                                    <path d="M6927 9980 c-141 -25 -265 -80 -381 -167 -80 -60 -4242 -4222 -4293 -4293 -64 -88 -100 -158 -133 -260 -27 -81 -33 -114 -37 -225 -7 -190 33 -346 128 -495 31 -49 578 -602 2168 -2193 1169 -1171 2153 -2148 2187 -2172 77 -56 157 -96 264 -131 76 -25 100 -27 230 -28 123 -1 157 3 225 22 105 30 245 100 321 161 125 100 246 288 291 451 25 92 25 339 -1 430 -22 81 -73 191 -122 267 -25 38 -562 583 -1574 1598 -1650 1653 -1580 1578 -1645 1745 -67 171 -74 395 -17 570 68 208 -45 85 1661 1795 970 972 1551 1560 1573 1595 113 176 155 328 145 529 -7 139 -24 206 -82 328 -108 222 -309 390 -545 454 -85 23 -284 33 -363 19z"></path>
                                </g>
                            </svg>
                        </button>
                        <div id="xo-digits">10</div>
                        <button id="xo-mNext">
                            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000.000000 1000.000000" preserveAspectRatio="xMidYMid meet">
                                <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
                                    <path d="M2747 9971 c-247 -54 -469 -232 -582 -464 -58 -122 -75 -189 -82 -328 -10 -201 32 -353 145 -529 22 -35 603 -624 1573 -1595 1706 -1710 1593 -1587 1661 -1795 57 -175 50 -399 -17 -570 -65 -167 5 -92 -1645 -1745 -1012 -1015 -1549 -1560 -1574 -1598 -49 -76 -100 -186 -122 -267 -14 -50 -19 -101 -19 -215 0 -175 12 -231 80 -372 106 -218 292 -377 530 -449 81 -25 105 -28 240 -28 137 0 157 3 235 28 107 35 185 74 269 133 78 54 4233 4205 4303 4298 66 88 103 158 139 265 77 230 38 521 -97 726 -34 52 -579 603 -2167 2192 -1167 1168 -2149 2143 -2182 2167 -80 57 -188 110 -277 135 -108 31 -295 36 -411 11z"></path>
                                </g>
                            </svg>
                        </button>
                    </div>
                    <div id="xo-row">
                        <button id="xo-am">AM</button>
                        <button id="xo-pm">PM</button>
                        <section></section>
                        <button id="xo-ok">OK</button>
                    </div>
                </div>
            </a>         
            <label for="xo-text" id="xo-success"></label>
            <label for="xo-text" id="xo-error"></label>
        `;
    }
}

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
                case "error":
                    if (v) this.$.error.innerHTML = icons.error + v;
                    else this.$.error.innerHTML = "";
                    break;
                case "success":
                    if (v) this.$.success.innerHTML = icons.success + v;
                    else this.$.success.innerHTML = "";
                    break;
                case "blocked":
                    if (this.matches("[blocked]")) {
                        this.$.text.setAttribute("disabled", "");
                        this.$.icon.setAttribute("disabled", "");
                    } else {
                        this.$.text.removeAttribute("disabled");
                        this.$.icon.removeAttribute("disabled");
                    }
                    break;
                case "placeholder":
                    if (v) this.$.label.innerText = v;
                    else this.$.label.innerText = "";
                    break;
            }
        }
    }

    static properties = {
        seconds: { default: null, type: Number },
        minutes: { default: null, type: Number },
        hours: { default: null, type: Number },
        value: { default: "", type: String },
        change(n, v) {
            switch (n) {
                case "value":
                    if (v === null) break;
                    var [HOURS, MINUTES, TYPE] = __getTime__(Number(v.split(":")[0]), Number(v.split(":")[1]));
                    this.hours = Number(v.split(":")[0]);
                    this.minutes = Number(v.split(":")[1]);
                    this.seconds = 0;
                    if (HOURS < 10) HOURS = "0" + HOURS;
                    if (MINUTES < 10) MINUTES = "0" + MINUTES;
                    this.$.btn[0].removeAttribute("active");
                    this.$.btn[1].removeAttribute("active");
                    if (TYPE === "AM") this.$.btn[0].setAttribute("active", "");
                    else this.$.btn[1].setAttribute("active", "");
                    this.$.text.value = HOURS + ":" + MINUTES + " " + TYPE;
                    this.$.hand[0].style.setProperty("--rotate", Number(MINUTES) / 60 * 360);
                    this.$.hand[1].style.setProperty("--rotate", Number(HOURS) / 12 * 360);
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
            this.$.items.querySelectorAll("button").forEach(b => {
                b.setAttribute("disabled", "");
            });
            if ((window.innerWidth - this.offsetLeft) < 290) {
                this.$.items.style.setProperty("left", "unset");
                this.$.items.style.setProperty("right", "0");
            } else {
                this.$.items.style.setProperty("left", "");
                this.$.items.style.setProperty("right", "");
            }
            this.$.hand[0].style.setProperty("--rotate", 0);
            this.$.hand[1].style.setProperty("--rotate", 0);
        },
        attach() {
            var date = new Date(),
                [HOURS, MINUTES, TYPE] = __getTime__(date.getHours(), date.getMinutes());
            if (TYPE === "AM") this.$.btn[0].setAttribute("active", "");
            else this.$.btn[1].setAttribute("active", "");
            this.$.hand[0].style.setProperty("--rotate", date.getMinutes() / 60 * 360);
            this.$.hand[1].style.setProperty("--rotate", date.getHours() / 12 * 360);
            if (this.getAttribute("value")) {
                this.value = this.getAttribute("value");
                this.removeAttribute("value");
            }
            this.$.arrow[0].addEventListener("click", () => {
                var rotation = this.$.hand[1].style.getPropertyValue("--rotate");
                rotation = Number(rotation) - 30;
                this.$.hand[1].style.setProperty("--rotate", rotation);
                if (rotation < 0)
                    setTimeout(() => {
                        this.$.hand[1].style.transition = "unset";
                        this.$.hand[1].style.setProperty("--rotate", 330);
                        setTimeout(() => {
                            this.$.hand[1].style.transition = "";
                        }, 100);
                    }, 300);
            });
            this.$.arrow[1].addEventListener("click", () => {
                var rotation = this.$.hand[1].style.getPropertyValue("--rotate");
                rotation = Number(rotation) + 30;
                this.$.hand[1].style.setProperty("--rotate", rotation);
                if (rotation > 330)
                    setTimeout(() => {
                        this.$.hand[1].style.transition = "unset";
                        this.$.hand[1].style.setProperty("--rotate", 0);
                        setTimeout(() => {
                            this.$.hand[1].style.transition = "";
                        }, 100);
                    }, 300);
            });
            this.$.arrow[2].addEventListener("click", () => {
                var rotation = this.$.hand[0].style.getPropertyValue("--rotate");
                rotation = Number(rotation) - 6;
                this.$.hand[0].style.setProperty("--rotate", rotation);
                if (rotation < 0)
                    setTimeout(() => {
                        this.$.hand[0].style.transition = "unset";
                        this.$.hand[0].style.setProperty("--rotate", 354);
                        setTimeout(() => {
                            this.$.hand[0].style.transition = "";
                        }, 100);
                    }, 300);
            });
            this.$.arrow[3].addEventListener("click", () => {
                var rotation = this.$.hand[0].style.getPropertyValue("--rotate");
                rotation = Number(rotation) + 6;
                this.$.hand[0].style.setProperty("--rotate", rotation);
                if (rotation > 354)
                    setTimeout(() => {
                        this.$.hand[0].style.transition = "unset";
                        this.$.hand[0].style.setProperty("--rotate", 0);
                        setTimeout(() => {
                            this.$.hand[0].style.transition = "";
                        }, 100);
                    }, 300);
            });
            this.$.text.addEventListener("change", e => {
                var reg = /^(1[0-2]|0?[1-9]):[0-5][0-9] (AM|PM)$/g,
                    val = e.target.value;
                if (!val.match(reg)) {
                    e.target.value = "";
                    this.value = null;
                    this.hours = null;
                    this.minutes = null;
                    this.seconds = null;
                } else {
                    var t = new Date("1999-10-10 " + val);
                    this.value = t.getHours() + ":" + t.getMinutes() + ":00";
                }
            })
            this.$.text.addEventListener("blur", () => {
                this.$.container.style.setProperty("outline", "unset");
                if (this.$.text.value.trim()) {
                    this.$.label.style.setProperty("top", "10px");
                    this.$.label.style.setProperty("font-size", "12px");
                } else {
                    this.$.label.style.setProperty("top", "");
                    this.$.label.style.setProperty("font-size", "");
                }
            });
            this.$.text.addEventListener("focus", () => {
                if (this.matches("[blocked]") || this.matches("[read]")) return;
                this.$.container.style.setProperty("outline", "auto");
            });
            this.$.text.addEventListener("click", () => {
                this.$.icon.click();
            });
            this.$.icon.addEventListener("click", () => {
                if (this.matches("[blocked]") || this.matches("[read]")) return;
                if (this.$.items.matches("[shrink]")) {
                    this.$.items.removeAttribute("shrink");
                    this.$.items.querySelectorAll("button").forEach(b => {
                        b.removeAttribute("disabled");
                    });
                    this.$.container.style.setProperty("outline", "auto");
                } else {
                    this.$.items.setAttribute("shrink", "");
                    this.$.items.querySelectorAll("button").forEach(b => {
                        b.setAttribute("disabled", "");
                    });
                    this.$.container.style.setProperty("outline", "unset");
                }
            });
            this.$.btn[0].addEventListener("click", () => {
                TYPE = "AM";
                this.$.btn[0].setAttribute("active", "");
                this.$.btn[1].removeAttribute("active");
            });
            this.$.btn[1].addEventListener("click", () => {
                TYPE = "PM";
                this.$.btn[1].setAttribute("active", "");
                this.$.btn[0].removeAttribute("active");
            });
            this.$.set.addEventListener("click", () => {
                var d = new Date("1995-06-06 " + (Number(this.$.hand[1].style.getPropertyValue("--rotate")) / 360 * 12) +
                    ":" + (Number(this.$.hand[0].style.getPropertyValue("--rotate")) / 360 * 60) + " " + TYPE);
                this.$.items.querySelectorAll("button").forEach(b => {
                    b.setAttribute("disabled", "");
                });
                this.$.items.setAttribute("shrink", "");
                this.$.container.style.setProperty("outline", "unset");
                this.value = d.getHours() + ":" + d.getMinutes() + ":00";
                if (this.$.text.value.trim()) {
                    this.$.label.style.setProperty("top", "10px");
                    this.$.label.style.setProperty("font-size", "12px");
                } else {
                    this.$.label.style.setProperty("top", "");
                    this.$.label.style.setProperty("font-size", "");
                }
            });
            window.addEventListener("resize", () => {
                if ((window.innerWidth - this.offsetLeft) < 290) {
                    this.$.items.style.setProperty("left", "unset");
                    this.$.items.style.setProperty("right", "0");
                } else {
                    this.$.items.style.setProperty("left", "");
                    this.$.items.style.setProperty("right", "");
                }
            });
            document.addEventListener("click", e => {
                if (e.target !== this) {
                    this.$.items.setAttribute("shrink", "");
                    this.$.container.style.setProperty("outline", "unset");
                    this.$.items.querySelectorAll("button").forEach(b => {
                        b.setAttribute("disabled", "");
                    });
                    if (this.$.text.value.trim()) {
                        this.$.label.style.setProperty("top", "10px");
                        this.$.label.style.setProperty("font-size", "12px");
                    } else {
                        this.$.label.style.setProperty("top ", "");
                        this.$.label.style.setProperty("font-size", "");
                    }
                }
            });
        },
        detach() {
            this.$.arrow[0].removeEventListener("click", () => {});
            this.$.arrow[1].removeEventListener("click", () => {});
            this.$.arrow[2].removeEventListener("click", () => {});
            this.$.arrow[3].removeEventListener("click", () => {});
            this.$.text.removeEventListener("change", () => {});
            this.$.text.removeEventListener("click", () => {});
            this.$.text.removeEventListener("focus", () => {});
            this.$.icon.removeEventListener("click", () => {});
            this.$.text.removeEventListener("blur", () => {});
            this.$.btn[0].removeEventListener("click", () => {});
            this.$.btn[1].removeEventListener("click", () => {});
            this.$.set.removeEventListener("click", () => {});
            document.removeEventListener("click", () => {});
            window.removeEventListener("resize", () => {});
        }
    }

    static styles = `
        /* Globals */
        #xo-container section,
        #xo-arrow,
        #xo-icon,
        #xo-btn,
        #xo-set,
        #xo-text {
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
            transition: top .3s ease-in-out, font-size .3s ease-in-out;
            transform: translateY(-50%);
            color: rgb(117, 117, 117);
            pointer-events: none;
            position: absolute;
            margin-left: 9.5px;
            font-size: 18px;
            top: 50%;
            left: 0;
        }
        /* Icon */
        #xo-icon {
            margin-right: 12px;
            width: max-content;
            cursor: pointer;
            display: flex;
        }
        #xo-icon:focus {
            outline: auto;
        }
        #xo-icon svg {
            width: 16px;
            height: 16px;
            fill: #1d1d1d;
        }
        /* Items */
        #xo-items {
            transition: top .3s ease-in-out, bottom .3s ease-in-out, opacity .3s ease-in-out;
            box-shadow: 0px 1px 5px 2px #00000045;
            align-content: space-between;
            justify-content: center;
            background: #ffffff;
            pointer-events: all;
            position: absolute;
            border-radius: 5px;
            min-width: 290px;
            overflow: hidden;
            flex-wrap: wrap;
            padding: 10px;
            display: flex;
            width: 100%;
            opacity: 1;
            z-index: 2;
            top: 110%;
            left: 0;
            gap: 20px;
            flex-direction: column;
            align-items: center;
        }
        #xo-items[shrink] {
            top: 200%;
            opacity: 0;
            pointer-events: none;
        }
        /* Controls */
        #xo-controls {
            width: 250px;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            align-items: center;
        }
        #xo-controls div {
            width: max-content;
            display: flex;
            gap: 10px;
        }
        /* Arrows */
        #xo-arrow {
            display: flex;
            cursor: pointer;
            width: 20px;
            height: 20px;
            cursor: pointer;
        }
        /* Btns */
        #xo-btn,
        #xo-set {
            display: flex;
            font-size: 20px;
            padding: 2px 5px;
            color: #1d1d1d;
            border-radius: 5px;
            cursor: pointer;
        }
        :host([theme="water"]) #xo-btn:hover,
        :host([theme="water"]) #xo-set:hover {
            background: var(--watertLight);
        }
        :host([theme="fire"]) #xo-btn:hover,
        :host([theme="fire"]) #xo-set:hover {
            background: var(--firetLight);
        }
        :host([theme="earth"]) #xo-btn:hover,
        :host([theme="earth"]) #xo-set:hover {
            background: var(--earthtLight);
        }
        :host([theme="forest"]) #xo-btn:hover,
        :host([theme="forest"]) #xo-set:hover {
            background: var(--foresttLight);
        }
        :host([theme="night"]) #xo-btn:hover,
        :host([theme="night"]) #xo-set:hover {
            background: var(--nighttLight);
        }
        #xo-btn:hover,
        #xo-set:hover {
            background: var(--defaultLight);
        }
        :host([theme="water"]) #xo-btn[active] {
            background: var(--water);
            color: #fff;
        }
        :host([theme="fire"]) #xo-btn[active] {
            background: var(--fire);
            color: #fff;
        }
        :host([theme="earth"]) #xo-btn[active] {
            background: var(--earth);
        }
        :host([theme="forest"]) #xo-btn[active] {
            background: var(--forest);
            color: #fff;
        }
        :host([theme="night"]) #xo-btn[active] {
            background: var(--night);
            color: #fff;
        }
        #xo-btn[active] {
            background: var(--default);
        }
        #xo-arrow:focus,
        #xo-btn:focus,
        #xo-set:focus {
            outline: auto;
        }
        /* Clock */
        :host([theme="water"]) #xo-clock {
            border-color: var(--waterDark);
            background: var(--waterLight)
        }
        :host([theme="fire"]) #xo-clock {
            border-color: var(--fireDark);
            background: var(--fireLight)
        }
        :host([theme="earth"]) #xo-clock {
            border-color: var(--earthDark);
            background: var(--earthLight)
        }
        :host([theme="forest"]) #xo-clock {
            border-color: var(--forestDark);
            background: var(--forestLight)
        }
        :host([theme="night"]) #xo-clock {
            border-color: var(--nightDark);
            background: var(--nightLight)
        }
        #xo-clock {
            width: 260px;
            height: 260px;
            border-radius: 50%;
            position: relative;
            border: 14px solid var(--defaultDark);
            background: var(--defaultLight);
            box-shadow: inset 10px 10px 10px #00000012, inset 5px -5px 5px #00000012, inset -5px -5px 5px #b5b5b512, inset -10px 10px 10px #b5b5b512;
        }
        :host([theme="water"]) #xo-clock::after {
            background: radial-gradient(#fff, var(--waterDark) 50%);
        }
        :host([theme="fire"]) #xo-clock::after {
            background: radial-gradient(#fff, var(--fireDark) 50%);
        }
        :host([theme="earth"]) #xo-clock::after {
            background: radial-gradient(#fff, var(--earthDark) 50%);
        }
        :host([theme="forest"]) #xo-clock::after {
            background: radial-gradient(#fff, var(--forestDark) 50%);
        }
        :host([theme="night"]) #xo-clock::after {
            background: radial-gradient(#fff, var(--nightDark) 50%);
        }
        #xo-clock::after {
            content: "";
            width: 20px;
            height: 20px;
            top: 50%;
            left: 50%;
            background: radial-gradient(#fff, var(--defaultDark) 50%);
            position: absolute;
            border-radius: 50%;
            z-index: 1000;
            transform: translate(-50%, -50%);
        }
        #xo-row,
        #xo-minirow {
            position: absolute;
            top: 50%;
            left: 50%;
            display: flex;
            flex-direction: column;
            height: 96%;
            justify-content: space-between;
            transform: translate(-50%, -50%) rotate(calc(var(--rotate) * 1deg));
        }
        #xo-row {
            height: 84%;
        }
        #xo-row span {
            text-align: center;
            font-weight: bolder;
            font-size: 20px;
            transform: rotate(calc(var(--rotate) * 1deg));
            color: #1d1d1d;
        }
        #xo-minirow span {
            width: 4px;
            background: #1d1d1d;
            height: 6px;
            border-radius: 5px;
        }
        #xo-minirow[tall] span {
            height: 12px;
        }
        /* Hand */
        :host([theme="water"]) #xo-hand {
            background: var(--waterDark);
        }
        :host([theme="fire"]) #xo-hand {
            background: var(--fireDark);
        }
        :host([theme="earth"]) #xo-hand {
            background: var(--earthDark);
        }
        :host([theme="forest"]) #xo-hand {
            background: var(--forestDark);
        }
        :host([theme="night"]) #xo-hand {
            background: var(--nightDark);
        }
        #xo-hand {
            --rotate: 0;
            position: absolute;
            bottom: 50%;
            left: 50%;
            transform-origin: bottom;
            z-index: 10;
            border-radius: 5px;
            transform: translateX(-50%) rotate(calc(var(--rotate) * 1deg));
            background: var(--defaultDark);
            width: 4px;
            height: 42%;
            transition: transform 0.3s ease-in-out;
        }
        #xo-hand[hors] {
            --rotate: 20;
            height: 29%;
        }
        :host([theme="water"]) #xo-hand::before,
        :host([theme="water"]) #xo-hand::after {
            border-bottom-color: var(--waterDark);
        }
        :host([theme="fire"]) #xo-hand::before,
        :host([theme="fire"]) #xo-hand::after {
            border-bottom-color: var(--fireDark);
        }
        :host([theme="earth"]) #xo-hand::before,
        :host([theme="earth"]) #xo-hand::after {
            border-bottom-color: var(--earthDark);
        }
        :host([theme="forest"]) #xo-hand::before,
        :host([theme="forest"]) #xo-hand::after {
            border-bottom-color: var(--forestDark);
        }
        :host([theme="night"]) #xo-hand::before,
        :host([theme="night"]) #xo-hand::after {
            border-bottom-color: var(--nightDark);
        }
        #xo-hand::before,
        #xo-hand::after {
            content: "";
            position: absolute;
            top: -8px;
            left: 50%;
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
            border-bottom: 20px solid var(--defaultDark);
            transform: translateX(-50%);
            border-radius: 20px;
        }
        :host([theme="water"]) #xo-hand::after {
            border-color: var(--waterDark);
        }
        :host([theme="fire"]) #xo-hand::after {
            border-color: var(--fireDark);
        }
        :host([theme="earth"]) #xo-hand::after {
            border-color: var(--earthDark);
        }
        :host([theme="forest"]) #xo-hand::after {
            border-color: var(--forestDark);
        }
        :host([theme="night"]) #xo-hand::after {
            border-color: var(--nightDark);
        }
        #xo-hand::after {
            top: 10px;
            border-radius: 50%;
            border: 5px solid var(--defaultDark);
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
            ;
        }        
        @media (max-width: 767.98px) {
            /* Container */
            #xo-container {
                position: initial;
            }
            /* Items */
            #xo-items {
                position: fixed;
                top: unset;
                bottom: 0;
            }
            #xo-items[shrink] {
                bottom: -100%;
                top: unset;
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
            /* items */
            #xo-items {
                {{--xo-items}}
            }
            #xo-items:hover {
                {{--xo-items-hover}}
            }
            /* Arrows */
            #xo-arrow{
                {{--xo-arrows}}
            }
            #xo-arrow:hover {
                {{--xo-arrows-hover}}
            }
            /* Btns */
            #xo-btn {
                {{--xo-btn}}
            }
            #xo-btn:hover {
                {{--xo-btn-hover}}
            }
            #xo-btn[active] {
                {{--xo-btn-active}}
            }
            #xo-btn[active]:hover {
                {{--xo-btn-active-hover}}
            }
            /* clock */
            #xo-clock {
                {{--xo-clock}}
            }
            #xo-clock:hover {
                {{--xo-clock-hover}}
            }
            /* set */
            #xo-set {
                {{--xo-set}}
            }
            #xo-set:hover {
                {{--xo-set-hover}}
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
                    <input type="text" id="xo-text" readonly>
                    <label for="xo-text" id="xo-label"></label>
                </section>
                <button id="xo-icon">
                    <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000.000000 1000.000000" preserveAspectRatio="xMidYMid meet">
                        <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
                            <path d="M4935 9989 c-204 -25 -380 -168 -452 -370 -26 -71 -27 -84 -31 -322 -4 -243 -4 -247 -26 -251 -11 -3 -55 -10 -96 -16 -490 -76 -1025 -267 -1468 -522 -239 -138 -420 -265 -669 -470 l-81 -68 -114 116 c-62 63 -113 119 -113 123 0 4 207 218 460 474 253 257 461 471 463 476 2 5 -34 41 -80 81 -447 388 -1051 507 -1603 317 -247 -85 -474 -232 -660 -429 -259 -273 -406 -587 -452 -967 -28 -227 2 -510 78 -733 69 -204 200 -429 329 -568 l60 -65 505 510 504 510 67 -65 c36 -36 88 -91 115 -123 l50 -59 -49 -56 c-536 -633 -894 -1436 -1011 -2274 -46 -325 -53 -807 -16 -1123 106 -912 452 -1717 1042 -2421 168 -200 441 -463 641 -618 34 -27 62 -51 62 -53 0 -2 -47 -97 -105 -212 -135 -271 -149 -311 -142 -422 3 -68 10 -98 35 -150 74 -156 233 -249 402 -236 92 7 170 42 245 109 59 54 69 71 165 265 56 115 103 209 104 211 2 1 62 -25 134 -57 615 -280 1237 -405 1932 -388 307 8 515 32 795 94 321 70 600 163 888 293 l128 59 101 -202 c55 -111 117 -222 138 -247 94 -112 262 -165 405 -126 148 39 250 138 296 287 41 132 24 199 -122 492 l-114 229 31 26 c17 15 80 67 140 116 138 113 432 406 556 556 533 644 875 1405 997 2220 37 247 46 379 45 675 -1 502 -65 923 -211 1380 -87 274 -243 627 -383 870 -112 193 -290 449 -437 626 -35 42 -63 81 -63 86 0 12 183 193 195 193 6 0 227 -219 492 -487 l483 -488 55 60 c345 374 492 931 385 1455 -186 913 -1096 1508 -1980 1295 -286 -70 -528 -198 -745 -398 l-50 -46 195 -198 c107 -109 327 -331 488 -493 l292 -295 -104 -104 -104 -104 -49 45 c-286 264 -813 588 -1228 756 -274 110 -635 212 -916 257 -90 14 -174 28 -186 31 -23 4 -23 5 -23 217 0 239 -10 308 -61 414 -44 93 -159 208 -251 251 -105 49 -193 64 -303 51z m370 -2029 c804 -69 1557 -430 2109 -1011 509 -536 817 -1194 913 -1954 24 -192 24 -576 -1 -770 -47 -372 -138 -702 -281 -1015 -477 -1041 -1429 -1761 -2545 -1924 -409 -60 -861 -37 -1263 64 -766 193 -1435 656 -1907 1320 -141 198 -301 502 -393 745 -300 794 -285 1724 38 2489 191 453 428 801 776 1141 342 334 719 568 1191 738 223 81 569 157 808 176 141 12 419 12 555 1z"></path>
                            <path d="M4930 7491 c-78 -25 -151 -89 -184 -160 l-21 -46 0 -1315 0 -1315 21 -45 c26 -54 83 -114 138 -143 l41 -22 765 0 765 0 47 23 c54 27 123 98 145 150 8 20 15 61 16 92 1 145 -87 254 -227 279 -38 7 -259 11 -608 11 l-548 0 -2 1143 -3 1142 -28 57 c-28 57 -72 100 -137 133 -38 20 -141 29 -180 16z"></path>
                        </g>
                    </svg>
                </button>
                <div id="xo-items" shrink>
                    <div id="xo-controls">
                        <div>
                            <button id="xo-arrow">
                                <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000.000000 1000.000000" preserveAspectRatio="xMidYMid meet">
                                    <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
                                        <path d="M6927 9980 c-141 -25 -265 -80 -381 -167 -80 -60 -4242 -4222 -4293 -4293 -64 -88 -100 -158 -133 -260 -27 -81 -33 -114 -37 -225 -7 -190 33 -346 128 -495 31 -49 578 -602 2168 -2193 1169 -1171 2153 -2148 2187 -2172 77 -56 157 -96 264 -131 76 -25 100 -27 230 -28 123 -1 157 3 225 22 105 30 245 100 321 161 125 100 246 288 291 451 25 92 25 339 -1 430 -22 81 -73 191 -122 267 -25 38 -562 583 -1574 1598 -1650 1653 -1580 1578 -1645 1745 -67 171 -74 395 -17 570 68 208 -45 85 1661 1795 970 972 1551 1560 1573 1595 113 176 155 328 145 529 -7 139 -24 206 -82 328 -108 222 -309 390 -545 454 -85 23 -284 33 -363 19z"></path>
                                    </g>
                                </svg>
                            </button>
                            <button id="xo-arrow">
                                <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000.000000 1000.000000" preserveAspectRatio="xMidYMid meet">
                                    <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
                                        <path d="M2747 9971 c-247 -54 -469 -232 -582 -464 -58 -122 -75 -189 -82 -328 -10 -201 32 -353 145 -529 22 -35 603 -624 1573 -1595 1706 -1710 1593 -1587 1661 -1795 57 -175 50 -399 -17 -570 -65 -167 5 -92 -1645 -1745 -1012 -1015 -1549 -1560 -1574 -1598 -49 -76 -100 -186 -122 -267 -14 -50 -19 -101 -19 -215 0 -175 12 -231 80 -372 106 -218 292 -377 530 -449 81 -25 105 -28 240 -28 137 0 157 3 235 28 107 35 185 74 269 133 78 54 4233 4205 4303 4298 66 88 103 158 139 265 77 230 38 521 -97 726 -34 52 -579 603 -2167 2192 -1167 1168 -2149 2143 -2182 2167 -80 57 -188 110 -277 135 -108 31 -295 36 -411 11z"></path>
                                    </g>
                                </svg>
                            </button>
                        </div>
                        <div>
                            <button id="xo-btn">AM</button>
                            <button id="xo-btn">PM</button>
                        </div>
                        <div>
                            <button id="xo-arrow">
                                <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000.000000 1000.000000" preserveAspectRatio="xMidYMid meet">
                                    <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
                                        <path d="M6927 9980 c-141 -25 -265 -80 -381 -167 -80 -60 -4242 -4222 -4293 -4293 -64 -88 -100 -158 -133 -260 -27 -81 -33 -114 -37 -225 -7 -190 33 -346 128 -495 31 -49 578 -602 2168 -2193 1169 -1171 2153 -2148 2187 -2172 77 -56 157 -96 264 -131 76 -25 100 -27 230 -28 123 -1 157 3 225 22 105 30 245 100 321 161 125 100 246 288 291 451 25 92 25 339 -1 430 -22 81 -73 191 -122 267 -25 38 -562 583 -1574 1598 -1650 1653 -1580 1578 -1645 1745 -67 171 -74 395 -17 570 68 208 -45 85 1661 1795 970 972 1551 1560 1573 1595 113 176 155 328 145 529 -7 139 -24 206 -82 328 -108 222 -309 390 -545 454 -85 23 -284 33 -363 19z"></path>
                                    </g>
                                </svg>
                            </button>
                            <button id="xo-arrow">
                                <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000.000000 1000.000000" preserveAspectRatio="xMidYMid meet">
                                    <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
                                        <path d="M2747 9971 c-247 -54 -469 -232 -582 -464 -58 -122 -75 -189 -82 -328 -10 -201 32 -353 145 -529 22 -35 603 -624 1573 -1595 1706 -1710 1593 -1587 1661 -1795 57 -175 50 -399 -17 -570 -65 -167 5 -92 -1645 -1745 -1012 -1015 -1549 -1560 -1574 -1598 -49 -76 -100 -186 -122 -267 -14 -50 -19 -101 -19 -215 0 -175 12 -231 80 -372 106 -218 292 -377 530 -449 81 -25 105 -28 240 -28 137 0 157 3 235 28 107 35 185 74 269 133 78 54 4233 4205 4303 4298 66 88 103 158 139 265 77 230 38 521 -97 726 -34 52 -579 603 -2167 2192 -1167 1168 -2149 2143 -2182 2167 -80 57 -188 110 -277 135 -108 31 -295 36 -411 11z"></path>
                                    </g>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div id="xo-clock">
                        <div id="xo-hand" mins></div>
                        <div id="xo-hand" hors></div>
                        <div id="xo-row" style="--rotate: 0">
                            <span style="--rotate: 0">12</span>
                            <span style="--rotate: 0">06</span>
                        </div>
                        <div id="xo-row" style="--rotate: 30">
                            <span style="--rotate: -30">01</span>
                            <span style="--rotate: -30">07</span>
                        </div>
                        <div id="xo-row" style="--rotate: 60">
                            <span style="--rotate: -60">02</span>
                            <span style="--rotate: -60">08</span>
                        </div>
                        <div id="xo-row" style="--rotate: 90">
                            <span style="--rotate: -90">03</span>
                            <span style="--rotate: -90">09</span>
                        </div>
                        <div id="xo-row" style="--rotate: 120">
                            <span style="--rotate: -120">04</span>
                            <span style="--rotate: -120">10</span>
                        </div>
                        <div id="xo-row" style="--rotate: 150">
                            <span style="--rotate: -150">05</span>
                            <span style="--rotate: -150">11</span>
                        </div>
                        <div id="xo-minirow" style="--rotate: 0" tall>
                            <span></span>
                            <span></span>
                        </div>
                        <div id="xo-minirow" style="--rotate: 6">
                            <span></span>
                            <span></span>
                        </div>
                        <div id="xo-minirow" style="--rotate: 12">
                            <span></span>
                            <span></span>
                        </div>
                        <div id="xo-minirow" style="--rotate: 18">
                            <span></span>
                            <span></span>
                        </div>
                        <div id="xo-minirow" style="--rotate: 24">
                            <span></span>
                            <span></span>
                        </div>
                        <div id="xo-minirow" style="--rotate: 30" tall>
                            <span></span>
                            <span></span>
                        </div>
                        <div id="xo-minirow" style="--rotate: 36">
                            <span></span>
                            <span></span>
                        </div>
                        <div id="xo-minirow" style="--rotate: 42">
                            <span></span>
                            <span></span>
                        </div>
                        <div id="xo-minirow" style="--rotate: 48">
                            <span></span>
                            <span></span>
                        </div>
                        <div id="xo-minirow" style="--rotate: 54">
                            <span></span>
                            <span></span>
                        </div>
                        <div id="xo-minirow" style="--rotate: 60" tall>
                            <span></span>
                            <span></span>
                        </div>
                        <div id="xo-minirow" style="--rotate: 66">
                            <span></span>
                            <span></span>
                        </div>
                        <div id="xo-minirow" style="--rotate: 72">
                            <span></span>
                            <span></span>
                        </div>
                        <div id="xo-minirow" style="--rotate: 78">
                            <span></span>
                            <span></span>
                        </div>
                        <div id="xo-minirow" style="--rotate: 84">
                            <span></span>
                            <span></span>
                        </div>
                        <div id="xo-minirow" style="--rotate: 90" tall>
                            <span></span>
                            <span></span>
                        </div>
                        <div id="xo-minirow" style="--rotate: 96">
                            <span></span>
                            <span></span>
                        </div>
                        <div id="xo-minirow" style="--rotate: 102">
                            <span></span>
                            <span></span>
                        </div>
                        <div id="xo-minirow" style="--rotate: 108">
                            <span></span>
                            <span></span>
                        </div>
                        <div id="xo-minirow" style="--rotate: 114">
                            <span></span>
                            <span></span>
                        </div>
                        <div id="xo-minirow" style="--rotate: 120" tall>
                            <span></span>
                            <span></span>
                        </div>
                        <div id="xo-minirow" style="--rotate: 126">
                            <span></span>
                            <span></span>
                        </div>
                        <div id="xo-minirow" style="--rotate: 132">
                            <span></span>
                            <span></span>
                        </div>
                        <div id="xo-minirow" style="--rotate: 138">
                            <span></span>
                            <span></span>
                        </div>
                        <div id="xo-minirow" style="--rotate: 144">
                            <span></span>
                            <span></span>
                        </div>
                        <div id="xo-minirow" style="--rotate: 150" tall>
                            <span></span>
                            <span></span>
                        </div>
                        <div id="xo-minirow" style="--rotate: 156">
                            <span></span>
                            <span></span>
                        </div>
                        <div id="xo-minirow" style="--rotate: 162">
                            <span></span>
                            <span></span>
                        </div>
                        <div id="xo-minirow" style="--rotate: 168">
                            <span></span>
                            <span></span>
                        </div>
                        <div id="xo-minirow" style="--rotate: 174">
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    <section style="width: 100%;display: flex;justify-content: center;">
                        <button id="xo-set">SET</button>
                    </section>
                </div>
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

function __getTime__(h, m) {
    var AmOrPm = h >= 12 ? 'PM' : 'AM';
    h = (h % 12) || 12;
    return [h, m, AmOrPm];
}