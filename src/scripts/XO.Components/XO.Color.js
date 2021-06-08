import XOElement from "./XO.Element.js"

var PALLETE = `
    <button data-color="#000000" id="xo-item"></button>
    <button data-color="#444444" id="xo-item"></button>
    <button data-color="#666666" id="xo-item"></button>
    <button data-color="#999999" id="xo-item"></button>
    <button data-color="#cccccc" id="xo-item"></button>
    <button data-color="#eeeeee" id="xo-item"></button>
    <button data-color="#f3f3f3" id="xo-item"></button>
    <button data-color="#ffffff" id="xo-item"></button>
    <button data-color="#f4cccc" id="xo-item"></button>
    <button data-color="#fce5cd" id="xo-item"></button>
    <button data-color="#fff2cc" id="xo-item"></button>
    <button data-color="#d9ead3" id="xo-item"></button>
    <button data-color="#d0e0e3" id="xo-item"></button>
    <button data-color="#cfe2f3" id="xo-item"></button>
    <button data-color="#d9d2e9" id="xo-item"></button>
    <button data-color="#ead1dc" id="xo-item"></button>
    <button data-color="#ea9999" id="xo-item"></button>
    <button data-color="#f9cb9c" id="xo-item"></button>
    <button data-color="#ffe599" id="xo-item"></button>
    <button data-color="#b6d7a8" id="xo-item"></button>
    <button data-color="#a2c4c9" id="xo-item"></button>
    <button data-color="#9fc5e8" id="xo-item"></button>
    <button data-color="#b4a7d6" id="xo-item"></button>
    <button data-color="#d5a6bd" id="xo-item"></button>
    <button data-color="#e06666" id="xo-item"></button>
    <button data-color="#f6b26b" id="xo-item"></button>
    <button data-color="#ffd966" id="xo-item"></button>
    <button data-color="#93c47d" id="xo-item"></button>
    <button data-color="#76a5af" id="xo-item"></button>
    <button data-color="#6fa8dc" id="xo-item"></button>
    <button data-color="#8e7cc3" id="xo-item"></button>
    <button data-color="#c27ba0" id="xo-item"></button>
    <button data-color="#cc0000" id="xo-item"></button>
    <button data-color="#e69138" id="xo-item"></button>
    <button data-color="#f1c232" id="xo-item"></button>
    <button data-color="#6aa84f" id="xo-item"></button>
    <button data-color="#45818e" id="xo-item"></button>
    <button data-color="#3d85c6" id="xo-item"></button>
    <button data-color="#674ea7" id="xo-item"></button>
    <button data-color="#a64d79" id="xo-item"></button>
    <button data-color="#990000" id="xo-item"></button>
    <button data-color="#b45f06" id="xo-item"></button>
    <button data-color="#bf9000" id="xo-item"></button>
    <button data-color="#38761d" id="xo-item"></button>
    <button data-color="#134f5c" id="xo-item"></button>
    <button data-color="#0b5394" id="xo-item"></button>
    <button data-color="#351c75" id="xo-item"></button>
    <button data-color="#741b47" id="xo-item"></button>
    <button data-color="#660000" id="xo-item"></button>
    <button data-color="#783f04" id="xo-item"></button>
    <button data-color="#7f6000" id="xo-item"></button>
    <button data-color="#274e13" id="xo-item"></button>
    <button data-color="#0c343d" id="xo-item"></button>
    <button data-color="#073763" id="xo-item"></button>
    <button data-color="#20124d" id="xo-item"></button>
    <button data-color="#4c1130" id="xo-item"></button>
    <button data-color="#ff0000" id="xo-item"></button>
    <button data-color="#ff9900" id="xo-item"></button>
    <button data-color="#ffff00" id="xo-item"></button>
    <button data-color="#00ff00" id="xo-item"></button>
    <button data-color="#00ffff" id="xo-item"></button>
    <button data-color="#0000ff" id="xo-item"></button>
    <button data-color="#9900ff" id="xo-item"></button>
    <button data-color="#ff00ff" id="xo-item"></button>   
    <button data-color="#4c1130" id="xo-item"></button>
`;

export default class extends XOElement {
    static attributes = {
        read: String,
        error: String,
        success: String,
        pallete: Array,
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
                case "pallete":
                    this.$.items.innerHTML = "";
                    if (v) v.forEach(c => { this.$.items.innerHTML += `<button data-color="${c}" id="xo-item"></button>`; });
                    else this.$.items.innerHTML = PALLETE;
                    __run__(this);
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
        value: { default: "", type: String },
        change(n, v) {
            switch (n) {
                case "value":
                    this.$.text.value = v;
                    this.$.label.style.setProperty("top", "10px");
                    this.$.label.style.setProperty("font-size", "12px");
                    if (v === null) {
                        this.$.text.value = "";
                    }
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
            if (this.getAttribute("value")) {
                this.value = this.getAttribute("value");
                this.removeAttribute("value");
            }
            this.$.items.querySelectorAll("button").forEach(b => {
                b.setAttribute("disabled", "");
            });
            if ((window.innerWidth - this.offsetLeft) < 324) {
                this.$.items.style.setProperty("left", "unset");
                this.$.items.style.setProperty("right", "0");
            } else {
                this.$.items.style.setProperty("left", "");
                this.$.items.style.setProperty("right", "");
            }
            __run__(this);
        },
        attach() {
            this.$.text.addEventListener("blur", () => {
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
                this.value = e.target.value || null;
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
            window.addEventListener("resize", () => {
                if ((window.innerWidth - this.offsetLeft) < 324) {
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
        #xo-item,
        #xo-icon,
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
            --color: #1d1d1d;
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
            min-width: 324px;
            overflow: hidden;
            flex-wrap: wrap;
            padding: 10px;
            display: flex;
            width: 100%;
            opacity: 1;
            z-index: 2;
            top: 110%;
            left: 0;
            gap: 2px
        }
        #xo-items[shrink] {
            top: 200%;
            opacity: 0;
            pointer-events: none;
        }
        #xo-items div {
            display: flex;
            flex-wrap: wrap;
            width: 32px;
            gap: 2px;
        }
        /* Item */
        #xo-item {
            border-radius: 5px;
            width: 32px;
            height: 32px;
        }
        #xo-item:hover {
            cursor: pointer;
            opacity: 0.5;
        }
        #xo-item:focus {
            outline: auto;
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
                justify-content: center;
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
            #xo-container { {{--xo-container}} }
            #xo-container:hover { {{--xo-container-hover}} }
            /* Text */
            #xo-text { {{--xo-text}} }
            #xo-text:hover { {{--xo-text-hover}} }
            /* Label */
            #xo-label { {{--xo-placeholder}} }
            #xo-label:hover { {{--xo-placeholder-hover}} }
            /* Icon */
            #xo-icon { {{--xo-icon}} }
            #xo-icon:hover { {{--xo-icon-hover}} }
            #xo-icon svg { {{--xo-icon-svg}} }
            #xo-icon:hover svg { {{--xo-icon-svg-hover}} }
            /* Items */
            #xo-items { {{--xo-items}} }
            #xo-items:hover { {{--xo-items-hover}} }
            /* ItemsGroup */
            #xo-items div { {{--xo-items-group}} }
            #xo-items div:hover { {{--xo-items-group-hover}} }
            /* Item */
            #xo-item { {{--xo-item}} }
            #xo-item:hover { {{--xo-item-hover}} }
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
            <a role="input" id="xo-container">
                <slot name="prefix"></slot>
                <section>
                    <input type="text" id="xo-text" readonly>
                    <label for="xo-text" id="xo-label"></label>
                </section>
                <button id="xo-icon">
                    <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000.000000 1000.000000" preserveAspectRatio="xMidYMid meet">
                        <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
                            <path d="M4725 9994 c-707 -45 -1356 -219 -1980 -531 -753 -377 -1434 -982 -1911 -1698 -127 -191 -208 -334 -324 -570 -273 -557 -429 -1110 -492 -1750 -16 -167 -16 -720 0 -885 106 -1064 488 -1980 1161 -2785 115 -137 409 -433 565 -568 725 -626 1630 -1034 2577 -1161 384 -52 750 -58 899 -16 231 65 420 222 525 435 68 140 80 194 79 375 0 148 -1 159 -32 249 -39 111 -84 191 -161 286 -87 106 -128 172 -162 259 -184 477 73 981 570 1119 73 20 106 21 756 27 771 8 816 11 1112 85 813 205 1505 786 1849 1555 224 501 290 1029 208 1660 -90 684 -370 1363 -799 1935 -185 246 -471 551 -700 745 -498 424 -1105 761 -1745 968 -394 128 -749 202 -1184 248 -134 14 -681 26 -811 18z m-965 -1118 c170 -31 315 -109 445 -241 159 -160 235 -352 235 -587 0 -254 -122 -502 -321 -653 -80 -60 -224 -129 -314 -151 -96 -23 -297 -22 -390 1 -163 40 -352 160 -453 288 -68 85 -105 156 -143 267 -27 83 -32 113 -37 230 -4 116 -2 147 17 220 109 433 526 704 961 626z m2771 0 c318 -52 575 -290 665 -616 28 -102 26 -320 -4 -424 -49 -169 -151 -325 -283 -429 -152 -122 -317 -179 -519 -179 -156 0 -232 17 -365 81 -272 133 -440 380 -464 681 -19 247 53 458 217 632 201 213 463 301 753 254z m-4398 -2231 c161 -41 280 -108 393 -220 125 -125 192 -244 230 -411 25 -111 23 -283 -5 -389 -76 -287 -301 -515 -588 -597 -65 -19 -103 -22 -228 -22 -143 0 -154 1 -245 32 -110 39 -181 77 -266 143 -136 108 -239 265 -286 440 -32 120 -32 321 0 432 44 152 148 320 255 409 113 94 257 164 382 187 33 6 71 13 85 15 46 8 209 -3 273 -19z m6034 14 c171 -23 331 -100 458 -220 175 -167 259 -368 259 -619 -1 -107 -5 -138 -28 -215 -85 -280 -279 -476 -566 -571 -78 -26 -97 -28 -235 -28 -136 1 -158 3 -235 29 -115 37 -191 76 -279 143 -233 177 -358 499 -307 791 78 447 489 751 933 690z"/>
                        </g>
                    </svg>
                </button>
                <div id="xo-items" shrink>
                    <div>
                        <button data-color="#ffffff" id="xo-item"></button>
                        <button data-color="#eeeeee" id="xo-item"></button>
                        <button data-color="#cccccc" id="xo-item"></button>
                        <button data-color="#999999" id="xo-item"></button>
                        <button data-color="#666666" id="xo-item"></button>
                        <button data-color="#444444" id="xo-item"></button>
                        <button data-color="#000000" id="xo-item"></button>
                    </div>
                    <div>   
                        <button data-color="#f4cccc" id="xo-item"></button>
                        <button data-color="#ea9999" id="xo-item"></button>
                        <button data-color="#e06666" id="xo-item"></button>
                        <button data-color="#cc0000" id="xo-item"></button>
                        <button data-color="#990000" id="xo-item"></button>
                        <button data-color="#660000" id="xo-item"></button>
                        <button data-color="#ff0000" id="xo-item"></button>
                    </div>
                    <div>   
                        <button data-color="#fce5cd" id="xo-item"></button>
                        <button data-color="#f9cb9c" id="xo-item"></button>
                        <button data-color="#f6b26b" id="xo-item"></button>
                        <button data-color="#e69138" id="xo-item"></button>
                        <button data-color="#b45f06" id="xo-item"></button>
                        <button data-color="#783f04" id="xo-item"></button>
                        <button data-color="#ff9900" id="xo-item"></button>
                    </div>
                    <div>   
                        <button data-color="#fff2cc" id="xo-item"></button>
                        <button data-color="#ffe599" id="xo-item"></button>
                        <button data-color="#ffd966" id="xo-item"></button>
                        <button data-color="#f1c232" id="xo-item"></button>
                        <button data-color="#bf9000" id="xo-item"></button>
                        <button data-color="#7f6000" id="xo-item"></button>
                        <button data-color="#ffff00" id="xo-item"></button>
                    </div>
                    <div>   
                        <button data-color="#d9ead3" id="xo-item"></button>
                        <button data-color="#b6d7a8" id="xo-item"></button>
                        <button data-color="#93c47d" id="xo-item"></button>
                        <button data-color="#6aa84f" id="xo-item"></button>
                        <button data-color="#38761d" id="xo-item"></button>
                        <button data-color="#274e13" id="xo-item"></button>
                        <button data-color="#00ff00" id="xo-item"></button>
                    </div>
                    <div>   
                        <button data-color="#d0e0e3" id="xo-item"></button>
                        <button data-color="#a2c4c9" id="xo-item"></button>
                        <button data-color="#76a5af" id="xo-item"></button>
                        <button data-color="#45818e" id="xo-item"></button>
                        <button data-color="#134f5c" id="xo-item"></button>
                        <button data-color="#0c343d" id="xo-item"></button>
                        <button data-color="#00ffff" id="xo-item"></button>
                    </div>
                    <div>   
                        <button data-color="#cfe2f3" id="xo-item"></button>
                        <button data-color="#9fc5e8" id="xo-item"></button>
                        <button data-color="#6fa8dc" id="xo-item"></button>
                        <button data-color="#3d85c6" id="xo-item"></button>
                        <button data-color="#0b5394" id="xo-item"></button>
                        <button data-color="#073763" id="xo-item"></button>
                        <button data-color="#0000ff" id="xo-item"></button>
                    </div>
                    <div>   
                        <button data-color="#d9d2e9" id="xo-item"></button>
                        <button data-color="#b4a7d6" id="xo-item"></button>
                        <button data-color="#8e7cc3" id="xo-item"></button>
                        <button data-color="#674ea7" id="xo-item"></button>
                        <button data-color="#351c75" id="xo-item"></button>
                        <button data-color="#20124d" id="xo-item"></button>
                        <button data-color="#9900ff" id="xo-item"></button>
                    </div>
                    <div>
                        <button data-color="#ead1dc" id="xo-item"></button>
                        <button data-color="#d5a6bd" id="xo-item"></button>
                        <button data-color="#c27ba0" id="xo-item"></button>
                        <button data-color="#a64d79" id="xo-item"></button>
                        <button data-color="#741b47" id="xo-item"></button>
                        <button data-color="#4c1130" id="xo-item"></button>
                        <button data-color="#ff00ff" id="xo-item"></button>
                    </div>
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

function __run__(el) {
    el.queryAll("#xo-item").forEach(e => {
        e.style.background = e.dataset.color;
        e.addEventListener("click", () => {
            el.value = e.dataset.color;
            el.$.container.style.setProperty("outline", "unset");
            el.$.items.querySelectorAll("button").forEach(b => {
                b.setAttribute("disabled", "");
            });
            el.$.items.setAttribute("shrink", "");
            el.$.label.style.setProperty("top", "10px");
            el.$.label.style.setProperty("font-size", "12px");
        });
    });
}