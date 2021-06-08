import XOElement from "./XO.Element.js"

export default class extends XOElement {
    static attributes = {
        src: String,
        silent: Boolean,
        change(n, v) {
            switch (n) {
                case "src":
                    this.$.video.src = v;
                    break;
                case "silent":
                    if (this.matches("[silent]")) this.mute();
                    else this.unmute();
                    break;
            }
        }
    }

    static properties = {
        duration: { default: 0, type: Number },
        current: { default: 0, type: Number },
        volume: { default: 100, type: Number },
        paused: { default: true, type: Boolean },
        ended: { default: false, type: Boolean },
        muted: { default: false, type: Boolean },
        full: { default: false, type: Boolean },
        change(n, v) {
            switch (n) {
                case "duration":
                    this.$.time[1].innerHTML = __format__(v);
                    break;
                case "current":
                    var val = (v - 0) / (Number(this.duration) - 0) * 100;
                    this.$.input.value = v;
                    this.$.time[0].innerHTML = __format__(v);
                    this.$.input.style.background = `linear-gradient(90deg, var(--pros) ${val}%, var(--back) ${val}%)`;
                    break;
                case "volume":
                    var val = (v - 0) / (100 - 0) * 100;
                    this.$.sound.value = val;
                    this.$.video.volume = v / 100;
                    this.$.sound.style.background = `linear-gradient(90deg, var(--pros) ${val}%, var(--back) ${val}%)`;
                    break;
                case "muted":
                    this.$.video.muted = v;
                    if (v) {
                        this.$.sound.value = 0;
                        this.$.video.volume = 0;
                        this.$.sound.style.background = `linear-gradient(90deg, var(--pros) 0%, var(--back) 0%)`;
                    } else {
                        this.$.sound.value = this.volume;
                        this.$.video.volume = this.volume / 100;
                        this.$.sound.style.background = `linear-gradient(90deg, var(--pros) ${this.volume}%, var(--back) ${this.volume}%)`;
                    }
                    break;
            }
        }
    }

    static callbacks = {
        create() {
            this.volume = 100;
        },
        attach() {
            var move = setTimeout(() => {
                this.$.controls.style.bottom = "";
            }, 0);
            this.$.container.addEventListener("fullscreenchange", () => {
                if (document.fullscreenElement === null && this.full) this.minimize();
            });
            this.$.sound.addEventListener("input", () => {
                var val = (Number(this.$.sound.value) - Number(this.$.sound.min)) / (Number(this.$.sound.max) - Number(this.$.sound.min)) * 100;
                this.$.sound.style.background = `linear-gradient(90deg, var(--pros) ${val}%, var(--back) ${val}%)`;
                this.volume = this.$.sound.value;
                if (this.$.sound.value === "0") this.mute();
                else this.unmute();
            });
            this.$.input.addEventListener("input", () => {
                this.current = this.$.input.value;
                this.$.video.currentTime = this.$.input.value;
            });
            this.$.video.addEventListener("ended", () => {
                if (this.matches("[loop]")) {
                    this.ended = false;
                    this.play();
                    return;
                }
                this.ended = true;
                this.pause();
                var event = new CustomEvent("complete", {
                    bubbles: true,
                    cancelable: true,
                })
                this.dispatchEvent(event);
            });
            this.$.video.addEventListener("loadstart", () => {
                this.duration = this.$.video.duration;
                this.current = this.$.video.currentTime;
                this.$.input.max = this.duration;
                var event = new CustomEvent("start", {
                    bubbles: true,
                    cancelable: true,
                })
                this.dispatchEvent(event);
            });
            this.$.video.addEventListener("timeupdate", () => {
                this.current = this.$.video.currentTime;
                this.duration = this.$.video.duration;
                this.$.input.max = this.duration;
                var event = new CustomEvent("progress", {
                    bubbles: true,
                    cancelable: true,
                })
                this.dispatchEvent(event);
            });
            this.$.video.addEventListener("click", () => {
                this.$.btn[0].click();
            });
            this.$.btn[0].addEventListener('click', () => {
                if (this.$.video.paused) this.play()
                else this.pause();
            });
            this.$.btn[1].addEventListener("click", () => {
                this.$.video.pause();
                this.$.video.currentTime = this.$.video.currentTime - 10;
                this.current = this.$.video.currentTime - 10;
                this.$.video.play();
            });
            this.$.btn[2].addEventListener("click", () => {
                this.$.video.pause();
                this.$.video.currentTime = this.$.video.currentTime + 10;
                this.current = this.$.video.currentTime + 10;
                this.$.video.play();
            });
            this.$.btn[3].addEventListener('click', () => {
                if (this.$.video.muted) this.unmute()
                else this.mute();
            });
            this.$.btn[4].addEventListener('click', () => {
                if (this.full) this.minimize()
                else this.maximize();
            });
            this.addEventListener("mousemove", () => {
                this.$.controls.style.bottom = "0";
                clearTimeout(move)
                move = setTimeout(() => {
                    this.$.controls.style.bottom = "";
                }, 5000);
            });
            this.addEventListener("dblclick", () => {
                if (this.full) {
                    this.pause();
                    this.minimize();
                } else {
                    this.maximize();
                    this.play();
                }
            });
        },
        detach() {
            this.$.container.removeEventListener("fullscreenchange", () => {});
            this.$.video.addEventListener("loadstart", () => {});
            this.$.sound.removeEventListener("input", () => {});
            this.$.input.removeEventListener("input", () => {});
            this.$.video.removeEventListener("timeupdate", () => {});
            this.$.video.removeEventListener("click", () => {});
            this.$.btn[0].removeEventListener("click", () => {});
            this.$.btn[1].removeEventListener("click", () => {});
            this.$.btn[2].removeEventListener("click", () => {});
            this.$.btn[3].removeEventListener("click", () => {});
            this.$.btn[4].removeEventListener("click", () => {});
            this.$.video.removeEventListener("ended", () => {});
            this.removeEventListener("mousemove", () => {});
            this.removeEventListener("dblclick", () => {});
        }
    }

    static styles = `
        /* Globals */
        #xo-input,
        #xo-sound,
        #xo-btn {
            all: unset;
        }
        #xo-input:focus,
        #xo-sound:focus,
        #xo-btn:focus {
            outline: auto;
        }
        * {
            font-family: Arial, sans-serif;
            box-sizing: border-box;
        }
        /* Element */
        :host {
            --back: #f1f1f1;
            --pros: #007bff;
            display: inline-block;
            width: 500px;
            height: 300px;
        }
        /* Container */
        #xo-container {
            position: relative;
            overflow: hidden;
            display: flex;
            width: 100%;
            height: 100%;
            background: black;
        }
        /* Video */
        #xo-video {
            width: 100%;
            height: 100%;
        }
        #xo-video:-webkit-media-controls {
            display: none;
        }
        /* Controls */
        :host([trigger="hidden"]) #xo-controls {
            display: none;
        }
        #xo-controls {
            transition: bottom 0.3s ease-in-out;
            width: calc(100% - 20px);
            display: flex;
            flex-wrap: wrap;
            padding: 10px;
            border-radius: 5px;
            background: #00000050;
            align-items: center;
            margin: 10px;
            gap: 10px;
            position: absolute;
            bottom: -100%;
            left: 0;
        }
        #xo-controls:hover {
            bottom: 0;
        }
        #xo-controls div {
            width: 100%;
            display: flex;
            gap: 10px;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
        }
        #xo-controls div[buttons] {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
        }
        #xo-controls div[buttons] div,
        #xo-controls div[buttons] div div {
            display: flex;
            align-items: center;
            width: max-content;
        }
        /* Labels */
        #xo-time {
            display: flex;
            font-size: 12px;
            color: var(--back);
            font-weight: bolder;
        }
        /* Buttons */
        #xo-input,
        #xo-sound {
            background: var(--back);
            appearance: none;
            height: 5px;
            border-radius: 5px;
            cursor: pointer;
        }
        #xo-input {
            flex: 1;
        }
        #xo-sound {
            width: 60px;
            width: 0;
            transition: width 0.3s ease-in-out;
        }
        #sdvl:hover #xo-sound {
            width: 60px;
        }
        #xo-input::-webkit-slider-thumb,
        #xo-sound::-webkit-slider-thumb {
            appearance: none;
        }
        #xo-input:hover::-webkit-slider-thumb,
        #xo-sound:hover::-webkit-slider-thumb,
        #xo-input:focus::-webkit-slider-thumb,
        #xo-sound:focus::-webkit-slider-thumb {
            appearance: none;
            width: 4px;
            height: 10px;
            border-radius: 50%;
            cursor: pointer;
            background: #fff;
        }        
        #xo-btn {
            display: flex;
            cursor: pointer;
        }
        #xo-btn svg {
            display: flex;
            width: 20px;
            height: 20px;
            fill: var(--back);
        }
    `

    render() {
        return /*html*/ `
            <main id="xo-container">
                <video id="xo-video"></video>
                <div id="xo-controls">
                    <div>
                        <span id="xo-time">00:00</span>
                        <input type="range" id="xo-input" min="0" max="100" value="0">
                        <span id="xo-time">00:00</span>
                    </div>
                    <div buttons>
                        <div>
                            <button id="xo-btn">
                                <svg version="1.0" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 1000.000000 1000.000000" preserveAspectRatio="xMidYMid meet">
                                    <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
                                        <path d="M1285 9969 c-38 -5 -91 -16 -116 -24 -155 -52 -458 -313 -528 -456 -59 -122 -88 -298 -113 -694 -16 -261 -23 -5245 -9 -6530 14 -1229 20 -1396 56 -1520 92 -319 344 -611 599 -696 122 -40 447 -58 556 -30 125 31 356 150 795 406 150 87 231 134 590 342 105 60 325 188 490 283 471 272 530 306 875 505 179 103 388 223 465 268 77 44 327 188 555 320 228 132 530 306 670 387 560 322 677 390 975 563 171 99 411 239 535 312 124 73 374 219 555 325 433 254 766 453 838 502 104 71 225 240 288 402 51 133 72 244 72 391 0 259 -63 420 -233 598 -141 149 -406 333 -785 547 -167 94 -1242 711 -1625 933 -162 94 -468 270 -680 392 -212 122 -488 282 -615 355 -126 73 -313 181 -415 240 -102 59 -338 196 -525 305 -350 204 -893 519 -1375 798 -1225 710 -1362 774 -1685 782 -77 2 -171 0 -210 -6z"/>
                                    </g>
                                </svg>
                            </button>
                            <button id="xo-btn">
                                <svg version="1.0" viewBox="0 0 1000.000000 1000.000000" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                                    <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
                                        <path d="M2767 9230 c-26 -5 -67 -20 -90 -34 -23 -13 -619 -602 -1323 -1308 -1147 -1148 -1284 -1288 -1300 -1333 -26 -68 -25 -166 2 -225 13 -27 377 -472 889 -1085 478 -572 1046 -1253 1263 -1514 278 -333 409 -482 440 -502 53 -34 140 -53 196 -45 90 15 176 80 218 165 l23 46 5 845 5 845 110 17 c324 52 798 72 1105 49 1585 -122 2957 -931 4051 -2387 367 -489 736 -1113 1015 -1718 38 -81 84 -165 102 -186 50 -59 130 -94 216 -95 62 0 79 4 133 34 70 37 107 80 134 152 25 66 24 108 -10 354 -256 1830 -826 3251 -1725 4297 -147 171 -413 436 -586 584 -849 724 -1903 1148 -3145 1266 -220 21 -954 18 -1170 -5 -93 -9 -180 -20 -192 -22 l-23 -5 0 788 c0 876 3 840 -67 922 -49 57 -99 86 -168 99 -32 6 -59 10 -59 10 -1 -1 -22 -5 -49 -9z"/>
                                    </g>
                                </svg>
                            </button>
                            <button id="xo-btn">
                                <svg version="1.0" viewBox="0 0 1000.000000 1000.000000" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                                    <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
                                        <path d="M7117 9228 c-60 -11 -113 -44 -160 -98 -70 -82 -67 -46 -67 -922 l0 -788 -22 5 c-13 2 -99 13 -193 22 -216 23 -950 26 -1170 5 -1242 -118 -2296 -542 -3145 -1266 -173 -148 -439 -413 -586 -584 -899 -1046 -1469 -2467 -1725 -4297 -34 -246 -35 -288 -10 -354 27 -72 64 -115 134 -152 54 -30 71 -34 133 -34 86 1 166 36 216 95 18 21 64 105 102 186 83 181 252 511 354 694 544 974 1181 1746 1912 2316 826 644 1777 1016 2800 1095 307 23 781 3 1105 -49 l110 -17 5 -845 5 -845 23 -46 c42 -85 128 -150 218 -165 56 -8 143 11 196 45 31 20 162 169 440 502 217 261 785 942 1263 1514 512 613 876 1058 889 1085 27 59 28 157 2 225 -16 45 -153 185 -1305 1338 -1045 1047 -1295 1292 -1336 1311 -59 29 -122 37 -188 24z"/>
                                    </g>
                                </svg>
                            </button>
                            <div id="sdvl">
                                <button id="xo-btn">
                                    <svg version="1.0" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 1000.000000 1000.000000" preserveAspectRatio="xMidYMid meet">
                                        <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
                                            <path d="M5404 8985 c-34 -7 -75 -20 -92 -29 -17 -9 -36 -16 -42 -16 -6 0 -161 -86 -343 -192 -590 -341 -2130 -1230 -2373 -1370 l-171 -98 -995 0 c-677 0 -1013 -3 -1054 -11 -166 -31 -289 -148 -323 -309 -9 -41 -11 -536 -9 -1990 l3 -1935 23 -58 c51 -125 185 -227 327 -247 42 -6 463 -10 1059 -10 l989 0 206 -118 c113 -65 411 -237 661 -382 250 -144 687 -397 970 -560 283 -163 628 -362 765 -441 260 -151 323 -181 415 -200 83 -18 241 -6 320 23 180 66 326 228 374 415 14 55 16 412 16 3545 0 3862 6 3528 -67 3678 -44 92 -148 199 -240 248 -124 66 -281 87 -419 57z"/>
                                            <path d="M6835 7802 c-205 -71 -319 -244 -302 -456 15 -176 157 -334 338 -375 24 -6 121 -11 216 -11 341 0 610 -63 891 -207 544 -279 923 -772 1047 -1363 36 -168 45 -467 21 -640 -30 -216 -101 -450 -188 -624 -197 -392 -520 -710 -911 -896 -277 -132 -531 -189 -842 -190 -88 0 -187 -4 -219 -10 -165 -27 -307 -162 -346 -329 -53 -226 103 -463 338 -512 90 -18 554 -6 717 20 483 76 894 250 1295 549 154 115 420 381 536 537 300 401 473 826 551 1350 27 182 24 571 -5 763 -27 174 -87 412 -136 547 -88 238 -265 557 -422 759 -396 510 -953 876 -1564 1026 -244 60 -432 80 -745 80 -182 -1 -229 -4 -270 -18z"/>
                                            <path d="M6825 6261 c-78 -28 -110 -47 -162 -98 -61 -60 -97 -121 -117 -198 -24 -89 -24 -1771 0 -1860 30 -118 117 -221 233 -278 l66 -32 199 -3 c148 -3 222 0 292 12 420 72 781 360 943 754 98 236 119 539 56 787 -30 121 -130 329 -207 430 -193 256 -473 430 -787 489 -124 24 -448 22 -516 -3z"/>
                                        </g>
                                    </svg>
                                </button>
                                <input type="range" min="0" max="100" value="100" id="xo-sound">
                            </div>
                        </div>
                        <div>
                            <button id="xo-btn">
                                <svg version="1.0" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 1000.000000 1000.000000" preserveAspectRatio="xMidYMid meet">
                                    <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
                                        <path d="M380 9984 c-185 -49 -331 -201 -369 -382 -8 -37 -11 -511 -11 -1610 0 -1714 -3 -1622 62 -1744 38 -72 138 -168 216 -207 138 -69 310 -68 452 4 71 36 171 134 208 203 64 119 62 82 62 1238 0 710 4 1070 11 1110 25 137 139 289 259 347 123 59 79 57 1233 57 1176 0 1140 -2 1254 66 237 143 320 422 197 666 -35 69 -134 170 -202 206 -122 65 -29 62 -1752 61 -1339 0 -1573 -2
                                        -1620 -15z"/>
                                        <path d="M6368 9984 c-85 -20 -155 -59 -224 -126 -101 -97 -154 -220 -154 -358 0 -173 84 -324 234 -422 120 -78 30 -72 1271 -78 l1110 -5 59 -23 c165 -62 291 -206 325 -370 8 -37 11 -380 11 -1110 0 -1163 -2 -1125 62 -1244 38 -72 138 -168 216 -207 138 -69 310 -68 452 4 71 36 171 134 208 203 65 122 62 30 62 1744 0 1096 -3 1573 -11 1610 -28 133 -143 286 -259 341 -125 60 -30 57 -1740 56 -1299 -1 -1575 -3 -1622 -15z"/>
                                        <path d="M371 3994 c-124 -33 -234 -119 -305 -237 -69 -117 -66 -24 -66 -1754 0 -1699 -3 -1609 56 -1730 35 -73 114 -156 193 -203 125 -74 17 -70 1754 -70 1730 0 1637 -3 1754 66 237 143 320 422 197 666 -35 69 -134 170 -202 206 -119 64 -82 62 -1232 62 -657 0 -1069 4 -1110 10 -36 6 -94 25 -130 43 -82 40 -187 142 -223 217 -59 123 -57 79 -57 1233 0 1176 2 1140 -66 1254 -98 162 -257 254 -439 252 -38 0 -94 -7 -124 -15z"/>
                                        <path d="M9373 3995 c-121 -33 -223 -109 -295 -219 -78 -120 -72 -30 -78 -1271 l-5 -1110 -23 -59 c-45 -119 -123 -211 -233 -274 -112 -63 -76 -62 -1244 -62 -1165 0 -1128 2 -1246 -61 -32 -17 -85 -59 -117 -93 -96 -100 -142 -212 -142 -346 0 -180 92 -337 253 -434 117 -69 24 -66 1754 -66 1737 0 1629 -4 1754 70 79 47 158 130 193 203 59 121 56 31 56 1730 0 1730 3 1637 -66 1754 -98 162 -257 254 -439 252 -38 0 -94 -7 -122 -14z"/>
                                    </g>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        `;
    }

    play() {
        this.ended = false;
        this.paused = false
        this.$.video.play();
        this.$.btn[0].innerHTML = `
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 1000.000000 1000.000000" preserveAspectRatio="xMidYMid meet">
                <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
                    <path d="M920 9993 c-195 -33 -356 -180 -405 -370 -13 -50 -15 -605 -15 -4603 0 -4997 -5 -4615 61 -4748 40 -82 127 -171 207 -211 127 -64 33 -61 1743 -61 1061 0 1574 3 1615 11 188 34 355 196 393 381 8 38 10 1366 9 4628 l-3 4575 -21 56 c-64 166 -158 263 -306 317 l-73 27 -1590 1 c-875 1 -1601 0 -1615 -3z"/>
                    <path d="M5850 9984 c-181 -48 -319 -182 -365 -355 -22 -83 -22 -9143 0 -9237 41 -172 156 -300 330 -368 49 -18 97 -19 1630 -22 1123 -2 1599 0 1645 8 99 17 185 63 261 139 36 36 78 90 93 118 61 121 56 -247 54 4750 l-3 4568 -22 65 c-54 157 -160 266 -314 322 l-64 23 -1595 2 c-1372 2 -1603 0 -1650 -13z"/>
                </g>
            </svg>
        `;
        var event = new CustomEvent("play", {
            bubbles: true,
            cancelable: true,
        })
        this.dispatchEvent(event);
    }

    pause() {
        this.paused = true;
        this.$.video.pause();
        this.$.btn[0].innerHTML = `
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 1000.000000 1000.000000" preserveAspectRatio="xMidYMid meet">
                <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
                    <path d="M1285 9969 c-38 -5 -91 -16 -116 -24 -155 -52 -458 -313 -528 -456 -59 -122 -88 -298 -113 -694 -16 -261 -23 -5245 -9 -6530 14 -1229 20 -1396 56 -1520 92 -319 344 -611 599 -696 122 -40 447 -58 556 -30 125 31 356 150 795 406 150 87 231 134 590 342 105 60 325 188 490 283 471 272 530 306 875 505 179 103 388 223 465 268 77 44 327 188 555 320 228 132 530 306 670 387 560 322 677 390 975 563 171 99 411 239 535 312 124 73 374 219 555 325 433 254 766 453 838 502 104 71 225 240 288 402 51 133 72 244 72 391 0 259 -63 420 -233 598 -141 149 -406 333 -785 547 -167 94 -1242 711 -1625 933 -162 94 -468 270 -680 392 -212 122 -488 282 -615 355 -126 73 -313 181 -415 240 -102 59 -338 196 -525 305 -350 204 -893 519 -1375 798 -1225 710 -1362 774 -1685 782 -77 2 -171 0 -210 -6z"/>
                </g>
            </svg>
        `;
        var event = new CustomEvent("pause", {
            bubbles: true,
            cancelable: true,
        })
        this.dispatchEvent(event);
    }

    mute() {
        this.muted = true;
        this.$.video.setAttribute("muted", "");
        this.$.btn[3].innerHTML = `
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 1000.000000 1000.000000" preserveAspectRatio="xMidYMid meet">
                <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
                    <path d="M7935 9985 c-123 -27 -220 -75 -620 -306 -785 -452 -2931 -1691 -3045 -1757 l-115 -67 -1285 -5 -1285 -5 -66 -22 c-130 -45 -250 -146 -301 -255 -55 -117 -52 26 -52 -2573 l0 -2410 22 -71 c51 -167 185 -294 359 -339 49 -13 234 -15 1332 -15 l1274 0 151 -87 c83 -47 666 -384 1296 -748 2187 -1264 2146 -1241 2250 -1276 257 -86 538 -28 734 152 124 115 197 243 230 401 14 70 16 487 16 4405 0 3683 -2 4338 -14 4394 -75 355 -376 601 -731 598 -49 0 -117 -7 -150 -14z"/>
                </g>
            </svg>
        `;
        var event = new CustomEvent("mute", {
            bubbles: true,
            cancelable: true,
        })
        this.dispatchEvent(event);
    }

    unmute() {
        this.muted = false;
        this.$.video.removeAttribute("muted");
        this.$.btn[3].innerHTML = `
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 1000.000000 1000.000000" preserveAspectRatio="xMidYMid meet">
                <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
                    <path d="M5404 8985 c-34 -7 -75 -20 -92 -29 -17 -9 -36 -16 -42 -16 -6 0 -161 -86 -343 -192 -590 -341 -2130 -1230 -2373 -1370 l-171 -98 -995 0 c-677 0 -1013 -3 -1054 -11 -166 -31 -289 -148 -323 -309 -9 -41 -11 -536 -9 -1990 l3 -1935 23 -58 c51 -125 185 -227 327 -247 42 -6 463 -10 1059 -10 l989 0 206 -118 c113 -65 411 -237 661 -382 250 -144 687 -397 970 -560 283 -163 628 -362 765 -441 260 -151 323 -181 415 -200 83 -18 241 -6 320 23 180 66 326 228 374 415 14 55 16 412 16 3545 0 3862 6 3528 -67 3678 -44 92 -148 199 -240 248 -124 66 -281 87 -419 57z"/>
                    <path d="M6835 7802 c-205 -71 -319 -244 -302 -456 15 -176 157 -334 338 -375 24 -6 121 -11 216 -11 341 0 610 -63 891 -207 544 -279 923 -772 1047 -1363 36 -168 45 -467 21 -640 -30 -216 -101 -450 -188 -624 -197 -392 -520 -710 -911 -896 -277 -132 -531 -189 -842 -190 -88 0 -187 -4 -219 -10 -165 -27 -307 -162 -346 -329 -53 -226 103 -463 338 -512 90 -18 554 -6 717 20 483 76 894 250 1295 549 154 115 420 381 536 537 300 401 473 826 551 1350 27 182 24 571 -5 763 -27 174 -87 412 -136 547 -88 238 -265 557 -422 759 -396 510 -953 876 -1564 1026 -244 60 -432 80 -745 80 -182 -1 -229 -4 -270 -18z"/>
                    <path d="M6825 6261 c-78 -28 -110 -47 -162 -98 -61 -60 -97 -121 -117 -198 -24 -89 -24 -1771 0 -1860 30 -118 117 -221 233 -278 l66 -32 199 -3 c148 -3 222 0 292 12 420 72 781 360 943 754 98 236 119 539 56 787 -30 121 -130 329 -207 430 -193 256 -473 430 -787 489 -124 24 -448 22 -516 -3z"/>
                </g>
            </svg>
        `;
        var event = new CustomEvent("unmute", {
            bubbles: true,
            cancelable: true,
        })
        this.dispatchEvent(event);
    }

    maximize() {
        this.full = true;
        if (this.$.container.requestFullscreen) {
            this.$.container.requestFullscreen();
        } else if (this.$.container.webkitRequestFullscreen) {
            this.$.container.webkitRequestFullscreen();
        } else if (this.$.container.msRequestFullscreen) {
            this.$.container.msRequestFullscreen();
        }
        this.$.btn[4].innerHTML = `
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 1000.000000 1000.000000" preserveAspectRatio="xMidYMid meet">
                <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
                    <path d="M3397 9984 c-186 -45 -333 -196 -372 -381 -12 -57 -15 -245 -15 -1123 0 -1153 2 -1109 -58 -1230 -34 -68 -125 -158 -201 -198 -120 -64 -70 -62 -1231 -62 -867 0 -1067 -3 -1121 -14 -188 -40 -334 -182 -384 -373 -29 -112 -12 -245 47 -355 37 -70 137 -167 211 -205 119 -60 23 -57 1672 -61 1119 -2 1536 0 1609 9 80 9 113 19 176 50 93 47 184 132 223 211 60 119 57 22 57 1744 0 1727 4 1618 -56 1736 -35 69 -134 170 -202 206 -109 58 -237 75 -355 46z"/>
                    <path d="M6368 9984 c-170 -41 -311 -178 -362 -354 -15 -50 -16 -208 -16 -1635 0 -1339 2 -1588 14 -1634 39 -144 130 -252 274 -323 l85 -43 1596 -3 c1087 -2 1612 1 1647 8 127 27 271 134 332 248 151 283 10 619 -303 723 -32 11 -266 14 -1156 19 l-1116 5 -85 43 c-103 50 -190 131 -230 212 -60 121 -58 77 -58 1230 0 878 -3 1066 -15 1123 -58 273 -336 447 -607 381z"/>
                    <path d="M6435 4009 c-176 -26 -307 -115 -384 -259 -64 -120 -61 -15 -61 -1746 0 -1744 -4 -1620 63 -1747 39 -73 137 -166 219 -206 287 -140 637 32 704 348 11 54 14 255 14 1126 0 864 3 1070 14 1111 34 127 140 262 247 316 119 60 76 58 1229 58 1162 0 1134 -1 1253 62 34 18 87 58 117 88 274 274 152 724 -226 837 -55 17 -158 18 -1594 19 -844 1 -1562 -2 -1595 -7z"/>
                    <path d="M371 3994 c-258 -69 -422 -345 -356 -599 49 -185 200 -332 382 -370 57 -12 245 -15 1123 -15 1153 0 1110 2 1229 -58 107 -54 213 -189 247 -316 11 -41 14 -247 14 -1111 0 -871 3 -1072 14 -1126 55 -259 310 -434 568 -391 189 32 347 174 402 362 15 50 16 209 16 1635 0 1731 4 1624 -61 1745 -64 121 -178 210 -314 245 -87 22 -3180 22 -3264 -1z"/>
                </g>
            </svg>
        `;
        var event = new CustomEvent("maximize", {
            bubbles: true,
            cancelable: true,
        })
        this.dispatchEvent(event);
    }

    minimize() {
        this.full = false;
        if (document.fullscreenElement) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
        this.$.btn[4].innerHTML = `
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 1000.000000 1000.000000" preserveAspectRatio="xMidYMid meet">
                <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
                    <path d="M380 9984 c-185 -49 -331 -201 -369 -382 -8 -37 -11 -511 -11 -1610 0 -1714 -3 -1622 62 -1744 38 -72 138 -168 216 -207 138 -69 310 -68 452 4 71 36 171 134 208 203 64 119 62 82 62 1238 0 710 4 1070 11 1110 25 137 139 289 259 347 123 59 79 57 1233 57 1176 0 1140 -2 1254 66 237 143 320 422 197 666 -35 69 -134 170 -202 206 -122 65 -29 62 -1752 61 -1339 0 -1573 -2
                    -1620 -15z"/>
                    <path d="M6368 9984 c-85 -20 -155 -59 -224 -126 -101 -97 -154 -220 -154 -358 0 -173 84 -324 234 -422 120 -78 30 -72 1271 -78 l1110 -5 59 -23 c165 -62 291 -206 325 -370 8 -37 11 -380 11 -1110 0 -1163 -2 -1125 62 -1244 38 -72 138 -168 216 -207 138 -69 310 -68 452 4 71 36 171 134 208 203 65 122 62 30 62 1744 0 1096 -3 1573 -11 1610 -28 133 -143 286 -259 341 -125 60 -30 57 -1740 56 -1299 -1 -1575 -3 -1622 -15z"/>
                    <path d="M371 3994 c-124 -33 -234 -119 -305 -237 -69 -117 -66 -24 -66 -1754 0 -1699 -3 -1609 56 -1730 35 -73 114 -156 193 -203 125 -74 17 -70 1754 -70 1730 0 1637 -3 1754 66 237 143 320 422 197 666 -35 69 -134 170 -202 206 -119 64 -82 62 -1232 62 -657 0 -1069 4 -1110 10 -36 6 -94 25 -130 43 -82 40 -187 142 -223 217 -59 123 -57 79 -57 1233 0 1176 2 1140 -66 1254 -98 162 -257 254 -439 252 -38 0 -94 -7 -124 -15z"/>
                    <path d="M9373 3995 c-121 -33 -223 -109 -295 -219 -78 -120 -72 -30 -78 -1271 l-5 -1110 -23 -59 c-45 -119 -123 -211 -233 -274 -112 -63 -76 -62 -1244 -62 -1165 0 -1128 2 -1246 -61 -32 -17 -85 -59 -117 -93 -96 -100 -142 -212 -142 -346 0 -180 92 -337 253 -434 117 -69 24 -66 1754 -66 1737 0 1629 -4 1754 70 79 47 158 130 193 203 59 121 56 31 56 1730 0 1730 3 1637 -66 1754 -98 162 -257 254 -439 252 -38 0 -94 -7 -122 -14z"/>
                </g>
            </svg>
        `;
        var event = new CustomEvent("minimize", {
            bubbles: true,
            cancelable: true,
        })
        this.dispatchEvent(event);
    }
}

function __format__(s) {
    var m = Math.floor(s / 60);
    m = (m >= 10) ? m : "0" + (m ? m : "0");
    s = Math.floor(s % 60);
    s = (s >= 10) ? s : "0" + (s ? s : "0");
    return m + ":" + s;
}