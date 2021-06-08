import XOElement from "./XO.Element.js"

export default class extends XOElement {
    static attributes = {
        header: String,
        change(n, v) {
            switch (n) {
                case "header":
                    if (v) this.$.header.style.display = "block";
                    else this.$.header.style.display = "none";
                    this.$.header.innerHTML = v;
                    break;
            }
        }
    }

    static properties = {
        data: { default: null, type: Array },
        change(n, v) {
            switch (n) {
                case "data":
                    if (!v) {
                        this.$.container.innerHTML = "";
                        break;
                    }
                    this.$.container.append(__draw__(this));
                    __tooltip__(this);
                    break;
            }
        }
    }

    static styles = `
        /* Globals */
        * {
            font-family: Arial, sans-serif;
            box-sizing: border-box;
        }
        /* Element */
        :host {
            width: 300px;
            display: inline-block;
            box-sizing: content-box !important;
        }
        /* Header */
        #xo-header {
            margin-bottom: 10px;
            text-align: center;
            font-size: 24px;
            display: none;
            width: 100%;
        }
        /* Container */
        #xo-container {
            width: 300px;
            height: 300px;
            margin: 0 auto;
        }
        #xo-container svg {
            border-radius: 50%;
            transform: rotate(-90deg) scaleY(-1);
        }
        #xo-slices {
            fill: none;
            stroke-width: 200;
            cursor: pointer;
        }
        :host([donut]) #xo-slices {
            stroke-width: 60;
        }
        #xo-tooltip {
            padding: 3px 5px;
            border-radius: 5px;
            background: #444857;
            color: #ffffff;
            position: fixed;
            display: none;
            transform: translate(calc(-100% - 6px), -50%);
            width: max-content;
            font-size: 18px;
        }
        #xo-tooltip::before {
            content: "";
            position: absolute;
            top: 50%;
            right: -3px;
            width: 6px;
            height: 6px;
            transform: translateY(-50%) rotate(45deg);
            background: #444857;
        }
        #xo-tooltip.right {
            transform: translate(6px, -50%);
        }
        #xo-tooltip.right::before {
            left: -3px;
            right: unset
        }
        /* Variables */
            /* Container */
            #xo-container { {{--xo-container}} }
            #xo-container:hover { {{--xo-container-hover}} }
            /* Display */
    `

    render() {
        return /*html*/ `
            <div id="xo-header"></div>
            <main id="xo-container"></main>
            <div id="xo-tooltip"></div>
        `;
    }

    update() {
        var data = this.data;
        this.data = null;
        this.data = data;
    }
}

function __node__(n, v) {
    n = document.createElementNS("http://www.w3.org/2000/svg", n);
    for (var p in v)
        n.setAttributeNS(null, p.replace(/[A-Z]/g, function(m, p, o, s) {
            return "-" + m.toLowerCase();
        }), v[p]);
    return n
}

function __getColor__(colors) {
    var color = '#' + Math.random().toString(16).slice(-6);
    if (colors.includes(color)) __getColor__(colors);
    else return color;
}

function __draw__(el) {
    var size = 100,
        length = Math.PI * (size * 2),
        left = length,
        sum = el.data.reduce((a, b) => a + b.value, 0),
        grid = __node__("svg"),
        colors = [];
    grid.setAttribute("viewBox", `0 0 ${size * 2} ${size * 2}`);
    for (var i = 0; i < el.data.length; i++) {
        var color = el.data[i].color || __getColor__(colors),
            circle = __node__("circle", {
                cx: size,
                cy: size,
                r: size,
                stroke: color,
                id: "xo-slices",
                style: "stroke-dashArray: " + left + " " + length,
                "data-value": `${el.data[i].label} => ${((el.data[i].value / sum) * 100).toFixed(2)}%`
            });
        grid.append(circle);
        left -= (el.data[i].value / sum) * length;
    }
    return grid;
}

function __tooltip__(el) {
    el.queryAll("#xo-slices").forEach(e => {
        e.addEventListener("mousemove", _ => {
            el.$.tooltip.innerHTML = e.dataset.value;
            el.$.tooltip.style.left = _.x + "px";
            el.$.tooltip.style.top = _.y + "px";
            el.$.tooltip.style.display = "block";
            if (_.x < parseFloat(window.getComputedStyle(el.$.tooltip).width))
                el.$.tooltip.classList.add("right");
            else
                el.$.tooltip.classList.remove("right");
        });
        e.addEventListener("mouseout", () => {
            el.$.tooltip.style.display = "none";
        });
    });
}