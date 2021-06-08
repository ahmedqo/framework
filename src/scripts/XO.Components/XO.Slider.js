import XOElement from "./XO.Element.js"

var CLIENTX, SLIDE = 0;
export default class extends XOElement {
    static attributes = {
        loop: Boolean,
        interval: Number,
        change(n, v) {
            switch (n) {
                case "loop":
                    __run__(this);
                    break;
                case "interval":
                    __run__(this);
                    break;
            }
        }
    }

    static callbacks = {
        create() {
            Array.from(this.children).forEach(child => {
                if (child.tagName !== "XO-SLIDER-ITEM") {
                    child.remove();
                }
            })
            this.index = 0;
            if (this.querySelectorAll("xo-slider-item")) {
                this.$.items = this.querySelectorAll("xo-slider-item");
                if (this.$.items.length > 1) {
                    this.$.trigger.innerHTML += '<label class="arrows arrowLeft" id="xo-arrowLeft"></label>';
                    this.$.items.forEach((e, i) => {
                        if (e.matches("[active]")) this.index = i;
                        this.$.trigger.innerHTML += '<label id="xo-dot"></label>';
                    })
                    this.$.trigger.innerHTML += '<label class="arrows arrowRight" id="xo-arrowRight"></label>';
                    this.$.dots = this.queryAll("#xo-trigger #xo-dot");
                    this.$.prev = this.queryAll("#xo-trigger .arrows")[0];
                    this.$.next = this.queryAll("#xo-trigger .arrows")[1];
                }
            }
            __init__(this);
        },
        attach() {
            if (this.$.items.length <= 1) return;
            if (this.matches("[auto]")) __run__(this);
            __resize__(this);
            Array.from(this.$.dots).forEach((dot, i) => {
                dot.addEventListener("click", () => {
                    this.index = i;
                    __init__(this);
                });
            });
            this.$.next.addEventListener("click", () => { __next__(this) });
            this.$.prev.addEventListener("click", () => { __prev__(this) });
            this.addEventListener("mousedown", e => {
                __start__(e);
                this.onmousemove = e => {
                    __move__(this, e);
                };
                this.onmouseup = e => {
                    __end__(this, e);
                }
            });
            this.addEventListener("touchstart", e => {
                if (e.path[0].tagName === "MAIN" && e.path[0].id === "xo-container") {
                    __start__(e);
                    this.ontouchmove = e => {
                        __move__(this, e);
                    };
                    this.ontouchend = e => {
                        __end__(this, e);
                    }
                }
            });
            window.addEventListener("resize", () => {
                __resize__(this);
            })
        },
        detach() {
            Array.from(this.$.dots).forEach((dot, i) => {
                dot.removeEventListener("click", () => {});
            });
            this.$.next.removeEventListener("click", () => {});
            this.$.prev.removeEventListener("click", () => {});
            window.removeEventListener("resize", () => {});
            this.removeEventListener("mousedown", () => {});
            this.removeEventListener("touchstart", () => {});
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
            display: block;
            overflow: hidden;
            box-sizing: content-box !important;
            width: 100%;
            min-height: 300px;
        }
        /* Container */
        #xo-container {
            position: relative;
            width: 100%;
            overflow: hidden;
            height: 100%;
            display: block;
        }
        /* Content */
        #xo-content {
            width: 100%;
            display: flex;
            transition: all 0.5s;
            height: 100%;
        }
        /* Trigger */
        :host([trigger="hidden"]) #xo-trigger {
            display: none;
        }
        :host([pill]) #xo-trigger {
            border-radius: 100px;
        }
        #xo-trigger {
            width: max-content;
            position: absolute;
            bottom: 10px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            justify-content: center;
            background-color: #0000008c;
            padding: 5px 3px;
            border-radius: 5px;
            gap: 10px;
            align-items: center;
        }
        .small .arrows {
            width: 10px;
            height: 16px;
        }
        .arrows {
            box-sizing: border-box;
            width: 20px;
            height: 30px;
            display: block;
            position: relative;
        }
        .arrows::before,
        .arrows::after {
            content: "";
            position: absolute;
            width: 100%;
            height: 5px;
            background-color: #fff;
            border-radius: 5px;
        }
        .arrows#xo-arrowLeft::after {
            bottom: 0;
            left: 50%;
            transform-origin: right;
            transform: translateX(-50%) rotate(45deg);
        }
        .arrows#xo-arrowLeft::before {
            top: 0;
            left: 50%;
            transform-origin: right;
            transform: translateX(-50%) rotate(-45deg);
        }
        .arrows#xo-arrowRight::after {
            bottom: 0;
            left: 50%;
            transform-origin: left;
            transform: translateX(-50%) rotate(-45deg);
        }
        .arrows#xo-arrowRight::before {
            top: 0;
            left: 50%;
            transform-origin: left;
            transform: translateX(-50%) rotate(45deg);
        }
        .arrows:hover::after,
        .arrows:hover::before {
            cursor: pointer;
            background-color: #242432;
        }
        .small #xo-dot {
            width: 5px;
        }
        #xo-dot {
            width: 24px;
            height: 5px;
            background-color: #fff;
            display: block;
            border-radius: 5px;
        }
        #xo-dot:hover {
            cursor: pointer;
            background-color: #242432;
        }
        #xo-dot[active] {
            background-color: #242432;
        }
        /* Variables */
            /* Container */
            #xo-container { {{--xo-container}} }
            #xo-container:hover { {{--xo-container-hover}} }
            /* Content */
            #xo-content { {{--xo-content}} }
            #xo-content:hover { {{--xo-content-hover}} }
            /* trigger */
            #xo-trigger { {{--xo-trigger}} }
            #xo-trigger:hover { {{--xo-trigger-hover}} }
            .arrows,.arrows::before,.arrows:after { {{--xo-arrows}} }
            .arrows:hover,.arrows:hover::before,.arrows:hover::after { {{--xo-arrows-hover}} }
            #xo-dot { {{--xo-dot}} }
            #xo-dot:hover { {{--xo-dot-hover}} }
    `

    render() {
        return /*html*/ `
        <a id="xo-container">
            <section id="xo-content">
                <slot></slot>
            </section>
            <section id="xo-trigger"></section>
        </a>
    `;
    }
}

function __init__(el) {
    el.$.dots.forEach(dot => dot.removeAttribute("active"));
    el.$.items.forEach(itm => itm.removeAttribute("active"));
    el.$.content.style.transform = `translateX(calc(100% * ${el.index} * -1))`;
    el.$.dots[el.index].setAttribute("active", "");
    el.$.items[el.index].setAttribute("active", "");
}

function __next__(el) {
    if (el.index < el.$.dots.length - 1) {
        el.index++;
        __init__(el);
    } else {
        el.index = 0;
        __init__(el);
    }
}

function __prev__(el) {
    if (el.index > 0) {
        el.index--;
        __init__(el);
    } else {
        el.index = el.$.dots.length - 1;
        __init__(el);
    }
}

function __run__(el) {
    if (el.timer) clearInterval(el.timer);
    el.timer = setInterval(_ => {
        __next__(el);
    }, parseInt(el.getAttribute("interval")) || 5000);
}

function __start__(e) {
    e.preventDefault();
    if (e.touches)
        e = e.touches[0];
    if (SLIDE == 0) {
        SLIDE = 1;
        CLIENTX = e.clientX;
    }
}

function __move__(el, e) {
    e.preventDefault();
    var act;
    if (e.touches)
        e = e.touches[0];
    if (el.index <= el.$.items.length - 1 && e.clientX > CLIENTX)
        act = __next__;
    if (el.index >= 0 && e.clientX < CLIENTX)
        act = __prev__
    if (SLIDE == 1) {
        SLIDE = 2;
        if (act) act(el);
    }
}

function __end__(el, e) {
    e.preventDefault();
    if (e.touches)
        e = e.touches[0];
    if (SLIDE == 2)
        SLIDE = 0;
    el.onmousemove = null;
    el.onmouseup = null;
    el.ontouchmove = null;
    el.ontouchend = null;
}

function __resize__(el) {
    (el.$.trigger.clientWidth > el.$.container.clientWidth) ? el.$.trigger.classList.add("small"): el.$.trigger.classList.remove("small");
}