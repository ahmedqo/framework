import XOElement from "./XO.Element.js"

var DATE = new Date();

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
        date: { default: null, type: Date },
        value: { default: "", type: String },
        day: { default: null, type: Number },
        Day: { default: null, type: String },
        weekDay: { default: null, type: Number },
        month: { default: null, type: Number },
        Month: { default: null, type: String },
        yearMonth: { default: null, type: Number },
        year: { default: null, type: Number },
        timestamp: { default: null, type: Number },
        change(n, v) {
            switch (n) {
                case "value":
                    if (!v) break;
                    this.$.text.value = v;
                    this.date = new Date(v);
                    this.timestamp = this.date.getTime();
                    this.Day = this.date.toString().split(" ")[0];
                    this.weekDay = this.date.getDay();
                    this.day = this.date.getDate();
                    this.Month = this.date.toString().split(" ")[1];
                    this.yearMonth = this.date.getMonth();
                    this.month = this.date.getMonth();
                    this.year = this.date.getFullYear();
                    this.$.label.style.setProperty("top", "10px");
                    this.$.label.style.setProperty("font-size", "12px");
                    __renderCalendar__(this, this.year, this.month, this.day);
                    var event = new CustomEvent("change", {
                        bubbles: true,
                        cancelable: true,
                    });
                    this.dispatchEvent(event);
                    break;
            }
        }
    }

    static callbacks = {
        create() {
            this.value = "";
            __renderCalendar__(this, this.year, this.month, this.day);
            if (this.getAttribute("value")) {
                var date = new Date(this.getAttribute("value")),
                    day = (date.getDate() < 10) ? "0" + date.getDate() : date.getDate(),
                    mon = ((date.getMonth() + 1) < 10) ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
                this.value = date.getFullYear() + "-" + mon + "-" + day;
                this.removeAttribute("value");
            }
            if ((window.innerWidth - this.offsetLeft) < 290) {
                this.$.items.style.setProperty("left", "unset");
                this.$.items.style.setProperty("right", "0");
            } else {
                this.$.items.style.setProperty("left", "");
                this.$.items.style.setProperty("right", "");
            }
        },
        attach() {
            this.$.text.addEventListener("blur", (e) => {
                if (e.target !== this) return;
                this.$.container.style.setProperty("outline", "unset");
                if (this.$.text.value.trim()) {
                    this.$.label.style.setProperty("top", "10px");
                    this.$.label.style.setProperty("font-size", "12px");
                } else {
                    this.$.label.style.setProperty("top", "");
                    this.$.label.style.setProperty("font-size", "");
                }
                setTimeout(() => {
                    this.$.items.setAttribute("shrink", "");
                }, 150);
            });
            this.$.text.addEventListener("focus", () => {
                if (this.matches("[blocked]") || this.matches("[read]")) return;
                this.$.container.style.setProperty("outline", "auto");
            });
            this.$.text.addEventListener("change", e => {
                this.value = e.target.value;
                if (this.$.text.value.trim()) {
                    this.$.label.style.setProperty("top", "10px");
                    this.$.label.style.setProperty("font-size", "12px");
                } else {
                    this.$.label.style.setProperty("top", "");
                    this.$.label.style.setProperty("font-size", "");
                }
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
            this.$.items.addEventListener("click", e => {
                if (e.path[0].id === "xo-day") {
                    this.value = e.path[0].getAttribute("date");
                    this.$.container.style.setProperty("outline", "unset");
                    this.$.items.querySelectorAll("button").forEach(b => {
                        b.setAttribute("disabled", "");
                    });
                    this.$.items.setAttribute("shrink", "");
                    if (this.$.text.value.trim()) {
                        this.$.label.style.setProperty("top", "10px");
                        this.$.label.style.setProperty("font-size", "12px");
                    } else {
                        this.$.label.style.setProperty("top", "");
                        this.$.label.style.setProperty("font-size", "");
                    }
                }
            })
            this.$.arrow[0].addEventListener("click", () => {
                DATE.setMonth(DATE.getMonth() - 1);
                __renderCalendar__(this, this.year, this.month, this.day);
                this.$.items.querySelectorAll("button").forEach(b => {
                    b.removeAttribute("disabled");
                });
            });
            this.$.arrow[1].addEventListener("click", () => {
                DATE.setMonth(DATE.getMonth() + 1);
                __renderCalendar__(this, this.year, this.month, this.day);
                this.$.items.querySelectorAll("button").forEach(b => {
                    b.removeAttribute("disabled");
                });
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
            this.$.items.removeEventListener("click", () => {});
            this.$.text.removeEventListener("change", () => {});
            this.$.text.removeEventListener("focus", () => {});
            this.$.text.removeEventListener("click", () => {});
            this.$.text.removeEventListener("blur", () => {});
            this.$.icon.removeEventListener("click", () => {});
            document.removeEventListener("click", () => {});
            window.removeEventListener("resize", () => {});
        }
    }

    static styles = `   
        /* Globals */
        #xo-container section,
        #xo-day,
        #xo-icon, 
        #xo-arrow,
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
            fill: var(--color);
        }
        /* Items */
        #xo-items {
            transition: top .3s ease-in-out, bottom .3s ease-in-out, opacity .3s ease-in-out;
            box-shadow: 0px 1px 5px 2px #00000045;
            background: #ffffff;
            pointer-events: all;
            position: absolute;
            border-radius: 5px;
            min-width: 290px;
            overflow: hidden;
            flex-wrap: wrap;
            display: flex;
            width: 100%;
            opacity: 1;
            z-index: 2;
            top: 110%;
            left: 0;
        }
        #xo-items[shrink] {
            top: 200%;
            opacity: 0;
            pointer-events: none;
        }
        /* Header */
        :host([theme="water"]) #xo-header {
            background: var(--water);
            --color: #fff;
        }
        :host([theme="fire"]) #xo-header {
            background: var(--fire);
            --color: #fff;
        }
        :host([theme="earth"]) #xo-header {
            background: var(--earth);
        }
        :host([theme="forest"]) #xo-header {
            background: var(--forest);
            --color: #fff;
        }
        :host([theme="night"]) #xo-header {
            background: var(--night);
            --color: #fff;
        }
        #xo-header {
            --color: #1d1d1d;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 20px 10px;
            background: var(--default);
            width: 100%;
        }
        /* Arrow */
        #xo-arrow {
            display: flex;
            width: 20px;
            height: 20px;
            cursor: pointer;
        }
        #xo-arrow:focus {
            outline: auto;
        }
        #xo-arrow svg {
            fill: var(--color);
        }
        #xo-date {
            font-weight: bolder;
            font-size: 20px;
            color: var(--color);
        }
        /* Week */
        #weekdays {
            display: flex;
            justify-content: space-around;
            padding: 5px;
            flex-wrap: wrap;
            width: 100%;
        }
        #weekdays div {
            width: calc(100% / 7);
            text-align: center;
            font-weight: bolder;
            font-size: 14px;
        }
        /* Days */
        #days {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            padding: 5px;
            padding-top: 0;
        }
        :host([theme="water"]) #xo-day {
            box-shadow: 0 0 4px 1px var(--water) inset;
        }
        :host([theme="fire"]) #xo-day {
            box-shadow: 0 0 4px 1px var(--fire) inset;
        }
        :host([theme="earth"]) #xo-day {
            box-shadow: 0 0 4px 1px var(--earth) inset;
        }
        :host([theme="forest"]) #xo-day {
            box-shadow: 0 0 4px 1px var(--forest) inset;
        }
        :host([theme="night"]) #xo-day {
            box-shadow: 0 0 4px 1px var(--night) inset;
        }
        #xo-day {
            font-size: 16px;
            font-weight: 500;
            width: calc((100% / 7) - 10px);
            display: flex;
            color: #1d1d1d;
            padding: 5px;
            box-sizing: border-box;
            box-shadow: 0 0 4px 1px var(--default) inset;
            border-radius: 5px;
            margin: 5px;
            justify-content: center;
        }
        #xo-day:focus {
            outline: auto;
        }
        #xo-day:hover:not([active]) {
            background: var(--defaultLight);
            cursor: pointer;
        }
        :host([theme="water"])  #xo-day:hover:not([active]) {
            background: var(--waterLight);
        }
        :host([theme="fire"])  #xo-day:hover:not([active]) {
            background: var(--fireLight);
        }
        :host([theme="earth"])  #xo-day:hover:not([active]) {
            background: var(--earthLight);
        }
        :host([theme="forest"])  #xo-day:hover:not([active]) {
            background: var(--forestLight);
        }
        :host([theme="night"])  #xo-day:hover:not([active]) {
            background: var(--nightLight);
        }
        #xo-day[active] {
            background: var(--default);
        }
        :host([theme="water"]) #xo-day[active] {
            background: var(--water);
            color: #fff;
        }
        :host([theme="fire"]) #xo-day[active] {
            background: var(--fire);
            color: #fff;
        }
        :host([theme="earth"]) #xo-day[active] {
            background: var(--earth);
        }
        :host([theme="forest"]) #xo-day[active] {
            background: var(--forest);
            color: #fff;
        }
        :host([theme="night"]) #xo-day[active] {
            background: var(--night);
            color: #fff;
        }
        #xo-day[on] {
            color: blue;
        }
        #xo-day[off] {
            opacity: 0;
            pointer-events: none;
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
            /* Items */
            #xo-items {
                {{--xo-items}}
            }
            #xo-items:hover {
                {{--xo-items-hover}}
            }
            /* header */
            #xo-header {
                {{--xo-header}}
            }
            #xo-header:hover {
                {{--xo-header-hover}}
            }
            #xo-date {
                {{--xo-date}}
            }
            #xo-date:hover {
                {{--xo-date-hover}}
            }
            /* arrow */
            #xo-arrow {
                {{--xo-arrow}}
            }
            #xo-arrow:hover {
                {{--xo-arrow-hover}}
            }
            #xo-arrow svg {
                {{--xo-arrow-svg}}
            }
            #xo-arrow:hover svg {
                {{--xo-arrow-svg-hover}}
            }
            /* WeekDays */
            #weekdays div{
                {{--xo-weekday}}
            }
            #weekdays div:hover {
                {{--xo-weekday-hover}}
            }
            /* day */
            #xo-day {
                {{--xo-day}}
            }
            #xo-day:hover {
                {{--xo-day-hover}}
            }
            #xo-day[active] {
                {{--xo-day-active}}
            }
            #xo-day[active]:hover {
                {{--xo-day-active-hover}}
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
                        <g transform="translate(0.000000,855.000000) scale(0.100000,-0.100000)">
                            <path d="M2326 8523 c-140 -42 -256 -156 -317 -308 l-24 -60 -3 -545 c-2 -385 0 -563 8 -605 37 -190 185 -346 371 -390 119 -28 221 -14 339 45 117 59 225 206 250 339 6 31 10 271 10 580 0 436 -3 537 -16 591 -38 164 -173 307 -333 354 -69 20 -219 20 -285 -1z"></path>
                            <path d="M4850 8521 c-113 -36 -232 -136 -284 -240 -55 -107 -56 -121 -56 -703 0 -356 4 -555 11 -590 25 -117 97 -226 198 -297 201 -141 463 -114 630 64 65 70 81 96 114 184 20 54 21 77 25 590 2 371 0 555 -8 602 -14 80 -64 190 -111 244 -55 62 -145 123 -216 145 -84 26 -224 26 -303 1z"></path>
                            <path d="M7374 8520 c-91 -30 -199 -111 -251 -190 -84 -125 -83 -116 -83 -754 0 -611 0 -607 58 -721 34 -67 135 -165 210 -203 272 -135 598 11 686 307 14 47 16 129 16 617 0 532 -1 565 -20 626 -41 133 -134 238 -266 300 -63 30 -79 33 -179 35 -88 2 -122 -1 -171 -17z"></path>
                            <path d="M850 7653 c-84 -14 -221 -58 -292 -94 -113 -56 -189 -112 -279 -205 -124 -128 -199 -260 -251 -440 l-23 -79 0 -2990 c0 -2829 1 -2994 18 -3065 56 -239 217 -472 417 -605 84 -56 214 -114 315 -141 68 -18 189 -19 4240 -19 l4170 0 82 22 c174 46 328 136 459 267 133 134 219 286 266 472 l23 89 0 2970 0 2970 -28 100 c-107 391 -390 658 -785 740 -59 12 -159 15 -522 15 l-448 0 -5 -357 c-4 -395 -7 -413 -72 -546 -79 -160 -226 -287 -405 -349 -56 -20 -84 -23 -210 -22 -132 0 -152 3 -219 27 -182 66 -336 214 -408 390 -45 110 -52 186 -53 535 l0 322 -580 0 -580 0 0 -336 c0 -381 -5 -424 -71 -561 -166 -347 -587 -486 -932 -306 -98 51 -229 182 -279 278 -73 141 -78 175 -78 572 l0 353 -585 0 -585 0 0 -347 c0 -379 -4 -413 -61 -540 -74 -165 -239 -311 -414 -366 -59 -18 -93 -22 -210 -22 -127 1 -147 3 -215 28 -109 40 -175 82 -260 167 -88 87 -149 195 -180 316 -18 69 -20 112 -20 421 l0 343 -457 -1 c-252 -1 -469 -4 -483 -6z m7440 -1858 c184 -43 364 -186 448 -355 84 -169 77 19 77 -2090 l0 -1875 -28 -80 c-40 -114 -100 -210 -177 -285 -80 -77 -152 -122 -263 -164 l-82 -31 -3225 -3 c-2319 -2 -3243 0 -3290 8 -241 41 -449 219 -537 458 l-28 77 -3 1875 c-3 2077 -7 1943 62 2086 94 196 264 334 466 380 43 9 763 12 3285 13 2856 1 3238 -1 3295 -14z"></path>
                            <path d="M2045 5220 c-160 -33 -282 -129 -354 -280 l-36 -75 -3 -310 c-3 -213 0 -327 8 -365 39 -179 200 -336 379 -370 31 -6 230 -10 475 -10 347 0 432 3 481 15 188 49 333 206 365 395 19 111 8 588 -14 660 -53 167 -197 300 -363 335 -54 12 -156 14 -483 14 -228 -1 -433 -5 -455 -9z"></path>
                            <path d="M4521 5214 c-173 -37 -309 -162 -361 -332 -18 -58 -20 -93 -20 -361 0 -244 3 -307 16 -352 51 -170 180 -298 343 -341 94 -24 894 -27 986 -3 182 48 318 187 361 371 13 57 15 117 12 354 -4 262 -6 290 -26 344 -62 167 -196 287 -361 322 -94 20 -857 19 -950 -2z"></path>
                            <path d="M7011 5214 c-93 -20 -167 -60 -236 -129 -68 -68 -107 -135 -130 -220 -22 -85 -22 -605 0 -690 46 -175 196 -317 373 -354 34 -7 206 -11 475 -11 342 0 434 3 480 15 183 48 314 178 362 361 21 81 21 558 0 657 -39 185 -187 333 -372 372 -96 21 -858 20 -952 -1z"></path>
                            <path d="M2045 3040 c-160 -33 -282 -129 -354 -280 l-36 -75 -3 -318 c-3 -346 0 -372 55 -481 32 -63 132 -163 200 -199 97 -52 149 -57 601 -57 464 0 506 4 609 66 111 67 185 156 225 272 22 64 23 80 23 367 0 262 -2 308 -18 360 -52 170 -196 305 -364 340 -54 12 -156 14 -483 14 -228 -1 -433 -5 -455 -9z"></path>
                            <path d="M4521 3034 c-173 -37 -309 -162 -361 -332 -18 -58 -20 -93 -20 -362 0 -269 2 -304 20 -362 46 -149 156 -264 309 -321 53 -20 77 -21 491 -25 300 -2 454 0 495 8 192 37 346 185 391 376 13 57 15 117 12 354 -4 262 -6 290 -26 344 -62 167 -196 287 -361 322 -94 20 -857 19 -950 -2z"></path>
                            <path d="M7011 3034 c-93 -20 -167 -60 -237 -130 -67 -67 -116 -155 -134 -239 -7 -36 -10 -158 -8 -357 l3 -303 28 -66 c54 -127 158 -227 292 -280 59 -23 65 -24 495 -27 480 -4 512 -1 626 53 130 63 238 202 264 344 16 85 12 553 -5 634 -39 185 -187 333 -372 372 -96 21 -858 20 -952 -1z"></path>
                        </g>
                    </svg>
                </button>
                <div id="xo-items" shrink>
                    <div id="xo-header">
                        <div id="xo-date"></div>
                        <div style="display: flex; gap: 10px;">
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
                    <div id="weekdays">
                        <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
                    </div>
                    <div id="days"></div>
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

function __renderCalendar__(el, y, m, d) {
    DATE.setDate(1);
    const monthDays = el.query("#days");

    const lastDay = new Date(
        DATE.getFullYear(),
        DATE.getMonth() + 1,
        0
    ).getDate();

    const firstDayIndex = DATE.getDay();

    const lastDayIndex = new Date(
        DATE.getFullYear(),
        DATE.getMonth() + 1,
        0
    ).getDay();

    const nextDays = 7 - lastDayIndex - 1;

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    el.$.date.innerHTML = months[DATE.getMonth()] + ", " + DATE.getFullYear();
    let days = "";

    for (let x = firstDayIndex; x > 0; x--) {
        days += `<div id="xo-day" off></div>`;
    }

    for (let i = 1; i <= lastDay; i++) {
        var day = (i < 10) ? "0" + i : i,
            mon = ((DATE.getMonth() + 1) < 10) ? "0" + (DATE.getMonth() + 1) : (DATE.getMonth() + 1);
        if (
            i === d && DATE.getMonth() === m && DATE.getFullYear() === y
        ) {
            days += `<button id="xo-day" date="${DATE.getFullYear()}-${mon}-${day}" active>${day}</button>`;
        } else if (
            i === new Date().getDate() && DATE.getMonth() === new Date().getMonth() && DATE.getFullYear() === new Date().getFullYear()
        ) {
            days += `<button id="xo-day" date="${DATE.getFullYear()}-${mon}-${day}" on>${day}</button>`;
        } else {
            days += `<button id="xo-day" date="${DATE.getFullYear()}-${mon}-${day}">${day}</button>`;
        }
    }

    for (let j = 1; j <= nextDays; j++) {
        days += `<div id="xo-day" off></div>`;
    }

    monthDays.innerHTML = days;

    el.$.items.querySelectorAll("button").forEach(b => {
        b.setAttribute("disabled", "");
    });
}