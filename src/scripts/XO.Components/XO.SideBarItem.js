import XOElement from "./XO.Element.js"

export default class extends XOElement {
    static attributes = {
        url: String,
        target: String,
        change(n, v) {
            switch (n) {
                case "url":
                    if (this.matches("[spa]")) {
                        this.$.container.onclick = (e) => {
                            e.preventDefault();
                            spa.send(v);
                        };
                    } else {
                        this.$.container.onclick = "";
                        this.$.container.href = v;
                    }
                    break;
                case "target":
                    this.$.container.target = v;
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
            display: block;
            box-sizing: content-box !important;
            width: 100%;
        }  
        /* Container */
        :host([selected]) #xo-container::before {
            transform: scaleX(0);
        }
        :host([selected]) #xo-container::after {
            transform: scaleX(1);
        }
        #xo-container {
            text-decoration: unset;
            padding: 10px;
            display: flex;
            align-items: center;
            position: relative;
            z-index: 1;
        }
        #xo-container::before,
        #xo-container::after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: -1;
            transform: scaleX(0);
            transition: transform 0.3s ease-in-out;
        }
        #xo-container::before {
            transform-origin: left;
            background: #1d1d1d;
        }
        #xo-container::after {
            transform-origin: right;
            background: #1d1d1d;
        }
        #xo-container *:hover
        #xo-container:hover {
            cursor: pointer;
        }
        #xo-container:hover::before {
            transform: scaleX(1);
        }
        /* Label */
        :host([selected]) #xo-label {
            color: #ffffff;
        }
        #xo-label {
            order: 2;
            font-size: 20px;
            text-align: left;
            color: #1d1d1d;
            margin-left: 10px;            
            transition: color 0.3s ease-in-out;
        }
        #xo-container:hover #xo-label {
            color: #ffffff;
        }
        /* Variables */
            /* Container */
            #xo-container {
                {{--xo-container}}
            }
            #xo-container:hover {
                {{--xo-container-hover}}
            }
            :host([selected]) #xo-container {
                {{--xo-container-selected}}
            }
            :host([selected]) #xo-container:hover {
                {{--xo-container-selected-hover}}
            }
            #xo-container::before {
                {{--xo-container-before}}
            }
            #xo-container:hover::before {
                {{--xo-container-before-hover}}
            } 
            :host([selected]) #xo-container::before {
                {{--xo-container-before-selected}}
            }
            :host([selected]) #xo-container:hover::before {
                {{--xo-container-before-selected-hover}}
            }
            #xo-container::after {
                {{--xo-container-after}}
            }
            #xo-container:hover::after {
                {{--xo-container-after-hover}}
            }
            :host([selected]) #xo-container::after {
                {{--xo-container-after-selected}}
            }
            :host([selected]) #xo-container:hover::after {
                {{--xo-container-after-selected-hover}}
            }
            /* label */
            #xo-label {
                {{--xo-label}}
            }
            #xo-label:hover {
                {{--xo-label-hover}}
            }
            
    `

    render() {
        return /*html*/ `
            <a href onclick="event.preventDefault()" role="link" id="xo-container">
                <slot name="icon"></slot>
                <label id="xo-label">
                    <slot></slot>
                </label>
            </a>
        `;
    }
}