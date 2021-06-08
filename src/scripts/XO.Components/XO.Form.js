import XOElement from "./XO.Element.js"

export default class extends XOElement {
    static callbacks = {
        attach() {
            var itms = Array.from(this.getElementsByTagName('*'));
            for (let i of itms) {
                if (i.hasAttribute("type") && i.getAttribute("type").toLowerCase() === "submit") {
                    i.addEventListener("click", () => {
                        this.submit();
                    });
                    break;
                }
            }
        },
        detach() {
            var itms = Array.from(this.getElementsByTagName('*'));
            for (let i of itms) {
                if (i.hasAttribute("type") && i.getAttribute("type").toLowerCase() === "submit") {
                    i.removeEventListener("click", () => {});
                    break;
                }
            }
        }
    }

    submit() {
        var data = __values__(this);
        var event = new CustomEvent("submit", {
            bubbles: true,
            cancelable: true,
            data: data,
        });
        this.dispatchEvent(event);
        __submit__(this, data);
    }
}

function __values__(el) {
    var items = Array.from(el.getElementsByTagName('*')),
        dict = el.getAttribute("data") || "{}",
        data = new FormData(),
        res = [];
    dict = new Function("return " + dict)();
    Object.keys(dict).forEach(k => {
        data.append(k, dict[k]);
    })
    items.forEach(i => {
        if (("value" in i || "files" in i) && !i.matches("[blocked]") && i.parentElement.tagName !== "XO-SWITCH-GROUP" && i.parentElement.tagName !== "XO-SELECT") {
            if ((typeof i.value === "string" && i.value.trim() === "") || ("files" in i && Object.keys(i.files).length === 0) || i.value === null || i.value === undefined) {
                res.push(false);
                var event = new CustomEvent("empty", {
                    bubbles: true,
                    cancelable: true,
                    target: i,
                })
                el.dispatchEvent(event);
            } else {
                res.push(true);
                var event = new CustomEvent("valid", {
                    bubbles: true,
                    cancelable: true,
                    target: i
                })
                el.dispatchEvent(event);
            }
            if ("files" in i) {
                if (i.matches("[multiple]")) {
                    if (Object.keys(i.files).length === 0) {
                        data.append(i.getAttribute("name"), undefined);
                    } else {
                        Object.keys(i.files).forEach(k => {
                            data.append(i.getAttribute("name"), i.files[k]);
                        });
                    }
                } else {
                    data.append(i.getAttribute("name"), i.files[0]);
                }
            } else {
                data.append(i.getAttribute("name"), i.value);
            }
        }
    });
    var event = new CustomEvent("validate", {
        bubbles: true,
        cancelable: true,
        valid: !res.includes(false),
    })
    el.dispatchEvent(event);
    return data;
}

function __submit__(el, data) {
    var headers = new Function("return " + el.getAttribute("headers"))(),
        method = el.getAttribute("method"),
        type = el.getAttribute("type"),
        url = el.getAttribute("url");
    const methods = ["POST", "GET", "PUT", "DELETE"];
    const types = ["arrayBuffer", "blob", "clone", "formData", "json", "text"];
    if (method && !methods.includes(method.toUpperCase())) {
        throw new Error("method must be one of " + methods.join(", "));
    }
    if (type && !types.includes(type)) {
        throw new Error("type must be one of " + types.join(", "));
    }
    if (!url) {
        throw new Error("url is required");
    }
    if (!method) method = "GET";
    if (!headers) headers = {};
    if (!type) type = "text";
    if (!data) data = {};
    const opts = { method: method.toUpperCase(), headers: headers };
    if (method && method.toUpperCase() === "GET") {
        url += Object.keys(data).reduce((r, v) => {
            return r += "&" + v + "=" + data[v];
        }, "").substr(1);
    } else {
        opts.body = data;
    }
    fetch(url, opts).then(r => {
        r[type]().then(e => {
            __success__(el, e, r, type)
        }).catch(e => {
            __error__(el, e, type)
        });
    }).catch(e => {
        __error__(el, e, type)
    });
}

function __success__(el, e, r, t) {
    var event = new CustomEvent("success", {
        bubbles: true,
        cancelable: true,
        detail: {
            result: e,
            response: r,
            type: t,
        }
    })
    el.dispatchEvent(event);
}

function __error__(el, e, t) {
    var event = new CustomEvent("error", {
        bubbles: true,
        cancelable: true,
        detail: {
            result: e,
            type: t,
        }
    })
    el.dispatchEvent(event);
}