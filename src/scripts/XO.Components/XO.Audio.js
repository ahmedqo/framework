import XOElement from "./XO.Element.js"

export default class extends XOElement {
    static attributes = {
        src: String,
        silent: Boolean,
        change(n, v) {
            switch (n) {
                case "src":
                    this.$.audio.src = v;
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
                    this.$.audio.volume = v / 100;
                    this.$.sound.style.background = `linear-gradient(90deg, var(--pros) ${val}%, var(--back) ${val}%)`;
                    break;
                case "muted":
                    this.$.audio.muted = v;
                    if (v) {
                        this.$.sound.value = 0;
                        this.$.audio.volume = 0;
                        this.$.sound.style.background = `linear-gradient(90deg, var(--pros) 0%, var(--back) 0%)`;
                    } else {
                        this.$.sound.value = this.volume;
                        this.$.audio.volume = this.volume / 100;
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
                this.$.audio.currentTime = this.$.input.value;
            });
            this.$.bridge.addEventListener('click', () => {
                if (this.$.audio.paused) this.play()
                else this.pause();
            });
            this.$.volume.addEventListener('click', () => {
                if (this.$.audio.muted) this.unmute()
                else this.mute();
            });
            this.$.audio.addEventListener("ended", () => {
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
            this.$.audio.addEventListener("loadstart", () => {
                this.duration = this.$.audio.duration;
                this.current = this.$.audio.currentTime;
                this.$.input.max = this.duration;
                var event = new CustomEvent("start", {
                    bubbles: true,
                    cancelable: true,
                })
                this.dispatchEvent(event);
            });
            this.$.audio.addEventListener("timeupdate", () => {
                this.current = this.$.audio.currentTime;
                this.duration = this.$.audio.duration;
                this.$.input.max = this.duration;
                var event = new CustomEvent("progress", {
                    bubbles: true,
                    cancelable: true,
                })
                this.dispatchEvent(event);
            });
            this.$.audio.addEventListener("click", () => {
                this.$.bridge.click();
            });
        },
        detach() {
            this.$.container.removeEventListener("fullscreenchange", () => {});
            this.$.audio.addEventListener("loadstart", () => {});
            this.$.bridge.removeEventListener("click", () => {});
            this.$.volume.removeEventListener("click", () => {});
            this.$.sound.removeEventListener("input", () => {});
            this.$.input.removeEventListener("input", () => {});
            this.$.audio.removeEventListener("timeupdate", () => {});
            this.$.audio.removeEventListener("click", () => {});
            this.$.audio.removeEventListener("ended", () => {});
        }
    }

    static styles = `
        /* Globals */
        #xo-input,
        #xo-sound,
        #xo-bridge,
        #xo-volume,
        #xo-screen {
            all: unset;
        }        
        #xo-input:focus,
        #xo-sound:focus,
        #xo-bridge:focus,
        #xo-volume:focus,
        #xo-screen:focus {
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
            background: #444857;
            width: 300px;
            overflow: hidden;
            border-radius: 5px;
        }
        /* Container */        
        #xo-container {
            color: var(--back);
            display: flex;
            padding: 10px;
            align-items: center;
            gap: 10px;
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
            width: 0;
        }        
        #xo-sound {
            width: 0;
            display: block;
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
        #xo-bridge,
        #xo-volume,
        #xo-screen {
            display: flex;
            cursor: pointer;
        }  
        #xo-bridge svg,
        #xo-volume svg,
        #xo-screen svg {
            display: flex;
            width: 20px;
            height: 20px;
            fill: var(--back);
        }
        #sdvl,#text {
            display: flex;
            align-items: center;;
        }
        #sdvl:hover {
            gap: 10px;
        }
        #text {
            gap: 2px;
        }
    `

    render() {
        return /*html*/ `
            <main id="xo-container">
                <audio id="xo-audio"></audio>
                <button id="xo-bridge">
                    <svg version="1.0" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 1000.000000 1000.000000" preserveAspectRatio="xMidYMid meet">
                        <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
                            <path d="M1285 9969 c-38 -5 -91 -16 -116 -24 -155 -52 -458 -313 -528 -456 -59 -122 -88 -298 -113 -694 -16 -261 -23 -5245 -9 -6530 14 -1229 20 -1396 56 -1520 92 -319 344 -611 599 -696 122 -40 447 -58 556 -30 125 31 356 150 795 406 150 87 231 134 590 342 105 60 325 188 490 283 471 272 530 306 875 505 179 103 388 223 465 268 77 44 327 188 555 320 228 132 530 306 670 387 560 322 677 390 975 563 171 99 411 239 535 312 124 73 374 219 555 325 433 254 766 453 838 502 104 71 225 240 288 402 51 133 72 244 72 391 0 259 -63 420 -233 598 -141 149 -406 333 -785 547 -167 94 -1242 711 -1625 933 -162 94 -468 270 -680 392 -212 122 -488 282 -615 355 -126 73 -313 181 -415 240 -102 59 -338 196 -525 305 -350 204 -893 519 -1375 798 -1225 710 -1362 774 -1685 782 -77 2 -171 0 -210 -6z"/>
                        </g>
                    </svg>
                </button>
                <div id="text">
                    <span id="xo-time">00:00</span>/<span id="xo-time">00:00</span>
                </div>
                <input type="range" id="xo-input" min="0" max="100" value="0">
                <div id="sdvl">
                    <input type="range" min="0" max="100" value="100" id="xo-sound">
                    <button id="xo-volume">
                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 1000.000000 1000.000000" preserveAspectRatio="xMidYMid meet">
                            <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
                                <path d="M5404 8985 c-34 -7 -75 -20 -92 -29 -17 -9 -36 -16 -42 -16 -6 0 -161 -86 -343 -192 -590 -341 -2130 -1230 -2373 -1370 l-171 -98 -995 0 c-677 0 -1013 -3 -1054 -11 -166 -31 -289 -148 -323 -309 -9 -41 -11 -536 -9 -1990 l3 -1935 23 -58 c51 -125 185 -227 327 -247 42 -6 463 -10 1059 -10 l989 0 206 -118 c113 -65 411 -237 661 -382 250 -144 687 -397 970 -560 283 -163 628 -362 765 -441 260 -151 323 -181 415 -200 83 -18 241 -6 320 23 180 66 326 228 374 415 14 55 16 412 16 3545 0 3862 6 3528 -67 3678 -44 92 -148 199 -240 248 -124 66 -281 87 -419 57z"/>
                                <path d="M6835 7802 c-205 -71 -319 -244 -302 -456 15 -176 157 -334 338 -375 24 -6 121 -11 216 -11 341 0 610 -63 891 -207 544 -279 923 -772 1047 -1363 36 -168 45 -467 21 -640 -30 -216 -101 -450 -188 -624 -197 -392 -520 -710 -911 -896 -277 -132 -531 -189 -842 -190 -88 0 -187 -4 -219 -10 -165 -27 -307 -162 -346 -329 -53 -226 103 -463 338 -512 90 -18 554 -6 717 20 483 76 894 250 1295 549 154 115 420 381 536 537 300 401 473 826 551 1350 27 182 24 571 -5 763 -27 174 -87 412 -136 547 -88 238 -265 557 -422 759 -396 510 -953 876 -1564 1026 -244 60 -432 80 -745 80 -182 -1 -229 -4 -270 -18z"/>
                                <path d="M6825 6261 c-78 -28 -110 -47 -162 -98 -61 -60 -97 -121 -117 -198 -24 -89 -24 -1771 0 -1860 30 -118 117 -221 233 -278 l66 -32 199 -3 c148 -3 222 0 292 12 420 72 781 360 943 754 98 236 119 539 56 787 -30 121 -130 329 -207 430 -193 256 -473 430 -787 489 -124 24 -448 22 -516 -3z"/>
                            </g>
                        </svg>
                    </button>
                </div>
            </main>
        `;
    }

    play() {
        this.ended = false;
        this.paused = false
        this.$.audio.play();
        this.$.bridge.innerHTML = `
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
        this.$.audio.pause();
        this.$.bridge.innerHTML = `
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
        this.$.audio.setAttribute("muted", "");
        this.$.volume.innerHTML = `
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
        this.$.audio.removeAttribute("muted");
        this.$.volume.innerHTML = `
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
}

function __format__(s) {
    var m = Math.floor(s / 60);
    m = (m >= 10) ? m : "0" + (m ? m : "0");
    s = Math.floor(s % 60);
    s = (s >= 10) ? s : "0" + (s ? s : "0");
    return m + ":" + s;
}