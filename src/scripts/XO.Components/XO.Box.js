import XOElement from "./XO.Element.js"

export default class extends XOElement {
    static callbacks = {
        attach() {
            this.$.icon.addEventListener("click", () => {
                this.hide();
            });
        },
        detach() {
            this.$.icon.removeEventListener("click", () => {});
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
            width: 100%;
            box-sizing: content-box !important;
        }
        /* container */
        :host([theme="water"]) #xo-container {
            background: var(--water);
        }
        :host([theme="fire"]) #xo-container {
            background: var(--fire);
        }
        :host([theme="earth"]) #xo-container {
            background: var(--earth); 
        }
        :host([theme="forest"]) #xo-container {
            background: var(--forest);
        }
        :host([theme="night"]) #xo-container {
            background: var(--night);
        }
        :host([theme="water"]) #xo-container,
        :host([theme="fire"]) #xo-container,
        :host([theme="forest"]) #xo-container,
        :host([theme="night"]) #xo-container {
            color: #fff;
        }
        #xo-container {
            background: var(--default);
            border-radius: 5px;
            overflow: hidden;
            min-width: 100%;
            color: #1d1d1d;
        }
        /* Header */
        :host([trigger="hidden"]) #xo-header {
            padding-right: 10px;
        }
        :host([theme="water"]) #xo-header,
        :host([theme="fire"]) #xo-header,
        :host([theme="forest"]) #xo-header,
        :host([theme="night"]) #xo-header {
            border-color: #ffffff;
        }
        #xo-header {
            border-bottom: 3px solid #1d1d1d;
            position: relative;
            font-size: 20px;
            font-weight: 700;
            padding: 10px;
            padding-right: 40px;
        }
        /* Icon */
        :host([trigger="hidden"]) #xo-icon {
            display: none;
        }
        :host([theme="fire"]) #xo-icon svg,
        :host([theme="water"]) #xo-icon svg,
        :host([theme="forest"]) #xo-icon svg,
        :host([theme="night"]) #xo-icon svg  {
            fill: #fff;
        }
        #xo-icon {
            top: 50%;
            right: 8px;
            cursor: pointer;
            position: absolute;
            transform: translateY(-50%);
        }
        #xo-icon:focus {
            outline: auto;
        }
        #xo-icon svg {
            width: 14px;
            height: 14px;
            fill: #1d1d1d;
            display: flex
        }
        /* Content */
        #xo-content {
            padding: 10px 15px;
            font-size: 18px;
        }
        /* Variables */
            /* Container */
            #xo-container {
                {{--xo-container}}
            }
            #xo-container:hover {
                {{--xo-container-hover}}
            }
            /* Header */
            #xo-header {
                {{--xo-header}}
            }
            #xo-header:hover {
                {{--xo-header-hover}}
            }
            /* Icon */
            #xo-icon {
                {{--xo-icon}}
            }
            #xo-icon:hover {
                {{--xo-icon-hover}}
            }
            #xo-icon svg {
                {{--xo-icon-svg}}
            }
            #xo-icon:hover svg {
                {{--xo-icon-svg-hover}}
            } 
            /* Content */
            #xo-content {
                {{--xo-content}}
            }
            #xo-content:hover {
                {{--xo-content-hover}}
            }
    `

    render() {
        return /*html*/ `
            <main role="box" id="xo-container">
                <header id="xo-header">
                    ${this.getAttribute("header") || ""}
                    <button id="xo-icon">
                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000.000000 1000.000000" preserveAspectRatio="xMidYMid meet">
                            <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
                                <path d="M1790 8714 c-189 -41 -362 -179 -451 -359 -107 -217 -88 -464 52 -672 17 -27 624 -641 1348 -1366 l1316 -1317 -1316 -1318 c-724 -724 -1331 -1338 -1348 -1365 -266 -397 -66 -918 395 -1028 182 -44 367 -8 534 104 25 16 638 622 1363 1346 l1317 1316 1318 -1316 c724 -724 1337 -1330 1362 -1346 116 -77 216 -112 350 -120 265 -15 511 129 631 372 107 217 88 463 -52 672 -17 27 -624 641 -1348 1365 l-1316 1318 1316 1317 c724 725 1331 1339 1348 1366 140 208 159 455 52 672 -183 369 -633 486 -978 254 -27 -17 -641 -624 -1365 -1348 l-1318 -1316 -1317 1316 c-725 724 -1339 1331 -1366 1348 -159 107 -346 144 -527 105z"/>
                            </g>
                        </svg>
                    </button>
                </header>
                <section id="xo-content">
                    <slot></slot>
                </section>
            </main>
        `
    }

    show() {
        this.style.display = "";
        var event = new CustomEvent("show", {
            bubbles: true,
            cancelable: true,
        })
        this.dispatchEvent(event);
    }

    hide() {
        if (this.matches("[keep]")) {
            this.style.display = "none";
            var event = new CustomEvent("hide", {
                bubbles: true,
                cancelable: true,
            })
            this.dispatchEvent(event);
        } else {
            this.remove();
            var event = new CustomEvent("remove", {
                bubbles: true,
                cancelable: true,
            })
            this.dispatchEvent(event);
        }
    }
}