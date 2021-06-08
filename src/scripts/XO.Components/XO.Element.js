import { style } from "../XO.Engine.js"

JSON["name"] = "JSON";

export default class extends HTMLElement {
    static get observedAttributes() {
        if (this.attributes) {
            return Object.keys(this.attributes).filter(x => x !== "change");
        }
    }

    constructor() {
        super();
        this.root = this.attachShadow({ mode: "open" });
        __run__(this);
        __ids__(this);
        __css__(this);
        __fns__(this);
    }

    static styles = ""

    render() {
        return "";
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if (this.constructor.attributes && this.constructor.attributes.change) {
            if (oldVal !== newVal) {
                this.constructor.attributes.change.bind(this)(name, __type__(this.constructor.attributes[name].name)(newVal));
            }
        }
    }

    connectedCallback() {
        Array.from(this.attributes).forEach(attr => {
            if (attr.name === "@load") new Function(attr.value).bind(this)(event);
            if (attr.name.startsWith("@")) {
                this.addEventListener(attr.name.slice(1), event => {
                    new Function(attr.value).bind(this)(event);
                })
            }
        })
        if (this.constructor.callbacks && this.constructor.callbacks.attach) {
            this.constructor.callbacks.attach.bind(this)();
        }
    }

    disconnectedCallback() {
        Array.from(this.attributes).forEach(attr => {
            if (attr.name === "@remove") new Function(attr.value).bind(this)(event)
            if (attr.name.startsWith("@")) {
                this.removeEventListener(attr.name.slice(1), () => {});
            }
        })
        if (this.constructor.callbacks && this.constructor.callbacks.detach) {
            this.constructor.callbacks.detach.bind(this)();
        }
    }

    query(el) {
        return this.root.querySelector(el);
    }

    queryAll(el) {
        return this.root.querySelectorAll(el);
    }

    action(el) {
        const self = {
            elemnt: el === this ? this : this.query(el),
            attr: {
                set(attr, val) {
                    self.elemnt.setAttribute(attr, val || "");
                },
                get(attr) {
                    return self.elemnt.getAttribute(attr);
                },
                match(attr) {
                    return self.elemnt.matches(`[${attr}]`);
                },
                remove(attr) {
                    self.elemnt.removeAttribute(attr);
                },
                toogle(attr, val) {
                    if (self.elemnt.hasAttribute(attr)) self.elemnt.removeAttribute(attr);
                    else self.elemnt.setAttribute(attr, val || "");
                },
            },
            css(key, val) {
                if (val) self.elemnt.style[vals] = sec;
                else Object.keys(key).forEach(k => {
                    self.elemnt.style[k] = key[k];
                });
            }
        }
        return self
    }
}

function __run__(el) {
    el.root.prepend(style(el)(el.constructor.styles));
    el.root.innerHTML += el.render();
}

function __ids__(el) {
    el.$ = {};
    var ids = [];
    Array.from(el.queryAll("*")).filter(e => {
        if (e.hasAttribute("id") && e.id.startsWith("xo-")) return e;
    }).forEach(e => {
        ids.push("#" + e.id);
        ids = [...new Set(ids)];
    });
    ids.forEach(e => {
        var s = el.queryAll(e);
        if (s.length > 1) el.$[e.slice(4)] = Array.from(s);
        else el.$[e.slice(4)] = s[0];
    });
}

function __css__(el) {
    const observer = new MutationObserver(() => {
        el.query("style").replaceWith(style(el)(el.constructor.styles));
    });
    observer.observe(el, {
        attributes: true,
        attributeFilter: ["style", "class"]
    })
}

function __fns__(el) {
    var propArchive = {};
    if (el.constructor.properties && Object.keys(el.constructor.properties).length) {
        Object.keys(el.constructor.properties).forEach((key) => {
            if (key !== "change") {
                propArchive[key] = el.constructor.properties[key].default;
                propArchive[key + "Type"] = el.constructor.properties[key].type;
                Object.defineProperty(el, key, {
                    set(val) {
                        propArchive[key] = __type__(propArchive[key + "Type"].name)(val);
                        if (el.constructor.properties.change)
                            el.constructor.properties.change.bind(el)(key, propArchive[key]);
                    },
                    get() {
                        return propArchive[key];
                    }
                })
            }
        });
    }
    if (el.constructor.observedAttributes && el.constructor.observedAttributes.length) {
        el.constructor.observedAttributes.forEach((attr) => {
            Object.defineProperty(el, attr, {
                get() {
                    var type = el.constructor.attributes[attr],
                        Attr = el.getAttribute(attr);
                    if (Attr)
                        return __type__(type.name)(Attr);
                    return null;
                },
                set(attrValue) {
                    el.setAttribute(attr, attrValue);
                },
            });
        });
    }
    if (el.constructor.callbacks && el.constructor.callbacks.create) {
        el.constructor.callbacks.create.bind(el)();
    }
}

function __type__(n) {
    switch (n) {
        case "Array":
            return (e) => {
                if (e) {
                    if (Array.isArray(e)) return Array.from(e);
                    else return new Function(`return ${e}`)();
                }
                return e;
            };
        case "Object":
            return (e) => {
                if (e) {
                    if (typeof e === "object") return Object(e);
                    else return new Function(`return ${e}`)();
                }
                return e;
            };
        case "Date":
            return (e) => new Date(e);
        case "JSON":
            return JSON.parse;
        case "Boolean":
            return Boolean;
        case "String":
            return String;
        case "Number":
            return Number;
        default:
            return (e) => e;
    }
}

/**
 *   class extends XOElement {
 *       @property [Object] attributes is an object contains all Element attributtes with there types
 *       @function [void] change function fires when attributes changes
 *       static attributes = {
 *           change(name, val) {},
 *       };
 * 
 *       @property [Object] properties is an object contains all Element properties with there values
 *       static properties = {}
 *       
 *       @property [Object] callbacks is an object contains Element tow function
 *       @function [void] attach fires when object is created
 *       @function [void] detach fires whene object is deleted
 *       static callbacks = {
 *           attach() {},
 *           detach() {}
 *       }
 * 
 *       @property [String] styles is a property contains Styles of Element
 *       static styles = ``;
 * 
 *       @methode [String] render is function returns Template of Element
 *       render() {
 *           return ``
 *       }
 *    }
 */