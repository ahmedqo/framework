import XOElement from "./XO.Element.js"

export default class extends XOElement {
    static attributes = {
        src: String,
        alt: String,
        change(n, v) {
            switch (n) {
                case "src":
                    this.$.image.src = v;
                    break;
                case "alt":
                    this.$.image.alt = v;
                    break;
            }
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
        /* Element */
        :host {
            display: inline-block;
        }
        /* Container */
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
        #xo-container {
            box-sizing: border-box;
            width: 100%;
            height: 100%;
            cursor: pointer;
            overflow: hidden;
            flex-wrap: nowrap;
            border-radius: 5px;
            background-color: var(--default);
            transition: transform .3s ease-in-out, box-shadow .3s ease-in-out;
        } 
        #xo-container:hover {
            box-shadow: 0 0 3px 3px #40404033;
            transform: scale(1.03);
        }
        /* Image */
        #xo-image {
            display: block;
            width: 100%;
        }
        /* Label */
        #xo-label {
            display: block;
            font-size: 18px;
            padding: 5px;
            padding-bottom: 0;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        :host([theme="water"]) #xo-label,
        :host([theme="fire"]) #xo-label,
        :host([theme="forest"]) #xo-label,
        :host([theme="night"]) #xo-label {
            color: #fff;
        }
        /* Variables */
            /* Container */
            #xo-container {
                {{--xo-container}}
            }
            #xo-container:hover {
                {{--xo-container-hover}}
            }
            /* Image */
            #xo-image {
                {{--xo-image}}
            }
            #xo-image:hover {
                {{--xo-image-hover}}
            }
            /* Label */
            #xo-label {
                {{--xo-label}}
            }
            #xo-label:hover {
                {{--xo-label-hover}}
            }
    `;

    render() {
        return /*html*/ `
            <main id="xo-container">
                <img id="xo-image">
                <label id="xo-label">
                    <slot></slot>
                </label>
                <slot name="price"></slot>
            </main>
		`;
    }
}