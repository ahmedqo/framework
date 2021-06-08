import XOElement from "./XO.Element.js"

var timer1, timer2;

export default class extends XOElement {
    static callbacks = {
        create() {
            timer1 = setInterval(() => {
                var off = parseInt(window.getComputedStyle(this.$.circle[0]).strokeDashoffset);
                if (off < 400) {
                    this.$.circle[0].style.strokeDashoffset = off + 1;
                } else {
                    this.$.circle[0].style.strokeDashoffset = 0;
                }
            }, 14);
            timer2 = setInterval(() => {
                var off = parseInt(window.getComputedStyle(this.$.circle[1]).strokeDashoffset);
                if (off < 100) {
                    this.$.circle[1].style.strokeDashoffset = off + 1;
                } else {
                    this.$.circle[1].style.strokeDashoffset = 0;
                }
            }, 10);
        },
        detach() {
            clearInterval(timer1);
            clearInterval(timer2);
        }
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
        :host {
            display: inline;
        }
        :host([global]) #xo-container {
            display: flex;
            align-items: center;
            justify-content: center;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #1d1d1d38;
        }
        #xo-svg {
            width: 60px;
            height: 60px;
            transform: scaleY(-1);
        }
        #xo-circle {
            r: 8;
            cx: 10;
            cy: 10;
            stroke-width: 2;
            fill: transparent;
            stroke-linecap: round;
            stroke-dasharray: calc(100 * 50.2 / 100) 50.2;
        }
        :host([theme="water"]) #xo-circle:first-child {
            stroke: var(--waterLight);
        }
        :host([theme="water"]) #xo-circle:last-child {
            stroke: var(--water);
        }
        :host([theme="fire"]) #xo-circle:first-child {
            stroke: var(--fireLight);
        }
        :host([theme="fire"]) #xo-circle:last-child {
            stroke: var(--fire);
        }
        :host([theme="earth"]) #xo-circle:first-child {
            stroke: var(--earthLight);
        }
        :host([theme="earth"]) #xo-circle:last-child {
            stroke: var(--earth);
        }
        :host([theme="forest"]) #xo-circle:first-child {
            stroke: var(--forestLight);
        }
        :host([theme="forest"]) #xo-circle:last-child {
            stroke: var(--forest);
        }
        :host([theme="night"]) #xo-circle:first-child {
            stroke: var(--nightLight);
        }
        :host([theme="night"]) #xo-circle:last-child {
            stroke: var(--night);
        }
        #xo-circle:first-child {
            stroke: var(--defaultLight);
        }
        #xo-circle:last-child {
            stroke: var(--default);
        }
    `

    render() {
        return /*html*/ `
            <main part="-xo-inner" id="xo-container">
                <svg id="xo-svg" viewBox="0 0 20 20">
                    <circle id="xo-circle"></circle>
                    <circle id="xo-circle"></circle>
                </svg>
            </main>
		`;
    }
}