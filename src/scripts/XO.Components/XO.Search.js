import XOElement from "./XO.Element.js"

export default class extends XOElement {
    static attributes = {
        placeholder: String,
        change(n, v) {
            switch (n) {
                case "placeholder":
                    this.query("#xo-search-text").placeholder = v;
                    break;
            }
        }
    }

    static properties = {
        routes: { default: {}, type: Object },
        change(n, v) {
            switch (n) {
                case "routes":
                    this.init(v);
                    break;
            }
        }
    }

    static callbacks = {
        create() {
            if (this.hasAttribute("routes")) {
                this.routes = this.getAttribute("routes");
                this.removeAttribute("routes");
            }
        },
        attach() {
            this.query("#xo-search-text").addEventListener("keyup", e => {
                var els = this.queryAll("#xo-search-item");
                els.forEach(el => {
                    var v = el.textContent.trim().toLowerCase(),
                        s = e.target.value.trim().toLowerCase();
                    if (v.includes(s) && s !== "") {
                        el.parentElement.removeAttribute("hidden");
                    } else {
                        el.parentElement.setAttribute("hidden", "");
                    }
                });
            });
            this.queryAll("#xo-search-item").forEach(i => {
                i.parentElement.addEventListener("click", e => {
                    spa.send(e.target.getAttribute("route"));
                    this.query("#xo-search-text").value = "";
                    this.style.display = "";
                    this.queryAll("#xo-search-item").forEach(i => {
                        i.parentElement.setAttribute("hidden", "");
                    });
                });
                i.addEventListener("click", e => {
                    spa.send(e.target.parentElement.getAttribute("route"));
                    this.query("#xo-search-text").value = "";
                    this.style.display = "";
                    this.queryAll("#xo-search-item").forEach(i => {
                        i.parentElement.setAttribute("hidden", "");
                    });
                });
            });
            document.addEventListener("keyup", e => {
                if (e.keyCode == 40 && e.ctrlKey) {
                    this.style.display = "flex";
                    this.query("#xo-search-text").focus();
                }
                if (e.keyCode === 27) {
                    this.style.display = "";
                    this.query("#xo-search-text").value = "";
                    this.query("#xo-search-text").blur();
                    this.queryAll("#xo-search-item").forEach(i => {
                        i.parentElement.setAttribute("hidden", "");
                    });
                }
            });
        },
        detach() {
            this.query("#xo-search-text").removeEventListener("keyup", () => {});
            this.queryAll("xo-search-item").forEach(i => {
                i.parentElement.removeAttribute("click", () => {});
                i.removeAttribute("click", () => {});
            });
            document.removeEventListener("keyup", () => {});
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
            display: none;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100vh;
            background: #1d1d1d80;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 10000000000000;
        }
        * {
            font-family: Arial, sans-serif;
        }
        #xo-search-container {
            width: 60%;
            padding: 10px;
            border-radius: 5px;
            background: #fff;
        }
        #xo-search-text {
            outline: unset;
            border-radius: 5px;
            box-sizing: border-box;
            width: 100%;
            height: 100%;
            font-size: 18px;
            padding: 4.5px 10px;
            background: transparent;
            border: 1px solid #1d1d1d;
        }
        #xo-search-item {
            text-decoration: unset;
            border-radius: 100px;
            background: var(--defaultLight);
            width: max-content;
            padding: 5px 10px;
            margin-top: 10px;
            font-size: 20px;
            color: #1d1d1d;
            display: block;
        }
        #xo-search-display div:hover {
            cursor: pointer;
        }
        #xo-search-display div:hover #xo-search-item {
            background: var(--default);
        }
        :host([theme="water"]) #xo-search-item {
            background: var(--waterLight);
        }
        :host([theme="water"]) #xo-search-display div:hover #xo-search-item {
            background: var(--water);
            color: #fff;
        }
        :host([theme="fire"]) #xo-search-item {
            background: var(--fireLight);
        }
        :host([theme="fire"]) #xo-search-display div:hover #xo-search-item {
            background: var(--fire);
            color: #fff;
        }
        :host([theme="earth"]) #xo-search-item {
            background: var(--earthLight);
        }
        :host([theme="earth"]) #xo-search-display div:hover #xo-search-item {
            background: var(--earth);
        }
        :host([theme="forest"]) #xo-search-item {
            background: var(--forestLight);
        }
        :host([theme="forest"]) #xo-search-display div:hover #xo-search-item {
            background: var(--forest);
            color: #fff;
        }
        :host([theme="night"]) #xo-search-item {
            background: var(--nightLight);
        }
        :host([theme="night"]) #xo-search-display div:hover #xo-search-item {
            background: var(--night);
            color: #fff;
        }
        @media (max-width: 767.98px) {
            #xo-search-container {
                width: 90%;
            }
        }
    `

    render() {
        return /*html*/ `
            <main part="-xo-inner" id="xo-search-container">
                <input part="-xo-inner-text" type="text" id="xo-search-text">
                <div part="-xo-inner-display" id="xo-search-display">
                </div>
            </main>
        `;
    }

    init() {
        var routes = "";
        Object.keys(this.routes).forEach(r => {
            routes += `<div route="${this.routes[r]}" hidden><a onclick="event.preventDefault()" part="-xo-inner-item" id="xo-search-item" href>${r}</a></div>`;
        });
        this.query("#xo-search-display").innerHTML = routes;
    }
}