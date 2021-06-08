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
                    this.$.container.innerHTML = "";
                    if (v) {
                        var grid = __grid__(this.data);
                        this.$.container.appendChild(grid);
                        __tooltip__(this);
                    }
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
        /* Conatiner */
        #xo-container {
            width: 300px;
            margin: 0 auto;
        }
        #xo-container svg {
            display: block;
        }
        #xo-grid {
            stroke: #1d1d1d;
            stroke-width: .5;
            stroke-linecap: round;
            fill: transparent;
        }
        :host([dots]) #xo-dots {
            display: initial;
        }
        :host([area]) #xo-area {
            display: initial;
        }
        #xo-dots,
        #xo-area {
            display: none;
        }
        #xo-dots {
            cursor: pointer;
            r: 8;
        }
        #xo-area {
            fill: #0f70f11a;
            stroke-width: 5;
            stroke-linecap: round;
            stroke: #0f70f1;
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
            /* Grid */
            #xo-grid { {{--xo-grid}} }
            #xo-grid:hover { {{--xo-grid-hover}} }
            /* Dots */
            #xo-dots { {{--xo-dots}} }
            #xo-dots:hover { {{--xo-dots-hover}} }
            /* Area */
            #xo-area { {{--xo-area}} }
            #xo-area:hover { {{--xo-area-hover}} }
            /* Legends */
            #xo-legends { {{--xo-legends}} }
            #xo-legends:hover { {{--xo-legends-hover}} }
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

function __polar__(centerX, centerY, radius, angleInDegrees) {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
}

function __polygon__(centerX, centerY, points, radius) {
    const degreeIncrement = 360 / (points);
    const d = new Array(points).fill('foo').map((p, i) => {
        const point = __polar__(centerX, centerY, radius, degreeIncrement * i);
        return `${point.x},${point.y}`;
    });
    return `M ${d.join(" ")} Z`;
}

function __grid__(data, size = 500) {
    var group = __node__("g", {
            transform: "translate(10, 10)"
        }),
        grid = __node__("svg"),
        scale = 5;
    for (var i = scale; i > 0; i--) {
        var poly = __node__("path", {
            d: __polygon__(size / 2, size / 2, data.length, (size / 2) / scale * i),
            id: "xo-grid",
        });
        group.append(poly);
    }
    __lines__(data.length, size, group);
    __area__(size, group, data);
    __dots__(size, group, data);
    grid.append(group);
    grid.setAttribute("viewBox", `0 0 ${size + 20} ${size + 20}`);
    if (data.length === 3) grid.setAttribute("viewBox", `0 0 ${size + 20} ${(size + 20) - (size / 100 * 24.8)}`);
    if (data.length === 5) grid.setAttribute("viewBox", `0 0 ${size + 20} ${(size + 20) - (size / 100 * 9.2)}`);
    return grid
}

function __lines__(corners, size, svg) {
    var pts = __polygon__(size / 2, size / 2, corners, (size / 2)).split(" ");
    pts.splice(pts.length - 1, 1);
    pts.splice(0, 1);
    for (var i = 0; i < corners; i++) {
        var line = __node__("line", {
            x1: pts[i].split(",")[0],
            y1: pts[i].split(",")[1],
            id: "xo-grid",
            x2: size / 2,
            y2: size / 2,
        });
        svg.append(line);
    }
}

function __dots__(size, svg, data) {
    var max = Math.max(...data.map(e => e.value));
    for (var i = 0; i < data.length; i++) {
        var pts = __polygon__(size / 2, size / 2, data.length, ((size / 2) / 100) * (data[i].value / max * 100)).split(" "),
            c = data[i].color || "#0f70f1";
        pts.splice(pts.length - 1, 1);
        pts.splice(0, 1);
        var dot = __node__("circle", {
            "data-value": `${data[i].label} => ${((data[i].value / max) * 100).toFixed(2)}%`,
            cx: pts[i].split(",")[0],
            cy: pts[i].split(",")[1],
            id: "xo-dots",
            fill: c,
            r: 2
        });
        svg.append(dot);
    }
}

function __area__(size, svg, data) {
    var path = "M ",
        max = Math.max(...data.map(e => e.value));
    for (var i = 0; i < data.length; i++) {
        var pts = __polygon__(size / 2, size / 2, data.length, ((size / 2) / 100) * (data[i].value / max * 100)).split(" ");
        pts.splice(pts.length - 1, 1);
        pts.splice(0, 1);
        path += pts[i] + " ";
    }
    var poly = __node__("path", {
        d: path + " Z",
        id: "xo-area",
    });
    svg.append(poly);
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
}