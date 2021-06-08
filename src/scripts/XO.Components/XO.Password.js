import XOElement from "./XO.Element.js"

export default class extends XOElement {
    static attributes = {
        show: String,
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
                case "show":
                    if (this.matches("[show]")) {
                        this.$.text.type = "text";
                        this.$.icon[0].style.display = "none";
                        this.$.icon[1].style.display = "";
                        this.$.icon[1].focus();
                    } else {
                        this.$.text.type = "password";
                        this.$.icon[0].style.display = "";
                        this.$.icon[1].style.display = "none";
                        this.$.icon[0].focus();
                    }
                    break;
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
                    if (this.matches("[blocked]")) {
                        this.$.text.setAttribute("disabled", "");
                        this.$.icon[0].setAttribute("disabled", "");
                        this.$.icon[1].setAttribute("disabled", "");
                    } else {
                        this.$.text.removeAttribute("disabled");
                        this.$.icon[0].removeAttribute("disabled");
                        this.$.icon[1].removeAttribute("disabled");
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
            this.$.icon[0].addEventListener("click", e => {
                e.preventDefault();
                this.setAttribute("show", "");
            });
            this.$.icon[1].addEventListener("click", e => {
                e.preventDefault();
                this.removeAttribute("show");
            });
        },
        detach() {
            this.$.icon[0].removeEventListener("click", () => {});
            this.$.icon[1].removeEventListener("click", () => {});
            this.$.text.removeEventListener("change", () => {});
            this.$.text.removeEventListener("focus", () => {});
            this.$.text.removeEventListener("blur", () => {});
        }
    }

    static styles = `
        /* Globals */
        #xo-container section,
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
            <a role="input" id="xo-container">
                <slot name="prefix"></slot>
                <section>
                    <input type="password" id="xo-text">
                    <label for="xo-text" id="xo-label"></label>
                </section>
                <button id="xo-icon">
                    <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000.000000 1000.000000" preserveAspectRatio="xMidYMid meet">
                        <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
                            <path d="M4735 8404 c-253 -19 -357 -29 -525 -54 -975 -143 -1868 -544 -2655 -1194 -151 -125 -541 -515 -667 -666 -198 -240 -393 -518 -533 -760 -101 -175 -250 -474 -309 -620 l-47 -116 56 -129 c412 -945 1027 -1709 1844 -2288 269 -191 471 -310 763 -451 575 -278 1157 -443 1813 -513 210 -22 787 -25 990 -5 540 54 953 149 1432 328 1234 463 2282 1400 2882 2579 42 83 109 224 149 315 l73 164 -37 91 c-112 272 -308 640 -479 900 -214 325 -408 560 -709 860 -422 421 -810 704 -1321 966 -633 325 -1252 506 -1960 574 -151 15 -652 27 -760 19z m605 -1159 c555 -87 1043 -364 1406 -798 524 -625 668 -1506 372 -2272 -232 -597 -738 -1095 -1333 -1309 -274 -98 -432 -127 -737 -133 -249 -6 -380 6 -577 54 -557 134 -1041 472 -1368 958 -186 276 -315 629 -359 984 -22 182 -15 496 15 661 53 294 156 560 312 813 175 282 454 559 735 730 288 176 625 292 944 327 123 13 466 4 590 -15z"></path>
                            <path d="M4850 6355 c-8 -2 -49 -9 -90 -15 -474 -77 -898 -442 -1054 -910 -55 -165 -69 -273 -63 -474 4 -148 9 -187 35 -289 103 -396 359 -713 721 -892 359 -179 774 -187 1148 -24 399 175 693 536 788 969 24 112 30 353 11 475 -31 204 -107 399 -223 574 -69 104 -241 278 -343 347 -165 113 -376 199 -562 228 -84 14 -319 20 -368 11z"></path>
                        </g>
                    </svg>
                </button>
                <button part="-xo-inner-icon" id="xo-icon" style="display: none">
                    <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000.000000 1000.000000" preserveAspectRatio="xMidYMid meet">
                        <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
                            <path d="M740 9025 l-285 -285 618 -618 c339 -339 617 -622 616 -627 0 -6 -52 -52 -114 -103 -592 -486 -1084 -1115 -1419 -1815 -46 -95 -99 -213 -120 -263 l-37 -90 67 -155 c224 -519 522 -995 878 -1404 125 -143 408 -424 552 -549 227 -195 493 -390 724 -528 726 -436 1515 -691 2340 -757 802 -65 1568 42 2328 324 l103 39 760 -760 759 -759 289 290 289 290 -4022 4028 c-2213 2215 -4027 4027 -4032 4027 -5 0 -137 -128 -294 -285z m2583 -3153 l348 -348 -16 -88 c-20 -115 -19 -317 1 -437 33 -194 115 -395 227 -558 191 -276 517 -490 851 -557 119 -24 345 -29 461 -10 l99 17 348 -348 c191 -191 348 -350 348 -353 0 -10 -176 -84 -302 -126 -402 -134 -830 -150 -1250 -44 -762 193 -1383 787 -1612 1543 -121 397 -128 837 -20 1233 38 142 147 424 163 424 3 0 163 -157 354 -348z"></path>
                            <path d="M4805 8630 c-221 -8 -270 -12 -495 -41 -343 -45 -744 -140 -1074 -255 l-48 -17 490 -490 489 -489 94 31 c384 131 784 162 1159 90 466 -90 886 -317 1214 -660 330 -345 538 -765 612 -1239 26 -163 26 -534 0 -675 -24 -136 -59 -273 -100 -393 l-34 -99 662 -662 c363 -363 664 -661 669 -661 14 0 275 240 402 371 363 374 646 759 897 1224 71 131 203 413 242 516 l18 46 -42 99 c-454 1073 -1222 1957 -2220 2556 -876 525 -1896 785 -2935 748z"></path>
                            <path d="M4948 6582 c-14 -6 122 -147 697 -722 l715 -715 0 97 c0 633 -475 1203 -1102 1323 -95 18 -285 29 -310 17z"></path>
                        </g>
                    </svg>
                </button>
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