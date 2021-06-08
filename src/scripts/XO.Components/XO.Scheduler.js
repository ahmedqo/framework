import XOElement from "./XO.Element.js"

var DATE = new Date();

export default class extends XOElement {
    static properties = {
        data: { default: { length: 0 }, type: Object },
        change(n, v) {
            switch (n) {
                case "data":
                    __renderCalendar__(this);
                    __run__(this);
                    break;
            }
        }
    }

    static callbacks = {
        attach() {
            this.$.icon[0].addEventListener("click", () => {
                DATE.setMonth(DATE.getMonth() - 1);
                __renderCalendar__(this);
                __run__(this);
            });
            this.$.icon[1].addEventListener("click", () => {
                DATE.setMonth(DATE.getMonth() + 1);
                __renderCalendar__(this);
                __run__(this);
            });
            this.addEventListener("click", e => {
                if (e.path[0].id === "modal") {
                    e.path[0].remove();
                    return;
                }
                if (e.path[0].id === "xo-day") {
                    var data = "",
                        date = new Date(e.path[0].getAttribute("date"));
                    if (this.data[e.path[0].getAttribute("date")]) {
                        Object.keys(this.data[e.path[0].getAttribute("date")]).forEach(d => {
                            data += `<div id="row" idx="${d}">${this.data[e.path[0].getAttribute("date")][d]}<button>&times;</button></div>`;
                        });
                    }
                    this.$.container.insertAdjacentHTML("beforeend", `
                        <div id="modal">
                            <button id="close" onclick="this.parentElement.remove()">
                            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000.000000 1000.000000" preserveAspectRatio="xMidYMid meet">
                                <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
                                    <path d="M1790 8714 c-189 -41 -362 -179 -451 -359 -107 -217 -88 -464 52 -672 17 -27 624 -641 1348 -1366 l1316 -1317 -1316 -1318 c-724 -724 -1331 -1338 -1348 -1365 -266 -397 -66 -918 395 -1028 182 -44 367 -8 534 104 25 16 638 622 1363 1346 l1317 1316 1318 -1316 c724 -724 1337 -1330 1362 -1346 116 -77 216 -112 350 -120 265 -15 511 129 631 372 107 217 88 463 -52 672 -17 27 -624 641 -1348 1365 l-1316 1318 1316 1317 c724 725 1331 1339 1348 1366 140 208 159 455 52 672 -183 369 -633 486 -978 254 -27 -17 -641 -624 -1365 -1348 l-1318 -1316 -1317 1316 c-725 724 -1339 1331 -1366 1348 -159 107 -346 144 -527 105z"/>
                                </g>
                            </svg>
                            </button>
                            <main>
                                <h2>Event list of ${date.toLocaleDateString()}</h2>
                                <input type="text" placeholder="Event Title">
                                <section>
                                    ${data}
                                </section>
                            </main>
                        </div>
                    `);
                    __remove__(this, e.path[0].getAttribute("date"));
                    __create__(this, e.path[0].getAttribute("date"));
                }
            });
        },
        detach() {
            this.$.icon[0].removeEventListener("click", () => {});
            this.$.icon[1].removeEventListener("click", () => {});
            this.removeEventListener("click", () => {});
            this.queryAll("#xo-day").forEach(d => {
                d.removeEventListener("click", () => {});
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
            display: block;
            width: 360px;
            box-sizing: content-box !important;
        } 
        /* Container */
        #xo-container {
            width: 100%;
            border-radius: 5px;
            overflow: hidden;
        }
        /* Header */
        :host([theme="water"]) #xo-header {
            background: var(--water);
            color: #fff;
        }
        :host([theme="fire"]) #xo-header {
            background: var(--fire);
            color: #fff;
        }
        :host([theme="earth"]) #xo-header {
            background: var(--earth);
        }
        :host([theme="forest"]) #xo-header {
            background: var(--forest);
            color: #fff;
        }
        :host([theme="night"]) #xo-header {
            background: var(--night);
            color: #fff;
        }
        #xo-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 20px 10px;
            background: var(--default);
        }
        /* Date */
        #xo-date {
            font-weight: bolder;
            font-size: 20px;
        }
        /* Icon */
        #xo-icon {
            all: unset;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 20px;
            height: 20px;
        }
        #xo-icon:focus {
            outline: auto;
        }
        :host([theme="water"]) #xo-icon svg,
        :host([theme="fire"]) #xo-icon svg,
        :host([theme="forest"]) #xo-icon svg, 
        :host([theme="night"]) #xo-icon svg {
            fill: #fff;
        }
        #xo-icon svg {
            display: flex;
            fill: #1d1d1d;
        }
        #week {
            display: flex;
            justify-content: space-around;
            padding: 5px;
            flex-wrap: wrap;
        }
        #week div {
            width: calc(100% / 7);
            text-align: center;
            font-weight: bolder;
            font-size: 14px;
        }
        #days {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            padding: 5px;
            padding-top: 0;
            box-sizing: border-box;
        }
        /* Day */
        :host([theme="water"]) #xo-day {
            box-shadow: 0 0 1px var(--waterDark);
        }
        :host([theme="fire"]) #xo-day {
            box-shadow: 0 0 1px var(--fireDark);
        }
        :host([theme="earth"]) #xo-day {
            box-shadow: 0 0 1px var(--earthDark);
        }
        :host([theme="forest"]) #xo-day {
            box-shadow: 0 0 1px var(--forestDark);
        }
        :host([theme="night"]) #xo-day {
            box-shadow: 0 0 1px var(--nightDark);
        }
        #xo-day {
            font-size: 16px;
            width: calc((100% / 7) - 10px);
            display: flex;
            color: #1d1d1d;
            height: 40px;
            padding: 5px;
            box-sizing: border-box;
            box-shadow: 0 0 1px var(--defaultDark);
            border-radius: 5px;
            margin: 5px;
            position: relative;
        }
        #xo-day[on] {
            color: blue;
        }
        #xo-day[off] {
            opacity: 0;
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
        #xo-day[active] {
            background: var(--default);
        }
        :host([theme="water"]) #xo-day:not([off]):hover {
            box-shadow: 0 0 10px var(--water);
        }
        :host([theme="fire"]) #xo-day:not([off]):hover {
            box-shadow: 0 0 10px var(--fire);
        }
        :host([theme="earth"]) #xo-day:not([off]):hover {
            box-shadow: 0 0 10px var(--earth);
        }
        :host([theme="forest"]) #xo-day:not([off]):hover {
            box-shadow: 0 0 10px var(--forest);
        }
        :host([theme="night"]) #xo-day:not([off]):hover {
            box-shadow: 0 0 10px var(--night);
        }
        #xo-day:not([off]):hover {
            cursor: pointer;
            box-shadow: 0 0 10px var(--default);
        }
        #xo-icon:hover {
            cursor: pointer;
        }
        #modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #1d1d1d85;
            z-index: 1000;
        }
        #modal main {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            background: #fff;
            border-radius: 5px;
            padding: 20px;
            width: 50%;
            min-width: 300px;
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }
        #modal main h2 {
            margin: 0;
        }
        #modal main section {
            width: 100%;
            max-height: 400px;
            overflow: auto;
            display: flex;
            gap: 5px;
            flex-wrap: wrap;
        }
        #modal main section::-webkit-scrollbar-track {
           display: none;
        }
        #modal main section::-webkit-scrollbar {
            display: none;
        }
        #modal main section::-webkit-scrollbar-thumb {
            display: none;
        }
        #modal input {
            border-radius: 5px;
            box-sizing: border-box;
            width: 100%;
            font-size: 20px;
            padding: 5px 10px;
            background: transparent;
            border: 1px solid #1d1d1d;
        }
        #row {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 20px;
        }
        #row button {
            border: unset;
            background: tomato;
            color: #fff;
            cursor: pointer;
            border-radius: 9999px;
        }
        #modal button#close {
            position: fixed;
            top: 10px;
            right: 10px;
            border: unset;
            color: #fff;
            cursor: pointer;
            background: unset;
            display: flex;
            padding: 0;
        }
        #modal button#close svg {
            fill: #fff;
            width: 30px;
            height: 30px;
        }
        /* Variables */
            /* container */
            #xo-container { {{--xo-container}} }
            #xo-container:hover { {{--xo-container-hover}} }
            /* header */
            #xo-header { {{--xo-header}} }
            #xo-header:hover { {{--xo-header-hover}} }
            /* icon */
            #xo-icon { {{--xo-icon}} }
            #xo-icon:hover { {{--xo-icon-hover}} }
            #xo-icon svg { {{--xo-icon-svg}} }
            #xo-icon:hover svg { {{--xo-icon-svg-hover}} }
            /* day */
            #xo-day { {{--xo-day}} }
            #xo-day:hover { {{--xo-day-hover}} }
            #xo-day[on] { {{--xo-day-on}} }
            #xo-day[on]:hover { {{--xo-day-on-hover}} }
            #xo-day[active] { {{--xo-day-active}} }
            #xo-day[active]:hover { {{--xo-day-active-hover}} }
    `

    render() {
        return /*html*/ `
            <div id="xo-container">
                <div id="xo-header">
                    <div id="xo-date"></div>
                    <div style="display: flex; gap: 10px;">
                        <button id="xo-icon">
                            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000.000000 1000.000000" preserveAspectRatio="xMidYMid meet">
                                <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
                                    <path d="M6927 9980 c-141 -25 -265 -80 -381 -167 -80 -60 -4242 -4222 -4293 -4293 -64 -88 -100 -158 -133 -260 -27 -81 -33 -114 -37 -225 -7 -190 33 -346 128 -495 31 -49 578 -602 2168 -2193 1169 -1171 2153 -2148 2187 -2172 77 -56 157 -96 264 -131 76 -25 100 -27 230 -28 123 -1 157 3 225 22 105 30 245 100 321 161 125 100 246 288 291 451 25 92 25 339 -1 430 -22 81 -73 191 -122 267 -25 38 -562 583 -1574 1598 -1650 1653 -1580 1578 -1645 1745 -67 171 -74 395 -17 570 68 208 -45 85 1661 1795 970 972 1551 1560 1573 1595 113 176 155 328 145 529 -7 139 -24 206 -82 328 -108 222 -309 390 -545 454 -85 23 -284 33 -363 19z"></path>
                                </g>
                            </svg>
                        </button>
                        <button id="xo-icon">
                            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000.000000 1000.000000" preserveAspectRatio="xMidYMid meet">
                                <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
                                    <path d="M2747 9971 c-247 -54 -469 -232 -582 -464 -58 -122 -75 -189 -82 -328 -10 -201 32 -353 145 -529 22 -35 603 -624 1573 -1595 1706 -1710 1593 -1587 1661 -1795 57 -175 50 -399 -17 -570 -65 -167 5 -92 -1645 -1745 -1012 -1015 -1549 -1560 -1574 -1598 -49 -76 -100 -186 -122 -267 -14 -50 -19 -101 -19 -215 0 -175 12 -231 80 -372 106 -218 292 -377 530 -449 81 -25 105 -28 240 -28 137 0 157 3 235 28 107 35 185 74 269 133 78 54 4233 4205 4303 4298 66 88 103 158 139 265 77 230 38 521 -97 726 -34 52 -579 603 -2167 2192 -1167 1168 -2149 2143 -2182 2167 -80 57 -188 110 -277 135 -108 31 -295 36 -411 11z"></path>
                                </g>
                            </svg>
                        </button>
                    </div>
                </div>
                <div id="week">
                    <div>Sun</div>
                    <div>Mon</div>
                    <div>Tue</div>
                    <div>Wed</div>
                    <div>Thu</div>
                    <div>Fri</div>
                    <div>Sat</div>
                </div>
                <div id="days"></div>
            </div>
        `
    }
}

function __renderCalendar__(el) {
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
            i === new Date().getDate() && DATE.getMonth() === new Date().getMonth() && DATE.getFullYear() === new Date().getFullYear()
        ) {
            days += `<div id="xo-day" date="${DATE.getFullYear()}-${mon}-${day}" on>${day}</div>`;
        } else {
            days += `<div id="xo-day" date="${DATE.getFullYear()}-${mon}-${day}">${day}</div>`;
        }
    }

    for (let j = 1; j <= nextDays; j++) {
        days += `<div id="xo-day" off></div>`;
    }

    monthDays.innerHTML = days;
}

function __run__(el) {
    el.queryAll("#xo-day").forEach(d => {
        if (el.data[d.getAttribute("date")]) {
            d.setAttribute("active", "");
        } else {
            d.removeAttribute("active");
        }
    });
}

function __create__(el, date) {
    el.query("#modal input").addEventListener("keydown", e => {
        if (e.keyCode === 13 && e.target.value.trim()) {
            el.queryAll("#row button").forEach(b => {
                b.removeEventListener("click", () => {});
            });
            var idx = (el.data[date]) ? Object.keys(el.data[date]).length : 0;
            el.query("#modal main section").insertAdjacentHTML("afterbegin", `
                <div id="row" idx="${idx}">${e.target.value.trim()}<button>&times;</button></div>
            `);
            if (!el.data[date]) el.data[date] = {}
            el.data[date][idx] = e.target.value.trim();
            el.data.length = Object.keys(el.data).length - 1;
            e.target.value = "";
            var event = new CustomEvent("create", {
                bubbles: true,
                cancelable: true,
            });
            el.dispatchEvent(event);
            __run__(el);
            __delete__(el, date);
        }
    });
}

function __remove__(el, date) {
    el.queryAll("#row button").forEach(b => {
        b.addEventListener("click", () => {
            var idx = b.parentElement.getAttribute("idx");
            delete el.data[date][idx];
            b.parentElement.remove();
            if (Object.keys(el.data[date]).length === 0) {
                delete el.data[date];
                el.data.length = Object.keys(el.data).length - 1;
            }
            var event = new CustomEvent("delete", {
                bubbles: true,
                cancelable: true,
            });
            el.dispatchEvent(event);
            __run__(el);
        });
    })
}

function __delete__(el, date) {
    el.query("#row button").addEventListener("click", e => {
        var idx = e.target.parentElement.getAttribute("idx");
        delete el.data[date][idx];
        e.target.parentElement.remove();
        if (Object.keys(el.data[date]).length === 0) {
            delete el.data[date];
            el.data.length = Object.keys(el.data).length - 1;
        }
        var event = new CustomEvent("delete", {
            bubbles: true,
            cancelable: true,
        });
        el.dispatchEvent(event);
        __run__(el);
    });
}