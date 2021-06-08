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
        offset: { default: [2, 2], type: Array },
        data: { default: null, type: Array },
        size: { default: [2000, 800], type: Array },
        change(n, v) {
            switch (n) {
                case "data":
                    this.$.container.innerHTML = "";
                    if (v) {
                        var data = {
                                data: this.data,
                                size: this.size,
                                offset: this.offset
                            },
                            grid = __grid__(data);
                        if (this.matches("[legend]")) __legend__(grid, data);
                        __bars__(grid, data);
                        __line__(grid, data);
                        __area__(grid, data);
                        __dots__(grid, data);
                        this.$.container.appendChild(grid);
                        __tooltip__(this);
                        __init__(this);
                    }
                    break;
            }
        }
    }

    static callbacks = {
        create() {
            var observer = new MutationObserver(() => {
                __init__(this);
            });
            observer.observe(this, {
                attributes: true,
                attributeFilter: ["style", "class"]
            });
        }
    }

    static styles = `
        /* Globals */
        * {
            font-family: Arial, sans-serif;
            box-sizing: border-box;
        }
        :host {
            width: 500px;
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
        /* Conatiner */
        #xo-container svg {
            display: block;
        }
        #xo-axis {
            stroke: #1d1d1d;
            stroke-width: 2px;
            stroke-linecap: round;
        }
        #xo-grid {
            stroke: #1d1d1d;
            stroke-width: .5;
            stroke-linecap: round;
            z-index: -2;
        }
        #xo-legendVert {
            stroke: #1d1d1d;
            font-size: 16px;
        }
        #xo-legendHors {
            stroke: #1d1d1d;
            font-size: 16px;
            writing-mode: vertical-lr;
        }
        #xo-tooltip {
            position: absolute;
            display: none;
            font-size: 12px;
            background: #131417;
            padding: 0 5px;
            color: #fff;
        }
        :host([dots]) #xo-dots {
            display: initial;
        }
        :host([bars]) #xo-bars {
            display: initial;
        }
        :host([line]) #xo-line {
            display: initial;
        }
        :host([area]) #xo-area {
            display: initial;
        }
        #xo-dots,
        #xo-bars,
        #xo-line,
        #xo-area {
            display: none;
        }
        #xo-dots {
            cursor: pointer;
            r: 8;
        }
        #xo-bars {
            stroke-width: 100;
            cursor: pointer;
            stroke: #0f70f1;
        }
        #xo-line {
            stroke: #0f70f1;
            fill: transparent;
            stroke-width: 10;
            stroke-linecap: round;
        }
        #xo-area {
            fill: #0f70f1;
            stroke-linecap: round;
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
            /* Header */
            #xo-header { {{--xo-header}} }
            #xo-header:hover { {{--xo-header-hover}} }
            /* Container */
            #xo-container { {{--xo-container}} }
            #xo-container:hover { {{--xo-container-hover}} }
            /* Axis */
            #xo-axis { {{--xo-axis}} }
            #xo-axis:hover { {{--xo-axis-hover}} }
            /* Grid */
            #xo-grid { {{--xo-grid}} }
            #xo-grid:hover { {{--xo-grid-hover}} }
            /* Dots */
            #xo-dots { {{--xo-dots}} }
            #xo-dots:hover { {{--xo-dots-hover}} }
            /* Bars */
            #xo-bars { {{--xo-bars}} }
            #xo-bars:hover { {{--xo-bars-hover}} }
            /* Line */
            #xo-line { {{--xo-line}} }
            #xo-line:hover { {{--xo-line-hover}} }
            /* Area */
            #xo-area { {{--xo-area}} }
            #xo-area:hover { {{--xo-area-hover}} }
            /* LegendVert */
            #xo-legendVert { {{--xo-legendVert}} }
            #xo-legendVert:hover { {{--xo-legendVert-hover}} }
            /* LegendHors */
            #xo-legendHors { {{--xo-legendHors}} }
            #xo-legendHors:hover { {{--xo-legendHors-hover}} }
    `

    render() {
        return /*html*/ `
            <div id="xo-header"></div>
            <main id="xo-container"></main>
            <div id="xo-tooltip"></div>
        `;
    }

    update() {
        var offset = this.offset,
            data = this.data,
            size = this.size;
        this.offset = null;
        this.size = null;
        this.data = null;
        this.offset = offset;
        this.size = size;
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

function __init__(el) {
    var bar = el.query("#xo-bars"),
        b = el.queryAll("#xo-bars")[1],
        op = parseFloat(window.getComputedStyle(b).strokeWidth) / 2;
    bar.style.strokeWidth = op;
    bar.setAttribute("transform", `translate(-${(el.size[0] / (el.data.length)) - (op / 2)},0)`);
}

function __vars__({ data, size, offset }) {
    var max = Math.max(...data.map(e => e.value));
    return {
        data: data,
        move: size[1] / max,
        unit: max / data.length,
        offset: {
            x: offset[0],
            y: offset[1]
        },
        size: {
            w: size[0],
            h: size[1]
        },
        gap: {
            x: size[0] / (data.length),
            y: size[1] / data.length
        }
    }
}

function __grid__(opt) {
    opt = __vars__(opt);
    var LINES = [],
        grid = __node__("svg"),
        x = {
            p1: [opt.offset.x, opt.offset.x],
            p2: [opt.offset.x, opt.size.w + opt.offset.x]
        },
        y = {
            p1: [-20, opt.size.h],
            p2: [opt.gap.y + opt.gap.y * (opt.data.length - 1), opt.gap.y + opt.gap.y * (opt.data.length - 1)]
        },
        xAxis = __node__("polyline", {
            points: `${x.p1[0]},${y.p1[0]} ${x.p1[1]},${y.p1[1]}`,
            transform: `translate(0,20)`,
            id: "xo-axis"
        }),
        yAxis = __node__("polyline", {
            points: `${x.p2[0]},${y.p2[0]} ${x.p2[1]},${y.p2[1]}`,
            transform: `translate(0,20)`,
            id: "xo-axis"
        }),
        line = __node__("polyline", {
            points: `${opt.offset.x},${0} ${opt.size.w + opt.offset.x},${0}`,
            transform: `translate(0,20)`,
            id: "xo-grid"
        });
    LINES.push(xAxis, yAxis, line);
    opt.data.forEach((e, i) => {
        var x = [opt.offset.x, opt.size.w + opt.offset.x],
            y = [(opt.gap.y + (opt.gap.y * i)), (opt.gap.y + (opt.gap.y * i))];
        line = __node__("polyline", {
            points: `${x[0]},${y[0]} ${x[1]},${y[1]}`,
            transform: `translate(0,20)`,
            id: "xo-grid"
        });
        LINES.push(line)
    });
    opt.data.forEach((e, i) => {
        var x = [(opt.gap.x + (opt.gap.x * i)) + opt.offset.x, (opt.gap.x + (opt.gap.x * i)) + opt.offset.x],
            y = [-20, opt.size.h];
        line = __node__("polyline", {
            points: `${x[0]},${y[0]} ${x[1]},${y[1]}`,
            transform: `translate(0,20)`,
            id: "xo-grid"
        });
        LINES.push(line)
    });
    grid.setAttribute("viewBox", `0 0 ${(opt.size.w + opt.offset.x) - opt.gap.x + 20} ${opt.size.h + opt.offset.y + 20}`);
    LINES.forEach(l => grid.append(l));
    return grid;
}

function __dots__(svg, opt) {
    opt = __vars__(opt);
    opt.data.forEach((e, i) => {
        var c = e.color || "#0f70f1",
            dot = __node__("circle", {
                cx: opt.gap.x + (opt.gap.x * i) + opt.offset.x,
                cy: opt.size.h - (opt.move * e.value),
                style: `fill:${c};`,
                transform: `translate(-${opt.gap.x},20)`,
                id: "xo-dots",
                "data-value": `${e.label} => ${e.value}`
            });
        svg.append(dot);
    });
}

function __area__(svg, opt) {
    opt = __vars__(opt);
    var path = `${opt.offset.x + opt.gap.x},${opt.size.h} `;
    opt.data.forEach((e, i) => {
        path += `${opt.gap.x + (opt.gap.x * i) + opt.offset.x},${opt.size.h - (opt.move * e.value)} `;
    });
    path += `${opt.offset.x + opt.size.w},${opt.size.h}`;
    var area = __node__("polyline", {
        points: path,
        transform: `translate(-${opt.gap.x},18)`,
        id: "xo-area"
    });
    try {
        svg.insertBefore(area, lsvg.querySelectorAll("#xo-dot"));
    } catch {
        svg.append(area)
    }
}

function __line__(svg, opt) {
    opt = __vars__(opt);
    var path = "";
    opt.data.forEach((e, i) => {
        path += `${opt.gap.x + (opt.gap.x * i) + opt.offset.x},${opt.size.h - (opt.move * e.value)} `;
    });
    var line = __node__("polyline", {
        points: path,
        transform: `translate(-${opt.gap.x},20)`,
        id: "xo-line"
    });
    try {
        svg.insertBefore(line, lsvg.querySelectorAll("#xo-dot"));
    } catch {
        svg.append(line)
    }
}

function __bars__(svg, opt) {
    opt = __vars__(opt);
    opt.data.forEach((e, i) => {
        var c = e.color || "#0f70f1",
            p = {
                x: [opt.gap.x + (opt.gap.x * i) + opt.offset.x, opt.gap.x + (opt.gap.x * i) + opt.offset.x],
                y: [opt.size.h - (opt.move * e.value) + 20, opt.size.h + 19]
            },
            bar = __node__("polyline", {
                points: `${p.x[0]},${p.y[0]} ${p.x[1]},${p.y[1]}`,
                id: "xo-bars",
                stroke: c,
                "data-value": `${e.label} => ${e.value}`,
                transform: `translate(-${opt.gap.x},0)`
            });
        svg.append(bar);
    });
}

function __legend__(svg, opt) {
    opt = __vars__(opt);
    var text = __node__("text", {
        x: opt.offset.x / 2,
        y: opt.size.h + 4,
        "text-anchor": "middle",
        transform: `translate(0,20)`,
        id: "xo-legendVert"
    });
    text.innerHTML = "0";
    svg.append(text);
    opt.data.forEach((e, i) => {
        text = __node__("text", {
            x: opt.offset.x / 2,
            y: (opt.size.h) - (opt.gap.y * (opt.data.length - i)) + 4,
            transform: `translate(0,20)`,
            "text-anchor": "middle",
            id: "xo-legendVert"
        });
        text.innerHTML = Number(opt.unit * (opt.data.length - i)).toFixed(2);
        svg.append(text);
    });
    opt.data.forEach((e, i) => {
        text = __node__("text", {
            x: opt.gap.x + (opt.gap.x * i) + opt.offset.x,
            y: opt.size.h + 10,
            transform: `translate(-${opt.gap.x},25)`,
            id: "xo-legendHors"
        });
        text.innerHTML = e.label;
        svg.append(text);
    });
}

function __tooltip__(el) {
    el.queryAll("#xo-dots").forEach(e => {
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
    el.queryAll("#xo-bars").forEach(e => {
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
    })
}