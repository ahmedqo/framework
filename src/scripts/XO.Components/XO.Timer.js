import XOElement from "./XO.Element.js"

var TIMER = null;

export default class extends XOElement {
    static attributes = {
        date: String,
        change(n, v) {
            switch (n) {
                case "date":
                    __launch__(this, v);
                    break;
            }
        }
    }

    static properties = {
        days: { default: null, type: Number },
        hours: { default: null, type: Number },
        minutes: { default: null, type: Number },
        seconds: { default: null, type: Number },
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
            display: inline-block;
        }
        /* Container */
        #xo-container {
            display: flex;
            gap: 10px;
        }
        /* item */
        :host([theme="water"]) #xo-item {
            background: var(--water);
        }
        :host([theme="fire"]) #xo-item {
            background: var(--fire);
        }
        :host([theme="earth"]) #xo-item {
            background: var(--earth);
        }
        :host([theme="forest"]) #xo-item {
            background: var(--forest);
        }
        :host([theme="night"]) #xo-item {
            background: var(--night);
        }
        :host([theme="water"]) #xo-item,
        :host([theme="fire"]) #xo-item,
        :host([theme="forest"]) #xo-item,
        :host([theme="night"]) #xo-item {
            color: #fff;
        }
        #xo-item {
            display: flex;
            height: 42px;
            align-items: center;
            justify-content: center;
            font-size: 26px;
            background: var(--default);
            color: #1d1d1d;
            border-radius: 5px;
            padding: 0 .41rem;
        }
        /* Variables */
            /* Container */
            #xo-container { {{--xo-container}} }
            #xo-container:hover { {{--xo-container-hover}} }
            /* item */
            #xo-item { {{--xo-item}} }
            #xo-item:hover { {{--xo-item-hover}} }
    `

    render() {
        return /*html*/ `
            <main id="xo-container">
                <div id="xo-item">00</div>
                <div id="xo-item">00</div>
                <div id="xo-item">00</div>
                <div id="xo-item">00</div>
            </main>
        `;
    }
}

function __launch__(el, date) {
    var now = new Date().getTime(),
        des = new Date(date).getTime(),
        def = des - now;
    var days = Math.floor(def / (1000 * 60 * 60 * 24)),
        hours = Math.floor((def % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        mins = Math.floor((def % (1000 * 60 * 60)) / (1000 * 60)),
        secs = Math.floor((def % (1000 * 60)) / (1000));
    days = (days < 10) ? "0" + days : days;
    hours = (hours < 10) ? "0" + hours : hours;
    mins = (mins < 10) ? "0" + mins : mins;
    secs = (secs < 10) ? "0" + secs : secs;
    el.$.item[0].innerText = days;
    el.$.item[1].innerText = hours;
    el.$.item[2].innerText = mins;
    el.$.item[3].innerText = secs;
    el.days = days;
    el.hours = hours;
    el.mins = mins
    el.secs = secs;
    if (def <= 0) {
        var event = new CustomEvent("complete", {
            bubbles: true,
            cancelable: true,
        });
        el.dispatchEvent(event);
    } else {
        if (TIMER) clearTimeout(TIMER);
        TIMER = setTimeout(() => {
            __launch__(el, date);
        }, 1000);
    }
}