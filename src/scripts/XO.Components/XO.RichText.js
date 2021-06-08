import XOElement from "./XO.Element.js"

export default class extends XOElement {
    static callbacks = {
        create() {
            this.$.content.innerHTML = this.innerHTML;
            this.value = this.innerHTML.trim() || undefined;
            this.innerHTML = "";
        },
        attach() {
            this.queryAll("[backcolor]").forEach(el => {
                el.style.background = el.dataset.color;
                el.addEventListener("click", () => {
                    document.execCommand("styleWithCSS", false, true);
                    document.execCommand("backColor", null, el.dataset.color);
                    this.value = this.$.content.innerHTML.trim();
                });
            });
            this.queryAll("[forecolor]").forEach(el => {
                el.style.background = el.dataset.color;
                el.addEventListener("click", () => {
                    document.execCommand("styleWithCSS", false, true);
                    document.execCommand("foreColor", null, el.dataset.color);
                    this.value = this.$.content.innerHTML.trim();
                });
            });
            this.queryAll("[data-cmd]").forEach((icon) => {
                icon.addEventListener("click", () => {
                    const c = icon.getAttribute("data-cmd");
                    if (c === "fontSize") {
                        var s = icon.getAttribute("data-size");
                        if (s >= 7) s = 0;
                        s++;
                        icon.setAttribute("data-size", s);
                        document.execCommand("styleWithCSS", false, true);
                        document.execCommand(c, null, s);
                        return;
                    }
                    document.execCommand("styleWithCSS", false, true);
                    document.execCommand(c, null, null);
                    this.value = this.$.content.innerHTML.trim()
                });
            });
            this.query("[link]").addEventListener("click", () => {
                this.$.items.forEach(i => {
                    if (i !== this.$.items[0]) i.setAttribute("shrink", "");
                });
                if (this.$.items[0].matches("[shrink]")) {
                    this.$.items[0].removeAttribute("shrink");
                    this.$.items[0].querySelectorAll("*").forEach(b => {
                        b.removeAttribute("disabled");
                    });
                } else {
                    this.$.items[0].setAttribute("shrink", "");
                    this.$.items[0].querySelectorAll("*").forEach(b => {
                        b.setAttribute("disabled", "");
                    });
                }
            });
            this.query("[image]").addEventListener("click", () => {
                this.$.items.forEach(i => {
                    if (i !== this.$.items[1]) i.setAttribute("shrink", "");
                });
                if (this.$.items[1].matches("[shrink]")) {
                    this.$.items[1].removeAttribute("shrink");
                    this.$.items[1].querySelectorAll("*").forEach(b => {
                        b.removeAttribute("disabled");
                    });
                } else {
                    this.$.items[1].setAttribute("shrink", "");
                    this.$.items[1].querySelectorAll("*").forEach(b => {
                        b.setAttribute("disabled", "");
                    });
                }
            });
            this.query("[colors]").addEventListener("click", () => {
                this.$.items.forEach(i => {
                    if (i !== this.$.items[2]) i.setAttribute("shrink", "");
                });
                if (this.$.items[2].matches("[shrink]")) {
                    this.$.items[2].removeAttribute("shrink");
                    this.$.items[2].querySelectorAll("*").forEach(b => {
                        b.removeAttribute("disabled");
                    });
                } else {
                    this.$.items[2].setAttribute("shrink", "");
                    this.$.items[2].querySelectorAll("*").forEach(b => {
                        b.setAttribute("disabled", "");
                    });
                }
            });
            this.queryAll("#ok")[0].addEventListener("click", () => {
                if (this.query("#link").value.trim()) {
                    document.execCommand("createLink", null, this.query("#link").value.trim());
                    this.query("#link").value = "";
                }
            });
            this.queryAll("#ok")[1].addEventListener("click", () => {
                if (this.query("#image").value.trim()) {
                    document.execCommand("insertImage", null, this.query("#image").value.trim());
                    this.query("#image").value = "";
                }
            });
            this.$.content.addEventListener("keyup", () => {
                this.value = this.$.content.innerHTML.trim();
            });
            this.$.content.addEventListener("click", () => {
                this.value = this.$.content.innerHTML.trim();
            });
            this.$.content.addEventListener("blur", () => {
                this.value = this.$.content.innerHTML.trim();
            });
        },
        detach() {
            this.queryAll("#ok")[0].removeEventListener("click", () => {});
            this.queryAll("#ok")[0].removeEventListener("click", () => {});
            this.query("[colors]").removeEventListener("click", () => {});
            this.query("[image]").removeEventListener("click", () => {});
            this.query("[link]").removeEventListener("click", () => {});
            this.$.content.removeEventListener("keyup", () => {});
            this.$.content.removeEventListener("click", () => {});
            this.$.content.removeEventListener("blur", () => {});
            window.removeEventListener("resize", () => {});
            this.queryAll("[backcolor]").forEach(el => {
                el.removeEventListener("click", () => {});
            });
            this.queryAll("[forecolor]").forEach(el => {
                el.removeEventListener("click", () => {});
            });
            this.queryAll("[data-cmd]").forEach(el => {
                el.removeEventListener("click", () => {});
            });
        }
    }

    static styles = `
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
        :host {
            display: block;
            box-sizing: content-box !important;
            width: 100%;
        }
        :host([theme="water"]) #xo-tools {
            background: var(--water);
        }
        :host([theme="fire"]) #xo-tools {
            background: var(--fire);
        }
        :host([theme="earth"]) #xo-tools {
            background: var(--earth);
        }
        :host([theme="forest"]) #xo-tools {
            background: var(--forest);
        }
        :host([theme="night"]) #xo-tools {
            background: var(--night);
        }
        #xo-container {
            width: 100%;
            border: 1px solid #1d1d1d;
            border-radius: 5px;
            position: relative;
            overflow: hidden;
        }
        #xo-tools {
            display: flex;
            flex-wrap: wrap;
            background-color: var(--default);
            padding: 5px;
            gap: 5px;
        }
        #xo-toolGroup {
            display: flex;
            overflow: hidden;
            width: max-content;
            border-radius: 5px;
        }
        #xo-toolGroup #xo-icon {
            border: unset;
            border-radius: unset;
        }
        #xo-toolGroup #xo-icon:first-child {
            border-top-left-radius: 5px;
            border-bottom-left-radius: 5px;
        }
        #xo-toolGroup #xo-icon:last-child {
            border-top-right-radius: 5px;
            border-bottom-right-radius: 5px;
        }
        #xo-icon {
            all: unset;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 30px;
            height: 30px;
            padding: 5px;
            border-radius: 5px;
            box-sizing: border-box;
            background: linear-gradient(180deg, #ffffff, #9e9e9e);
        }
        #xo-icon:active {
            background: linear-gradient(180deg, #9e9e9e, #ffffff);
        }
        #xo-icon svg {
            width: 20px;
            height: 20px;
        }
        #wrap {
            position: relative;
        }
        #xo-items {
            justify-content: flex-end;
            background: #ffffff;
            position: absolute;
            border-radius: 5px;
            flex-wrap: wrap;
            padding: 10px;
            display: flex;
            width: 350px;
            z-index: 2;
            gap: 10px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            box-shadow: 0 0 30px #1d1d1d;
        }
        #xo-items[shrink] {
            display: none;
        }
        #xo-items div {
            display: flex;
            flex-wrap: wrap;
            width: 160px;
            gap: 1px;
        }
        #xo-items p {
            width: 100%;
            margin: 0 0 5px 0;
        }
        #xo-items h3 {
            width: 100%;
            font-size: 14px;
            margin: 0 0 10px 0;
        }
        #xo-item {
            all: unset;
            cursor: pointer;
            width: 19px;
            height: 19px;
        }
        #xo-item:hover {
            opacity: 0.5;
        }
        #xo-item:focus {
            outline: auto;
        }
        #xo-items input {
            width: 100%;
            padding: 5px 10px;
            font-size: 18px;
            border: 1px solid #1d1d1d;
            border-radius: 5px;
            color: #1d1d1d;       
        }
        #xo-items #ok {
            all: unset;
            display: flex;
            font-size: 30px;
            color: #fff;
            background: #00b14b;
            padding: 0 10px;
            border-radius: 5px;
        }        
        #xo-items #ok:focus {
            outline: auto;
        }
        #xo-items #ok svg {
            display: flex;
            width: 30px;
            height: 30px;
            fill: #fff;
        }
        #xo-content {
            box-sizing: border-box;
            padding: 10px 15px;
            resize: vertical;
            height: 300px;
            overflow: auto;
            outline: unset;
        }
        #xo-content * {
            max-width: 100%;
        }
        /* Variables */
            /* Container */
            #xo-container { {{--xo-container}} }
            #xo-container:hover { {{--xo-container-hover}} }
            /* Tools */
            #xo-tools { {{--xo-tools}} }
            #xo-tools:hover { {{--xo-tools-hover}} }
            /* ToolGroup */
            #xo-toolGroup { {{--xo-tool-group}} }
            #xo-toolGroup:hover { {{--xo-tool-group-hover}} }
            /* Icon */
            #xo-icon { {{--xo-icon}} }
            #xo-icon:hover { {{--xo-icon-hover}} }
            #xo-icon svg { {{--xo-icon-svg}} }
            #xo-icon:hover svg { {{--xo-icon-svg-hover}} } 
            /* Content */
            #xo-content { {{--xo-content}} }
            #xo-content:hover { {{--xo-content-hover}} }
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
                <div id="xo-tools">
                    <div id="xo-toolGroup">
                        <button id="xo-icon" data-cmd="justifyLeft">
                            <svg version="1.0" viewBox="0 0 1000.000000 1000.000000" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                                <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
                                    <path d="M0 9445 l0 -555 5000 0 5000 0 0 555 0 555 -5000 0 -5000 0 0 -555z"></path>
                                    <path d="M0 7225 l0 -555 3335 0 3335 0 -2 553 -3 552 -3332 3 -3333 2 0 -555z"></path>
                                    <path d="M0 5000 l0 -560 5000 0 5000 0 0 560 0 560 -5000 0 -5000 0 0 -560z"></path>
                                    <path d="M0 2775 l0 -555 3333 2 3332 3 3 553 2 552 -3335 0 -3335 0 0 -555z"></path>
                                    <path d="M0 555 l0 -555 5000 0 5000 0 0 555 0 555 -5000 0 -5000 0 0 -555z"></path>
                                </g>
                            </svg>
                        </button>
                        <button id="xo-icon" data-cmd="justifyCenter">
                            <svg version="1.0" viewBox="0 0 1000.000000 1000.000000" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                                <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
                                    <path d="M0 9445 l0 -555 5000 0 5000 0 0 555 0 555 -5000 0 -5000 0 0 -555z"></path>
                                    <path d="M2220 7225 l0 -555 2780 0 2780 0 0 555 0 555 -2780 0 -2780 0 0 -555z"></path>
                                    <path d="M0 5000 l0 -560 5000 0 5000 0 0 560 0 560 -5000 0 -5000 0 0 -560z"></path>
                                    <path d="M2220 2775 l0 -555 2780 0 2780 0 0 555 0 555 -2780 0 -2780 0 0 -555z"></path>
                                    <path d="M0 555 l0 -555 5000 0 5000 0 0 555 0 555 -5000 0 -5000 0 0 -555z"></path>
                                </g>
                            </svg>
                        </button>
                        <button id="xo-icon" data-cmd="justifyRight">
                            <svg version="1.0" viewBox="0 0 1000.000000 1000.000000" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                                <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
                                    <path d="M0 9445 l0 -555 5000 0 5000 0 0 555 0 555 -5000 0 -5000 0 0 -555z"></path>
                                    <path d="M3337 7773 c-4 -3 -7 -253 -7 -555 l0 -548 3335 0 3335 0 0 555 0 555 -3328 0 c-1831 0 -3332 -3 -3335 -7z"></path>
                                    <path d="M0 5000 l0 -560 5000 0 5000 0 0 560 0 560 -5000 0 -5000 0 0 -560z"></path>
                                    <path d="M3332 2778 l3 -553 3333 -3 3332 -2 0 555 0 555 -3335 0 -3335 0 2 -552z"></path>
                                    <path d="M0 555 l0 -555 5000 0 5000 0 0 555 0 555 -5000 0 -5000 0 0 -555z"></path>
                                </g>
                            </svg>
                        </button>
                        <button id="xo-icon" data-cmd="justifyFull">
                            <svg version="1.0" viewBox="0 0 1000.000000 1000.000000" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                                <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
                                    <path d="M0 9445 l0 -555 5000 0 5000 0 0 555 0 555 -5000 0 -5000 0 0 -555z"></path>
                                    <path d="M0 7225 l0 -555 5000 0 5000 0 0 555 0 555 -5000 0 -5000 0 0 -555z"></path>
                                    <path d="M0 5000 l0 -560 5000 0 5000 0 0 560 0 560 -5000 0 -5000 0 0 -560z"></path>
                                    <path d="M0 2775 l0 -555 5000 0 5000 0 0 555 0 555 -5000 0 -5000 0 0 -555z"></path>
                                    <path d="M0 555 l0 -555 5000 0 5000 0 0 555 0 555 -5000 0 -5000 0 0 -555z"></path>
                                </g>
                            </svg>
                        <button id="xo-icon" data-cmd="fontSize" data-size="0">
                            <svg version="1.0" viewBox="0 0 1000.000000 1000.000000" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                                <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
                                    <path d="M855 8290 l-850 -850 608 0 607 0 0 -2440 0 -2440 -607 0 -608 0 853 -852 852 -853 852 853 853 852 -608 0 -607 0 0 2440 0 2440 607 0 608 0 -850 850 c-467 468 -852 850 -855 850 -3 0 -388 -382 -855 -850z"/>
                                    <path d="M4150 7930 l0 -490 2925 0 2925 0 -2 488 -3 487 -2922 3 -2923 2 0 -490z"/>
                                    <path d="M4150 5000 l0 -490 2925 0 2925 0 0 490 0 490 -2925 0 -2925 0 0 -490z"/>
                                    <path d="M4150 2075 l0 -485 2925 0 2925 0 0 485 0 485 -2925 0 -2925 0 0 -485z"/>
                                </g>
                            </svg>
                        </button>
                    </div>
                    <div id="xo-toolGroup">
                        <button id="xo-icon" data-cmd="bold">
                            <svg version="1.0" viewBox="0 0 1000.000000 1000.000000" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                                <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
                                    <path d="M1390 5000 l0 -4990 2323 2 2322 3 155 28 c689 126 1230 400 1655 838 203 210 348 413 480 674 150 296 230 568 271 921 21 181 15 654 -11 814 -74 467 -225 859 -462 1199 -185 265 -413 491 -673 666 -47 32 -86 58 -88 60 -1 1 35 31 80 65 126 96 341 318 449 462 259 347 413 735 485 1223 25 169 25 600 1 770 -44 301 -120 547 -243 794 -139 280 -288 486 -495 686 -450 436 -1034 696 -1708 760 -131 13 -488 15 -2348 15 l-2193 0 0 -4990z m4075 2778 c301 -69 473 -224 537 -486 17 -69 21 -118 21 -237 0 -165 -14 -246 -61 -368 -75 -194 -236 -342 -457 -420 -151 -53 -210 -57 -1032 -57 l-753 0 0 795 0 796 838 -4 c718 -3 847 -6 907 -19z m68 -3776 c251 -56 416 -162 535 -344 94 -146 145 -304 161 -508 16 -198 -9 -357 -78 -505 -94 -199 -248 -329 -466 -393 -171 -51 -187 -52 -1106 -52 l-859 0 0 916 0 915 858 -3 c841 -4 859 -4 955 -26z"/>
                                </g>
                            </svg>
                        <button id="xo-icon" data-cmd="italic">
                            <svg version="1.0" viewBox="0 0 1000.000000 1000.000000" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                                <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
                                    <path d="M3010 9250 l0 -750 731 0 731 0 -7 -41 c-4 -23 -287 -1597 -629 -3498 l-623 -3456 -861 -3 -862 -2 0 -750 0 -750 2750 0 2750 0 0 750 0 750 -731 0 -731 0 6 27 c3 16 283 1567 621 3448 339 1881 620 3444 626 3473 l10 52 865 0 864 0 0 750 0 750 -2755 0 -2755 0 0 -750z"/>
                                </g>
                            </svg>
                        <button id="xo-icon" data-cmd="underline">
                            <svg version="1.0" viewBox="0 0 1000.000000 1000.000000" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                                <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
                                    <path d="M1320 9874 l0 -110 128 -12 c70 -7 168 -21 217 -31 272 -58 353 -141 408 -421 20 -103 20 -141 27 -2270 7 -2185 8 -2264 46 -2645 80 -816 248 -1259 617 -1627 407 -405 943 -623 1757 -715 198 -22 888 -25 1075 -5 518 57 873 163 1210 362 202 120 407 304 550 495 284 379 463 972 524 1740 6 72 13 153 16 180 4 28 10 894 14 1925 6 1227 12 1916 19 1995 42 445 104 637 259 789 92 91 263 178 436 222 l67 16 0 110 0 110 -67 -5 c-38 -3 -263 -11 -501 -18 -354 -11 -519 -11 -895 0 -254 7 -513 15 -574 18 l-113 6 0 -109 0 -109 166 -32 c585 -114 805 -306 884 -770 53 -307 53 -318 57 -2203 3 -1204 1 -1811 -7 -1932 -35 -575 -132 -1039 -297 -1418 -184 -424 -403 -666 -758 -836 -449 -216 -1169 -229 -1565 -29 -450 228 -638 676 -671 1600 -15 415 -6 4910 9 5025 60 441 178 534 737 583 l140 12 3 109 3 109 -178 -7 c-802 -32 -2722 -32 -3560 0 l-183 7 0 -109z"/>
                                    <path d="M1065 986 c-94 -23 -164 -63 -234 -133 -104 -106 -151 -216 -151 -353 0 -178 92 -337 250 -431 127 -75 -241 -69 4068 -69 4298 0 3949 -6 4069 66 160 96 253 255 253 434 0 137 -47 247 -152 353 -72 73 -148 115 -246 136 -80 17 -7788 14 -7857 -3z"/>
                                </g>
                            </svg>
                        <button id="xo-icon" data-cmd="strikeThrough">
                            <svg version="1.0" viewBox="0 0 1000.000000 1000.000000" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                                <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
                                    <path d="M4630 9964 c-25 -2 -106 -8 -180 -14 -585 -47 -1220 -227 -1635 -463 -230 -130 -394 -255 -580 -442 -373 -374 -562 -772 -625 -1320 -15 -128 -15 -458 0 -600 23 -227 78 -454 157 -649 44 -111 144 -310 167 -334 9 -9 418 -12 2003 -10 l1991 3 -190 135 c-813 575 -1099 816 -1334 1125 -215 283 -314 585 -314 964 0 244 45 440 146 631 105 197 272 354 501 469 384 193 983 200 1416 15 486 -208 936 -681 1231 -1294 214 -446 366 -995 411 -1490 3 -36 8 -82 11 -102 l6 -38 154 0 154 0 0 398 c1 1005 27 2195 63 2842 l2 45 -152 3 c-152 3 -153 2 -157 -20 -3 -13 -12 -68 -22 -123 -32 -192 -75 -311 -136 -381 -41 -47 -83 -64 -152 -64 -80 0 -149 29 -452 187 -293 154 -403 206 -600 281 -335 129 -582 188 -947 228 -133 15 -817 28 -937 18z"/>
                                    <path d="M1065 5486 c-94 -23 -164 -63 -234 -133 -104 -106 -151 -216 -151 -353 0 -178 92 -337 250 -431 127 -75 -241 -69 4068 -69 4298 0 3949 -6 4069 66 160 96 253 256 253 436 0 135 -47 245 -152 351 -72 73 -148 115 -246 136 -80 17 -7788 14 -7857 -3z"/>
                                    <path d="M1580 3248 c0 -1075 -23 -2547 -46 -2986 l-7 -123 154 3 154 3 21 125 c55 322 127 453 257 467 86 10 237 -43 401 -140 267 -159 855 -365 1271 -447 162 -31 408 -62 655 -81 205 -16 815 -16 1005 -1 572 47 1070 156 1490 325 545 219 929 494 1247 893 229 288 376 645 440 1069 18 122 18 626 0 755 -33 231 -97 469 -180 665 l-38 90 -1892 3 -1892 2 173 -139 c299 -240 584 -510 732 -693 282 -350 417 -722 432 -1188 10 -323 -47 -554 -190 -773 -259 -397 -756 -617 -1392 -617 -207 0 -350 13 -515 46 -438 88 -793 298 -1076 636 -249 298 -488 798 -648 1353 -96 336 -193 886 -221 1250 -10 139 9 125 -175 125 l-160 0 0 -622z"/>
                                </g>
                            </svg>
                        </button>
                    </div>
                    <div id="xo-toolGroup">
                        <button id="xo-icon" data-cmd="indent">
                            <svg version="1.0" viewBox="0 0 1000.000000 1000.000000" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                                <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
                                    <path d="M0 9445 l0 -555 5000 0 5000 0 0 555 0 555 -5000 0 -5000 0 0 -555z"/>
                                    <path d="M4447 7773 c-4 -3 -7 -253 -7 -555 l0 -548 2780 0 2780 0 0 555 0 555 -2773 0 c-1526 0 -2777 -3 -2780 -7z"/>
                                    <path d="M0 5000 l0 -2225 1112 1113 1113 1112 -1113 1112 -1112 1113 0 -2225z"/>
                                    <path d="M4445 5548 c-3 -7 -4 -258 -3 -558 l3 -545 2778 -3 2777 -2 0 560 0 560 -2775 0 c-2211 0 -2777 -3 -2780 -12z"/>
                                    <path d="M4442 2778 l3 -553 2778 -3 2777 -2 0 555 0 555 -2780 0 -2780 0 2 -552z"/>
                                    <path d="M0 555 l0 -555 5000 0 5000 0 0 555 0 555 -5000 0 -5000 0 0 -555z"/>
                                </g>
                            </svg>
                        </button>
                        <button id="xo-icon" data-cmd="outdent">
                            <svg version="1.0" viewBox="0 0 1000.000000 1000.000000" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                                <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
                                    <path d="M0 9445 l0 -555 5000 0 5000 0 0 555 0 555 -5000 0 -5000 0 0 -555z"/>
                                    <path d="M0 7225 l0 -555 2780 0 2780 0 -2 553 -3 552 -2777 3 -2778 2 0 -555z"/>
                                    <path d="M8885 6110 l-1110 -1110 1113 -1113 1112 -1112 0 2223 c0 1222 -1 2222 -3 2222 -1 0 -502 -500 -1112 -1110z"/>
                                    <path d="M0 5000 l0 -560 2778 2 2777 3 0 555 0 555 -2777 3 -2778 2 0 -560z"/>
                                    <path d="M0 2775 l0 -555 2778 2 2777 3 3 553 2 552 -2780 0 -2780 0 0 -555z"/>
                                    <path d="M0 555 l0 -555 5000 0 5000 0 0 555 0 555 -5000 0 -5000 0 0 -555z"/>
                                </g>
                            </svg>
                        </button>
                    </div>
                    <div id="xo-toolGroup">
                        <button id="xo-icon" data-cmd="insertUnorderedList">
                            <svg version="1.0" viewBox="0 0 1000.000000 1000.000000" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                                <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
                                    <path d="M1265 9989 c-514 -63 -966 -410 -1159 -890 -203 -505 -104 -1078 259 -1492 215 -245 533 -415 872 -466 92 -14 313 -14 406 0 207 30 421 114 604 235 117 77 302 262 378 377 185 282 265 582 243 914 -19 294 -133 579 -327 817 -197 241 -532 436 -846 491 -113 20 -326 27 -430 14z"/>
                                    <path d="M4461 9265 c-106 -23 -157 -44 -235 -95 -215 -141 -335 -357 -336 -608 0 -114 23 -210 78 -322 38 -79 60 -109 132 -181 75 -75 100 -93 191 -137 57 -28 127 -56 154 -63 69 -18 4747 -26 4900 -9 257 29 478 184 582 407 94 202 88 450 -15 636 -74 134 -186 242 -317 307 -165 82 88 74 -2640 77 -2045 1 -2440 -1 -2494 -12z"/>
                                    <path d="M1303 6429 c-488 -45 -941 -357 -1154 -794 -376 -774 -6 -1687 803 -1986 486 -179 1055 -67 1447 284 410 368 570 939 415 1474 -189 653 -829 1086 -1511 1022z"/>
                                    <path d="M4433 5695 c-140 -36 -222 -84 -329 -190 -78 -78 -98 -104 -137 -185 -54 -113 -77 -209 -77 -322 0 -117 22 -208 76 -318 40 -81 60 -109 138 -185 72 -72 109 -99 176 -133 170 -85 -89 -77 2650 -77 2302 0 2439 1 2511 18 354 83 593 422 548 779 -21 169 -85 296 -213 423 -92 92 -195 151 -323 188 l-78 22 -2425 2 -2425 2 -92 -24z"/>
                                    <path d="M1230 2860 c-364 -62 -690 -246 -902 -509 -289 -359 -393 -823 -283 -1261 67 -265 187 -473 384 -670 382 -381 948 -515 1457 -345 440 147 778 486 918 922 124 387 77 817 -127 1168 -198 339 -551 593 -947 680 -88 20 -414 29 -500 15z"/>
                                    <path d="M4476 2143 c-343 -69 -587 -362 -586 -702 1 -295 173 -555 445 -668 133 -56 -4 -54 2640 -51 l2430 3 70 23 c258 87 432 266 496 509 26 101 28 251 4 348 -59 236 -243 433 -480 513 l-80 27 -670 2 c-2390 9 -4212 7 -4269 -4z"/>
                                </g>
                            </svg>
                        </button>
                        <button id="xo-icon" data-cmd="insertOrderedList">
                            <svg version="1.0" viewBox="0 0 1000.000000 1000.000000" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                                <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
                                    <path d="M1370 9946 c-93 -33 -769 -374 -797 -402 -23 -23 -23 -26 -23 -232 0 -289 -10 -281 259 -218 179 42 187 42 201 17 11 -21 15 -1286 4 -1315 -5 -14 -31 -16 -183 -16 -188 0 -248 -9 -268 -36 -10 -13 -13 -83 -13 -281 l0 -264 25 -24 24 -25 849 0 849 0 27 25 26 24 0 270 0 271 -27 17 c-23 15 -56 19 -228 21 -137 3 -202 8 -207 15 -4 7 -8 487 -8 1068 0 1053 0 1056 -21 1083 l-20 26 -202 0 c-185 0 -207 -2 -267 -24z"/>
                                    <path d="M4461 9265 c-106 -23 -157 -44 -235 -95 -215 -141 -335 -357 -336 -608 0 -114 23 -210 78 -322 38 -79 60 -109 132 -181 75 -75 100 -93 191 -137 57 -28 127 -56 154 -63 69 -18 4747 -26 4900 -9 257 29 478 184 582 407 94 202 88 450 -15 636 -74 134 -186 242 -317 307 -165 82 88 74 -2640 77 -2045 1 -2440 -1 -2494 -12z"/>
                                    <path d="M1185 6434 c-362 -65 -660 -281 -869 -628 -73 -122 -61 -136 261 -293 139 -68 260 -123 269 -123 30 0 53 21 85 77 94 167 200 287 300 339 50 27 62 29 169 29 133 0 180 -16 245 -81 57 -59 80 -115 80 -204 0 -191 -88 -290 -720 -810 -496 -408 -666 -553 -700 -596 l-35 -47 0 -216 c0 -119 3 -226 6 -237 3 -12 17 -27 30 -33 18 -8 335 -11 1130 -11 l1105 0 24 26 25 27 0 303 c0 291 -1 305 -20 324 -20 20 -33 20 -597 20 -318 0 -584 4 -590 8 -10 7 -10 11 0 24 6 8 183 129 391 268 208 139 419 286 468 327 145 121 237 250 290 409 20 61 23 88 23 234 -1 161 -1 167 -34 263 -62 181 -196 346 -358 443 -132 79 -277 129 -463 159 -121 19 -404 19 -515 -1z"/>
                                    <path d="M4433 5695 c-140 -36 -222 -84 -329 -190 -78 -78 -98 -104 -137 -185 -54 -113 -77 -209 -77 -322 0 -117 22 -208 76 -318 40 -81 60 -109 138 -185 72 -72 109 -99 176 -133 170 -85 -89 -77 2650 -77 2302 0 2439 1 2511 18 354 83 593 422 548 779 -21 169 -85 296 -213 423 -92 92 -195 151 -323 188 l-78 22 -2425 2 -2425 2 -92 -24z"/>
                                    <path d="M1160 2875 c-310 -47 -588 -170 -747 -332 -66 -66 -82 -100 -65 -137 14 -32 398 -386 418 -386 9 0 57 34 107 76 169 142 278 196 433 214 150 17 256 -11 337 -88 113 -109 62 -298 -102 -382 -69 -34 -149 -50 -326 -61 -192 -13 -221 -22 -230 -72 -3 -17 -5 -135 -3 -260 3 -221 4 -229 25 -246 18 -15 53 -19 235 -25 282 -10 357 -29 453 -117 59 -54 86 -116 87 -193 0 -69 -12 -106 -48 -154 -77 -100 -271 -144 -474 -108 -151 28 -252 85 -420 241 -95 88 -107 96 -134 91 -29 -6 -127 -70 -360 -234 -122 -85 -136 -108 -111 -169 54 -130 262 -299 485 -396 243 -105 454 -143 755 -134 668 19 1048 243 1135 667 24 116 26 260 4 344 -53 208 -223 385 -459 477 -33 12 -65 29 -72 37 -20 24 2 49 59 68 141 46 264 153 334 289 52 100 67 164 66 274 -5 364 -285 616 -787 707 -125 23 -469 28 -595 9z"/>
                                    <path d="M4476 2143 c-343 -69 -587 -362 -586 -702 1 -295 173 -555 445 -668 133 -56 -4 -54 2640 -51 l2430 3 70 23 c258 87 432 266 496 509 26 101 28 251 4 348 -59 236 -243 433 -480 513 l-80 27 -670 2 c-2390 9 -4212 7 -4269 -4z"/>
                                </g>
                            </svg>
                        </button>
                    </div>
                    <div id="xo-toolGroup">
                        <button id="xo-icon" link>
                            <svg version="1.0" viewBox="0 0 1000.000000 1000.000000" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                                <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
                                    <path d="M1915 9994 c-270 -41 -530 -144 -731 -292 -100 -73 -717 -680 -816 -802 -162 -199 -271 -428 -329 -691 -20 -90 -23 -132 -23 -309 0 -174 4 -221 23 -310 47 -222 124 -406 248 -595 60 -92 159 -193 1202 -1236 1005 -1004 1147 -1143 1230 -1198 413 -274 913 -343 1386 -191 201 65 425 195 567 328 63 60 70 64 85 49 15 -14 12 -20 -34 -70 -208 -229 -343 -504 -400 -817 -23 -130 -23 -389 1 -525 48 -266 139 -478 298 -695 95 -129 2201 -2237 2327 -2329 115 -85 207 -137 336 -191 205 -87 374 -119 627 -120 375 0 690 110 993 348 101 79 688 671 768 774 159 205 261 429 312 686 13 67 16 130 13 330 -4 240 -5 250 -36 363 -58 217 -142 391 -273 569 -91 124 -2200 2232 -2324 2323 -360 265 -794 367 -1235 291 -274 -47 -581 -197 -778 -379 -63 -59 -70 -63 -85 -48 -14 15 -10 22 49 87 178 194 314 467 375 756 33 153 33 437 1 598 -31 154 -72 274 -143 417 -118 237 -89 206 -1303 1421 -1200 1199 -1177 1178 -1398 1291 -126 65 -240 107 -378 140 -91 21 -132 25 -315 28 -115 2 -223 1 -240 -1z m372 -729 c142 -30 249 -79 363 -164 100 -76 2139 -2124 2189 -2199 109 -163 153 -305 154 -497 1 -208 -54 -373 -178 -535 -76 -99 -44 -116 -331 171 l-254 254 -255 -255 -255 -255 256 -256 255 -255 -43 -40 c-99 -91 -218 -155 -357 -191 -136 -35 -306 -35 -442 0 -106 28 -171 57 -269 123 -87 58 -2190 2164 -2244 2247 -99 153 -138 287 -139 477 -1 146 11 214 63 341 52 130 111 201 419 512 163 165 323 321 357 347 111 89 260 156 401 180 80 13 237 11 310 -5z m4343 -4306 c100 -25 239 -95 325 -164 75 -60 2146 -2140 2182 -2191 42 -60 102 -192 125 -275 19 -71 23 -107 22 -234 0 -136 -3 -158 -28 -235 -35 -105 -75 -187 -131 -265 -53 -74 -662 -680 -727 -724 -147 -98 -322 -151 -503 -151 -168 0 -327 47 -463 137 -54 36 -335 311 -1138 1113 -586 586 -1086 1093 -1110 1127 -225 313 -208 751 41 1057 25 31 51 56 57 56 5 0 67 -56 137 -125 l127 -124 254 254 255 255 -130 130 -129 129 24 26 c35 37 162 123 223 149 80 36 184 67 257 76 88 11 239 2 330 -21z"/>
                                </g>
                            </svg>
                        </button>
                        <button id="xo-icon" image>
                            <svg version="1.0" viewBox="0 0 803.000000 1000.000000" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                                <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
                                    <path d="M0 5000 l0 -5000 4010 0 4010 0 0 5000 0 5000 -4010 0 -4010 0 0 -5000z m7500 -5 l0 -4485 -3492 2 -3493 3 -3 4483 -2 4482 3495 0 3495 0 0 -4485z"/>
                                    <path d="M2535 7326 c-170 -45 -332 -156 -425 -291 -162 -236 -173 -544 -28 -790 63 -106 174 -211 283 -267 123 -63 195 -81 335 -82 122 -1 186 10 284 51 193 80 345 246 414 450 23 69 26 94 27 218 0 155 -11 208 -70 327 -85 173 -237 302 -440 374 -66 23 -307 29 -380 10z"/>
                                    <path d="M4717 5748 c-317 -876 -629 -1738 -694 -1916 -92 -256 -119 -320 -129 -310 -6 7 -276 462 -599 1011 -323 549 -591 995 -595 990 -4 -4 -277 -467 -607 -1028 -331 -561 -709 -1203 -841 -1427 -132 -224 -237 -409 -234 -412 8 -9 5960 -7 5965 2 3 4 -76 230 -175 502 -98 272 -475 1314 -838 2315 -362 1001 -662 1831 -667 1843 -7 19 -118 -276 -586 -1570z"/>
                                </g>
                            </svg>
                        </button>
                    </div>
                    <button id="xo-icon" colors>
                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000.000000 1000.000000" preserveAspectRatio="xMidYMid meet">
                            <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
                                <path d="M4725 9994 c-707 -45 -1356 -219 -1980 -531 -753 -377 -1434 -982 -1911 -1698 -127 -191 -208 -334 -324 -570 -273 -557 -429 -1110 -492 -1750 -16 -167 -16 -720 0 -885 106 -1064 488 -1980 1161 -2785 115 -137 409 -433 565 -568 725 -626 1630 -1034 2577 -1161 384 -52 750 -58 899 -16 231 65 420 222 525 435 68 140 80 194 79 375 0 148 -1 159 -32 249 -39 111 -84 191 -161 286 -87 106 -128 172 -162 259 -184 477 73 981 570 1119 73 20 106 21 756 27 771 8 816 11 1112 85 813 205 1505 786 1849 1555 224 501 290 1029 208 1660 -90 684 -370 1363 -799 1935 -185 246 -471 551 -700 745 -498 424 -1105 761 -1745 968 -394 128 -749 202 -1184 248 -134 14 -681 26 -811 18z m-965 -1118 c170 -31 315 -109 445 -241 159 -160 235 -352 235 -587 0 -254 -122 -502 -321 -653 -80 -60 -224 -129 -314 -151 -96 -23 -297 -22 -390 1 -163 40 -352 160 -453 288 -68 85 -105 156 -143 267 -27 83 -32 113 -37 230 -4 116 -2 147 17 220 109 433 526 704 961 626z m2771 0 c318 -52 575 -290 665 -616 28 -102 26 -320 -4 -424 -49 -169 -151 -325 -283 -429 -152 -122 -317 -179 -519 -179 -156 0 -232 17 -365 81 -272 133 -440 380 -464 681 -19 247 53 458 217 632 201 213 463 301 753 254z m-4398 -2231 c161 -41 280 -108 393 -220 125 -125 192 -244 230 -411 25 -111 23 -283 -5 -389 -76 -287 -301 -515 -588 -597 -65 -19 -103 -22 -228 -22 -143 0 -154 1 -245 32 -110 39 -181 77 -266 143 -136 108 -239 265 -286 440 -32 120 -32 321 0 432 44 152 148 320 255 409 113 94 257 164 382 187 33 6 71 13 85 15 46 8 209 -3 273 -19z m6034 14 c171 -23 331 -100 458 -220 175 -167 259 -368 259 -619 -1 -107 -5 -138 -28 -215 -85 -280 -279 -476 -566 -571 -78 -26 -97 -28 -235 -28 -136 1 -158 3 -235 29 -115 37 -191 76 -279 143 -233 177 -358 499 -307 791 78 447 489 751 933 690z"/>
                            </g>
                        </svg>
                    </button>
                    <div id="xo-toolGroup">
                        <button id="xo-icon" data-cmd="undo">
                            <svg version="1.0" viewBox="0 0 1000.000000 1000.000000" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                                <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
                                    <path d="M2767 9230 c-26 -5 -67 -20 -90 -34 -23 -13 -619 -602 -1323 -1308 -1147 -1148 -1284 -1288 -1300 -1333 -26 -68 -25 -166 2 -225 13 -27 377 -472 889 -1085 478 -572 1046 -1253 1263 -1514 278 -333 409 -482 440 -502 53 -34 140 -53 196 -45 90 15 176 80 218 165 l23 46 5 845 5 845 110 17 c324 52 798 72 1105 49 1585 -122 2957 -931 4051 -2387 367 -489 736 -1113 1015 -1718 38 -81 84 -165 102 -186 50 -59 130 -94 216 -95 62 0 79 4 133 34 70 37 107 80 134 152 25 66 24 108 -10 354 -256 1830 -826 3251 -1725 4297 -147 171 -413 436 -586 584 -849 724 -1903 1148 -3145 1266 -220 21 -954 18 -1170 -5 -93 -9 -180 -20 -192 -22 l-23 -5 0 788 c0 876 3 840 -67 922 -49 57 -99 86 -168 99 -32 6 -59 10 -59 10 -1 -1 -22 -5 -49 -9z"/>
                                </g>
                            </svg>
                        </button>
                        <button id="xo-icon" data-cmd="redo">
                            <svg version="1.0" viewBox="0 0 1000.000000 1000.000000" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                                <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
                                    <path d="M7117 9228 c-60 -11 -113 -44 -160 -98 -70 -82 -67 -46 -67 -922 l0 -788 -22 5 c-13 2 -99 13 -193 22 -216 23 -950 26 -1170 5 -1242 -118 -2296 -542 -3145 -1266 -173 -148 -439 -413 -586 -584 -899 -1046 -1469 -2467 -1725 -4297 -34 -246 -35 -288 -10 -354 27 -72 64 -115 134 -152 54 -30 71 -34 133 -34 86 1 166 36 216 95 18 21 64 105 102 186 83 181 252 511 354 694 544 974 1181 1746 1912 2316 826 644 1777 1016 2800 1095 307 23 781 3 1105 -49 l110 -17 5 -845 5 -845 23 -46 c42 -85 128 -150 218 -165 56 -8 143 11 196 45 31 20 162 169 440 502 217 261 785 942 1263 1514 512 613 876 1058 889 1085 27 59 28 157 2 225 -16 45 -153 185 -1305 1338 -1045 1047 -1295 1292 -1336 1311 -59 29 -122 37 -188 24z"/>
                                </g>
                            </svg>
                        </button>
                    </div>
                </div>
                <div id="xo-items" shrink>
                    <h3 style="margin:0">Create Link</h3>
                    <input id="link" type="text" placeholder="https://" disabled>
                    <button id="ok" disabled>
                        <svg version="1.0" viewBox="0 0 1000.000000 1000.000000" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                            <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
                                <path d="M7515 6559 c-2888 -1952 -3986 -2693 -4001 -2702 -6 -4 -202 70 -435 164 -1485 598 -3062 1229 -3065 1226 -2 -1 784 -790 1746 -1752 l1750 -1750 3243 3243 c1783 1783 3240 3242 3237 3242 -3 -1 -1116 -752 -2475 -1671z"></path>
                            </g>
                        </svg>
                    </button>
                </div>
                <div id="xo-items" shrink>
                    <h3 style="margin:0">Insert Image</h3>
                    <input id="image" type="text" placeholder="https://" disabled>
                    <button id="ok" disabled>                    
                        <svg version="1.0" viewBox="0 0 1000.000000 1000.000000" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                            <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
                                <path d="M7515 6559 c-2888 -1952 -3986 -2693 -4001 -2702 -6 -4 -202 70 -435 164 -1485 598 -3062 1229 -3065 1226 -2 -1 784 -790 1746 -1752 l1750 -1750 3243 3243 c1783 1783 3240 3242 3237 3242 -3 -1 -1116 -752 -2475 -1671z"></path>
                            </g>
                        </svg>
                    </button>
                </div>
                <div id="xo-items" shrink>
                    <div>
                        <h3>Background Color</h3>
                        <button data-color="rgb(0, 0, 0)" id="xo-item" disabled backcolor></button>
                        <button data-color="rgb(68, 68, 68)" id="xo-item" disabled backcolor></button>
                        <button data-color="rgb(102, 102, 102)" id="xo-item" disabled backcolor></button>
                        <button data-color="rgb(153, 153, 153)" id="xo-item" disabled backcolor></button>
                        <button data-color="rgb(204, 204, 204)" id="xo-item" disabled backcolor></button>
                        <button data-color="rgb(238, 238, 238)" id="xo-item" disabled backcolor></button>
                        <button data-color="rgb(243, 243, 243)" id="xo-item" disabled backcolor></button>
                        <button data-color="rgb(255, 255, 255)" id="xo-item" disabled backcolor></button>
                        <p></p>
                        <button data-color="rgb(255, 0, 0)" id="xo-item" disabled backcolor></button>
                        <button data-color="rgb(255, 153, 0)" id="xo-item" disabled backcolor></button>
                        <button data-color="rgb(255, 255, 0)" id="xo-item" disabled backcolor></button>
                        <button data-color="rgb(0, 255, 0)" id="xo-item" disabled backcolor></button>
                        <button data-color="rgb(0, 255, 255)" id="xo-item" disabled backcolor></button>
                        <button data-color="rgb(0, 0, 255)" id="xo-item" disabled backcolor></button>
                        <button data-color="rgb(153, 0, 255)" id="xo-item" disabled backcolor></button>
                        <button data-color="rgb(255, 0, 255)" id="xo-item" disabled backcolor></button>
                        <p></p>
                        <button data-color="rgb(244, 204, 204)" id="xo-item" disabled backcolor></button>
                        <button data-color="rgb(252, 229, 205)" id="xo-item" disabled backcolor></button>
                        <button data-color="rgb(255, 242, 204)" id="xo-item" disabled backcolor></button>
                        <button data-color="rgb(217, 234, 211)" id="xo-item" disabled backcolor></button>
                        <button data-color="rgb(208, 224, 227)" id="xo-item" disabled backcolor></button>
                        <button data-color="rgb(207, 226, 243)" id="xo-item" disabled backcolor></button>
                        <button data-color="rgb(217, 210, 233)" id="xo-item" disabled backcolor></button>
                        <button data-color="rgb(234, 209, 220)" id="xo-item" disabled backcolor></button>
                        <button data-color="rgb(234, 153, 153)" id="xo-item" disabled backcolor></button>
                        <button data-color="rgb(249, 203, 156)" id="xo-item" disabled backcolor></button>
                        <button data-color="rgb(255, 229, 153)" id="xo-item" disabled backcolor></button>
                        <button data-color="rgb(182, 215, 168)" id="xo-item" disabled backcolor></button>
                        <button data-color="rgb(162, 196, 201)" id="xo-item" disabled backcolor></button>
                        <button data-color="rgb(159, 197, 232)" id="xo-item" disabled backcolor></button>
                        <button data-color="rgb(180, 167, 214)" id="xo-item" disabled backcolor></button>
                        <button data-color="rgb(213, 166, 189)" id="xo-item" disabled backcolor></button>
                        <button data-color="rgb(224, 102, 102)" id="xo-item" disabled backcolor></button>
                        <button data-color="rgb(246, 178, 107)" id="xo-item" disabled backcolor></button>
                        <button data-color="rgb(255, 217, 102)" id="xo-item" disabled backcolor></button>
                        <button data-color="rgb(147, 196, 125)" id="xo-item" disabled backcolor></button>
                        <button data-color="rgb(118, 165, 175)" id="xo-item" disabled backcolor></button>
                        <button data-color="rgb(111, 168, 220)" id="xo-item" disabled backcolor></button>
                        <button data-color="rgb(142, 124, 195)" id="xo-item" disabled backcolor></button>
                        <button data-color="rgb(194, 123, 160)" id="xo-item" disabled backcolor></button>
                        <button data-color="rgb(204, 0, 0)" id="xo-item" disabled backcolor></button>
                        <button data-color="rgb(230, 145, 56)" id="xo-item" disabled backcolor></button>
                        <button data-color="rgb(241, 194, 50)" id="xo-item" disabled backcolor></button>
                        <button data-color="rgb(106, 168, 79)" id="xo-item" disabled backcolor></button>
                        <button data-color="rgb(69, 129, 142)" id="xo-item" disabled backcolor></button>
                        <button data-color="rgb(61, 133, 198)" id="xo-item" disabled backcolor></button>
                        <button data-color="rgb(103, 78, 167)" id="xo-item" disabled backcolor></button>
                        <button data-color="rgb(166, 77, 121)" id="xo-item" disabled backcolor></button>
                        <button data-color="rgb(153, 0, 0)" id="xo-item" disabled backcolor></button>
                        <button data-color="rgb(180, 95, 6)" id="xo-item" disabled backcolor></button>
                        <button data-color="rgb(191, 144, 0)" id="xo-item" disabled backcolor></button>
                        <button data-color="rgb(56, 118, 29)" id="xo-item" disabled backcolor></button>
                        <button data-color="rgb(19, 79, 92)" id="xo-item" disabled backcolor></button>
                        <button data-color="rgb(11, 83, 148)" id="xo-item" disabled backcolor></button>
                        <button data-color="rgb(53, 28, 117)" id="xo-item" disabled backcolor></button>
                        <button data-color="rgb(116, 27, 71)" id="xo-item" disabled backcolor></button>
                        <button data-color="rgb(102, 0, 0)" id="xo-item" disabled backcolor></button>
                        <button data-color="rgb(120, 63, 4)" id="xo-item" disabled backcolor></button>
                        <button data-color="rgb(127, 96, 0)" id="xo-item" disabled backcolor></button>
                        <button data-color="rgb(39, 78, 19)" id="xo-item" disabled backcolor></button>
                        <button data-color="rgb(12, 52, 61)" id="xo-item" disabled backcolor></button>
                        <button data-color="rgb(7, 55, 99)" id="xo-item" disabled backcolor></button>
                        <button data-color="rgb(32, 18, 77)" id="xo-item" disabled backcolor></button>
                        <button data-color="rgb(76, 17, 48)" id="xo-item" disabled backcolor></button>
                    </div>
                    <div>
                        <h3>Text Color</h3>
                        <button data-color="rgb(0, 0, 0)" id="xo-item" disabled forecolor></button>
                        <button data-color="rgb(68, 68, 68)" id="xo-item" disabled forecolor></button>
                        <button data-color="rgb(102, 102, 102)" id="xo-item" disabled forecolor></button>
                        <button data-color="rgb(153, 153, 153)" id="xo-item" disabled forecolor></button>
                        <button data-color="rgb(204, 204, 204)" id="xo-item" disabled forecolor></button>
                        <button data-color="rgb(238, 238, 238)" id="xo-item" disabled forecolor></button>
                        <button data-color="rgb(243, 243, 243)" id="xo-item" disabled forecolor></button>
                        <button data-color="rgb(255, 255, 255)" id="xo-item" disabled forecolor></button>
                        <p></p>
                        <button data-color="rgb(255, 0, 0)" id="xo-item" disabled forecolor></button>
                        <button data-color="rgb(255, 153, 0)" id="xo-item" disabled forecolor></button>
                        <button data-color="rgb(255, 255, 0)" id="xo-item" disabled forecolor></button>
                        <button data-color="rgb(0, 255, 0)" id="xo-item" disabled forecolor></button>
                        <button data-color="rgb(0, 255, 255)" id="xo-item" disabled forecolor></button>
                        <button data-color="rgb(0, 0, 255)" id="xo-item" disabled forecolor></button>
                        <button data-color="rgb(153, 0, 255)" id="xo-item" disabled forecolor></button>
                        <button data-color="rgb(255, 0, 255)" id="xo-item" disabled forecolor></button>
                        <p></p>
                        <button data-color="rgb(244, 204, 204)" id="xo-item" disabled forecolor></button>
                        <button data-color="rgb(252, 229, 205)" id="xo-item" disabled forecolor></button>
                        <button data-color="rgb(255, 242, 204)" id="xo-item" disabled forecolor></button>
                        <button data-color="rgb(217, 234, 211)" id="xo-item" disabled forecolor></button>
                        <button data-color="rgb(208, 224, 227)" id="xo-item" disabled forecolor></button>
                        <button data-color="rgb(207, 226, 243)" id="xo-item" disabled forecolor></button>
                        <button data-color="rgb(217, 210, 233)" id="xo-item" disabled forecolor></button>
                        <button data-color="rgb(234, 209, 220)" id="xo-item" disabled forecolor></button>
                        <button data-color="rgb(234, 153, 153)" id="xo-item" disabled forecolor></button>
                        <button data-color="rgb(249, 203, 156)" id="xo-item" disabled forecolor></button>
                        <button data-color="rgb(255, 229, 153)" id="xo-item" disabled forecolor></button>
                        <button data-color="rgb(182, 215, 168)" id="xo-item" disabled forecolor></button>
                        <button data-color="rgb(162, 196, 201)" id="xo-item" disabled forecolor></button>
                        <button data-color="rgb(159, 197, 232)" id="xo-item" disabled forecolor></button>
                        <button data-color="rgb(180, 167, 214)" id="xo-item" disabled forecolor></button>
                        <button data-color="rgb(213, 166, 189)" id="xo-item" disabled forecolor></button>
                        <button data-color="rgb(224, 102, 102)" id="xo-item" disabled forecolor></button>
                        <button data-color="rgb(246, 178, 107)" id="xo-item" disabled forecolor></button>
                        <button data-color="rgb(255, 217, 102)" id="xo-item" disabled forecolor></button>
                        <button data-color="rgb(147, 196, 125)" id="xo-item" disabled forecolor></button>
                        <button data-color="rgb(118, 165, 175)" id="xo-item" disabled forecolor></button>
                        <button data-color="rgb(111, 168, 220)" id="xo-item" disabled forecolor></button>
                        <button data-color="rgb(142, 124, 195)" id="xo-item" disabled forecolor></button>
                        <button data-color="rgb(194, 123, 160)" id="xo-item" disabled forecolor></button>
                        <button data-color="rgb(204, 0, 0)" id="xo-item" disabled forecolor></button>
                        <button data-color="rgb(230, 145, 56)" id="xo-item" disabled forecolor></button>
                        <button data-color="rgb(241, 194, 50)" id="xo-item" disabled forecolor></button>
                        <button data-color="rgb(106, 168, 79)" id="xo-item" disabled forecolor></button>
                        <button data-color="rgb(69, 129, 142)" id="xo-item" disabled forecolor></button>
                        <button data-color="rgb(61, 133, 198)" id="xo-item" disabled forecolor></button>
                        <button data-color="rgb(103, 78, 167)" id="xo-item" disabled forecolor></button>
                        <button data-color="rgb(166, 77, 121)" id="xo-item" disabled forecolor></button>
                        <button data-color="rgb(153, 0, 0)" id="xo-item" disabled forecolor></button>
                        <button data-color="rgb(180, 95, 6)" id="xo-item" disabled forecolor></button>
                        <button data-color="rgb(191, 144, 0)" id="xo-item" disabled forecolor></button>
                        <button data-color="rgb(56, 118, 29)" id="xo-item" disabled forecolor></button>
                        <button data-color="rgb(19, 79, 92)" id="xo-item" disabled forecolor></button>
                        <button data-color="rgb(11, 83, 148)" id="xo-item" disabled forecolor></button>
                        <button data-color="rgb(53, 28, 117)" id="xo-item" disabled forecolor></button>
                        <button data-color="rgb(116, 27, 71)" id="xo-item" disabled forecolor></button>
                        <button data-color="rgb(102, 0, 0)" id="xo-item" disabled forecolor></button>
                        <button data-color="rgb(120, 63, 4)" id="xo-item" disabled forecolor></button>
                        <button data-color="rgb(127, 96, 0)" id="xo-item" disabled forecolor></button>
                        <button data-color="rgb(39, 78, 19)" id="xo-item" disabled forecolor></button>
                        <button data-color="rgb(12, 52, 61)" id="xo-item" disabled forecolor></button>
                        <button data-color="rgb(7, 55, 99)" id="xo-item" disabled forecolor></button>
                        <button data-color="rgb(32, 18, 77)" id="xo-item" disabled forecolor></button>
                        <button data-color="rgb(76, 17, 48)" id="xo-item" disabled forecolor></button>
                    </div>
                </div>
                <div id="xo-content" contenteditable></div>
            </main>
        `;
    }
}