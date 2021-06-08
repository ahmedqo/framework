function Selector(SELECTOR) {
    let list = [];
    if (Array.isArray(SELECTOR)) {
        list = SELECTOR
    } else if (typeof SELECTOR === "object") {
        list.push(SELECTOR)
    } else {
        if (SELECTOR[0] === ":") list = document.querySelectorAll(`[name=${SELECTOR.slice(1)}]`);
        else list = document.querySelectorAll(SELECTOR);
    }
    list = Array.from(list);
    return list;
}

function makeError(SEL, func, type, ele) {
    throw new Error(`XO("${SEL}").${func}(...) accept [${type}] not ["${typeof ele}"]`);
}

var XO = (function() {
    var ELE, ITEMS, XO = function(elems) {
            return new XOConstruct(elems);
        },
        XOConstruct = function(elems) {
            ELE = elems;
            ITEMS = Selector(elems);
            return this;
        };
    XO.fn = XOConstruct.prototype = {
        delay: 0,
        val: function(value) {
            if (typeof value === "undefined") {
                if (ITEMS[0].tagName === "SELECT") {
                    return ITEMS[0].options[ITEMS[0].selectedIndex].value;
                } else {
                    return ITEMS[0].value;
                }
            } else if (typeof value === "string" || typeof value === "number") {
                ITEMS.forEach((sel) => {
                    sel.value = value;
                });
            } else {
                makeError(ELE, "val", `"String", "Number", "Undefined"`, value);
            }
            return this;
        },
        text: function(value) {
            if (typeof value === "undefined") {
                if (ITEMS[0].tagName === "SELECT") {
                    return ITEMS[0].options[ITEMS[0].selectedIndex].text;
                } else {
                    return ITEMS[0].innerText;
                }
            } else if (typeof value === "string" || typeof value === "number") {
                ITEMS.forEach((sel) => {
                    sel.innerText = value;
                });
            } else {
                makeError(ELE, "text", `"String", "Number", "Undefined"`, value);
            }
            return this;
        },
        html: function(value) {
            if (typeof value === "undefined") {
                return ITEMS[0].innerHTML;
            } else if (typeof value === "string" || typeof value === "number") {
                ITEMS.forEach((sel) => {
                    sel.innerHTML = value;
                });
            } else {
                makeError(ELE, "html", `"String", "Number", "Undefined"`, value);
            }
            return this;
        },
        attr: function(name, value) {
            if (typeof name === "string") {
                if (typeof value === "undefined") {
                    if (ITEMS[0].getAttribute(name)) {
                        return ITEMS[0].getAttribute(name);
                    } else {
                        return false;
                    }
                } else if (typeof value === "string" || typeof value === "number") {
                    ITEMS.forEach((sel) => {
                        sel.setAttribute(name, value);
                    });
                } else {
                    makeError(ELE, "attr", `"String", "Number"`, value);
                }
            } else if (typeof name === "object") {
                for (var key in name) {
                    if (typeof name[key] === "string" || typeof name[key] === "number") {
                        ITEMS.forEach((sel) => {
                            sel.setAttribute(key, name[key]);
                        });
                    }
                }
            } else {
                makeError(ELE, "attr", `"String"`, value);
            }
            return this;
        },
        removeAttr: function(value) {
            if (typeof value === "string") {
                ITEMS.forEach((sel) => {
                    sel.removeAttribute(value);
                });
            } else if (Array.isArray(value)) {
                value.forEach((val) => {
                    if (typeof val === "string") {
                        ITEMS.forEach((sel) => {
                            sel.removeAttribute(val);
                        });
                    } else {
                        makeError(ELE, "removeAttr", `"List Of String"`, val);
                    }
                });
            } else {
                makeError(ELE, "removeAttr", `"String"`, value);
            }
            return this;
        },
        hasAttr: function(value) {
            if (typeof value === "string") {
                if (ITEMS[0].getAttribute(value)) {
                    return true;
                } else {
                    return false;
                }
            } else {
                makeError(ELE, "hasAttr", `"String"`, value);
            }
        },
        find: function(value) {
            item = ITEMS[0].querySelectorAll(value);
            if (!item) {
                throw new Error(`XO("${ELE}").find("${value}") Not Found In The DOM`);
            }
            return XO(Array.from(item));
        },
        attach: function(value) {
            if (typeof value === "string") {
                ITEMS.forEach((sel) => {
                    setTimeout(() => {
                        sel.insertAdjacentHTML("beforeend", value);
                    }, this.delay);
                });
            } else {
                makeError(ELE, "attach", `"String"`, value);
            }
            return this;
        },
        attachElement: function(value) {
            if (typeof value === "object") {
                ITEMS.forEach((sel) => {
                    setTimeout(() => {
                        sel.append(value);
                    }, this.delay);
                });
            } else {
                makeError(ELE, "attachElement", `"Object"`, value);
            }
            return this;
        },
        pretach: function(value) {
            if (typeof value === "string") {
                ITEMS.forEach((sel) => {
                    sel.insertAdjacentHTML("afterbegin", value);
                });
            } else {
                makeError(ELE, "pretach", `"String"`, value);
            }
            return this;
        },
        pretachElement: function(value) {
            if (typeof value === "object") {
                ITEMS.forEach((sel) => {
                    sel.prepend(value);
                });
            } else {
                makeError(ELE, "pretachElement", `"Object"`, value);
            }
            return this;
        },
        replace: function(value) {
            if (typeof value === "string") {
                ITEMS.forEach((sel) => {
                    sel.replaceWith(value);
                });
            } else {
                makeError(ELE, "replace", `"String"`, value);
            }
            return;
        },
        replaceElement: function(value) {
            if (typeof value === "object") {
                ITEMS.forEach((sel) => {
                    sel.replaceWith(value);
                });
            } else {
                makeError(ELE, "replaceElement", `"Object"`, value);
            }
            return;
        },
        detach: function(value) {
            if (typeof value === "string" || typeof value === "undefined") {
                ITEMS.forEach((sel) => {
                    if (value) {
                        sel.parentNode.removeChild(value);
                    } else {
                        sel.parentNode.removeChild(sel);
                    }
                });
            } else {
                makeError(ELE, "detach", `"String", "Undefined"`, value);
            }
            return;
        },
        detachElement: function(value) {
            if (typeof value === "object") {
                ITEMS.forEach((sel) => {
                    sel.parentNode.removeChild(value);
                });
            } else {
                makeError(ELE, "detachElement", `"Object"`, value);
            }
            return;
        },
        addClass: function(...value) {
            value.forEach((val) => {
                if (typeof val === "string") {
                    ITEMS.forEach((sel) => {
                        sel.classList.add(val);
                    });
                } else {
                    makeError(ELE, "addClass", `"String", "List Of Strings"`, val);
                }
            });
            return this;
        },
        removeClass: function(...value) {
            value.forEach((val) => {
                if (typeof val === "string") {
                    ITEMS.forEach((sel) => {
                        sel.classList.remove(val);
                    });
                } else {
                    makeError(ELE, "removeClass", `"String", "List Of Strings"`, val);
                }
            });

            return this;
        },
        toggleClass: function(...value) {
            value.forEach((val) => {
                if (typeof val === "string") {
                    ITEMS.forEach((sel) => {
                        sel.classList.toggle(val);
                    });
                } else {
                    makeError(ELE, "toggleClass", `"String", "List Of Strings"`, val);
                }
            });
            return this;
        },
        replaceClass: function(old, New) {
            if (typeof old === "string" && typeof New === "string") {
                ITEMS.forEach((sel) => {
                    sel.classList.replace(old, New);
                });
            } else {
                if (typeof old !== "string") {
                    makeError(ELE, "replaceClass", `"String", "List Of Strings"`, old);
                } else {
                    makeError(ELE, "replaceClass", `"String", "List Of Strings"`, New);
                }
            }
            return this;
        },
        hasClass: function(value) {
            if (typeof value === "string") {
                return ITEMS[0].classList.contains(value);
            } else {
                makeError(ELE, "hasClass", `"String"`, value);
            }
        },
        css: function(value) {
            if (typeof value === "object") {
                ITEMS.forEach((sel) => {
                    for (let j in value) {
                        sel.style[j] = value[j];
                    }
                });
            } else if (typeof value === "string") {
                let style = getComputedStyle(ITEMS[0]);
                return style[value];
            } else if (typeof value === "undefined") {
                return ITEMS[0].getAttribute("style");
            } else {
                makeError(ELE, "css", `"Object", "String", "Undefined"`, value);
            }
            return this;
        },
        valid: function(...value) {
            const valid = {
                email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                phone: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,
                zipcode: /^[0-9]{5}$/,
                upper: /.*[A-Z].*/,
                lower: /.*[a-z].*/,
                numeric: /.*\d.*/,
                special: /.*\W.*/,
            };
            const keys = Object.keys(valid);
            let res = [];
            value.forEach((val) => {
                if (typeof val === "string" && keys.includes(val)) {
                    res.push(RegExp(valid[val]).test(ITEMS[0].value));
                } else {
                    makeError(ELE, "valid", `"Strings"`, val);
                }
            });
            if (res.includes(false)) return false;
            else return true;
        },
        next: function() {
            return XO(ITEMS[0].nextElementSibling);
        },
        prev: function() {
            return XO(ITEMS[0].previousElementSibling);
        },
        parent: function() {
            return XO(ITEMS[0].parentElement);
        },
        on: function(event, callback) {
            if (typeof event === "string") {
                if (typeof callback === "function") {
                    ITEMS.forEach((sel) => {
                        sel.addEventListener(event, callback);
                    });
                } else {
                    makeError(ELE, "on", `"Function"`, callback);
                }
            } else {
                makeError(ELE, "on", `"String"`, event);
            }
            return this;
        },
        hover: function(callback_in, callback_out) {
            if (typeof callback_in === "function") {
                if (typeof callback_out === "function") {
                    ITEMS.forEach((sel) => {
                        sel.addEventListener("mouseover", callback_in);
                        sel.addEventListener("mouseout", callback_out);
                    });
                } else {
                    makeError(ELE, "hover", `"Function"`, callback_out);
                }
            } else {
                makeError(ELE, "hover", `"Function"`, callback_in);
            }
            return this;
        },
        load: function(callback) {
            if (typeof callback === "function") {
                ITEMS.forEach((sel) => {
                    sel.onreadystatechange = callback;
                });
            } else {
                makeError(ELE, "load", `"Function"`, callback);
            }
            return this;
        },
        ready: function(callback) {
            let readyEventHandlersInstalled = false;
            if (typeof callback === "function") {
                ITEMS.forEach((sel) => {
                    if (sel.readyState === "complete") {
                        setTimeout(callback, 1);
                    } else if (!readyEventHandlersInstalled) {
                        if (sel.addEventListener) {
                            sel.addEventListener("DOMContentLoaded", callback, false);
                            window.addEventListener("load", callback, false);
                        } else {
                            sel.attachEvent("onreadystatechange", readyStateChange);
                            window.attachEvent("onload", callback);
                        }
                        readyEventHandlersInstalled = true;
                    }
                });
            } else {
                makeError(ELE, "ready", `"Function"`, callback);
            }
            return this;
        },
        push: function(callback) {
            if (typeof callback === "function") {
                ITEMS.forEach((sel) => {
                    sel.addEventListener("click", callback);
                });
            } else {
                makeError(ELE, "push", `"Function"`, callback);
            }
            return this;
        },
        change: function(callback) {
            if (typeof callback === "function") {
                ITEMS.forEach((sel) => {
                    sel.onchange = callback;
                });
            } else {
                makeError(ELE, "change", `"Function"`, callback);
            }
            return this;
        },
        submit: function(callback) {
            if (typeof callback === "function") {
                ITEMS.forEach((sel) => {
                    sel.onsubmit = callback;
                });
            } else {
                makeError(ELE, "submit", `"Function"`, callback);
            }
            return this;
        },
        each: function(callback) {
            if (typeof callback === "function") {
                ITEMS.forEach((sel) => {
                    callback(sel);
                });
            } else {
                makeError(ELE, "each", `"Function"`, callback);
            }
            return this;
        },
        fadeIn: function(t) {
            if (typeof t === "number" || typeof t === "undefined") {
                ITEMS.forEach((sel) => {
                    setTimeout(() => {
                        XO(sel).css({
                            display: XO(sel).attr("data-display"),
                            transition: `opacity ${t}ms ease`,
                            opacity: "0",
                        });
                        setTimeout(() => {
                            XO(sel).css({
                                opacity: XO(sel).attr("data-opacity"),
                            });
                        }, 1);
                        setTimeout(() => {
                            XO(sel).css({
                                display: "",
                                transition: "",
                                opacity: "",
                            });
                            XO(sel).removeAttr("data-height");
                            XO(sel).removeAttr("data-width");
                            XO(sel).removeAttr("data-display");
                            XO(sel).removeAttr("data-opacity");
                            XO(sel).removeAttr("data-padding-top");
                            XO(sel).removeAttr("data-padding-right");
                            XO(sel).removeAttr("data-padding-bottom");
                            XO(sel).removeAttr("data-padding-left");
                        }, t);
                    }, this.delay);
                });
            } else {
                makeError(ELE, "fadeIn", `"Int", "Undefined"`, t);
            }
            return this;
        },
        fadeOut: function(t) {
            if (typeof t === "number" || typeof t === "undefined") {
                ITEMS.forEach((sel) => {
                    setTimeout(() => {
                        XO(sel).attr({
                            "data-height": XO(sel).css("height"),
                            "data-width": XO(sel).css("width"),
                            "data-display": XO(sel).css("display"),
                            "data-opacity": XO(sel).css("opacity"),
                            "data-padding-top": XO(sel).css("padding-top"),
                            "data-padding-right": XO(sel).css("padding-right"),
                            "data-padding-bottom": XO(sel).css("padding-bottom"),
                            "data-padding-left": XO(sel).css("padding-left"),
                        });
                        XO(sel).css({
                            transition: `opacity ${t}ms ease`,
                        });
                        setTimeout(() => {
                            XO(sel).css({ opacity: "0" });
                        }, 1);
                        setTimeout(() => {
                            XO(sel).css({
                                display: "none",
                                opacity: "",
                            });
                        }, t);
                    }, this.delay);
                });
            } else {
                makeError(ELE, "fadeOut", `"Int", "Undefined"`, t);
            }
            return this;
        },
        fadeToggle: function(t) {
            ITEMS.forEach((sel) => {
                setTimeout(() => {
                    if (XO(sel).css("display") === "none") {
                        XO(sel).fadeIn(t);
                    } else {
                        XO(sel).fadeOut(t);
                    }
                }, this.delay);
            });
            return this;
        },
        slideDown: function(t) {
            if (typeof t === "number" || typeof t === "undefined") {
                ITEMS.forEach((sel) => {
                    setTimeout(() => {
                        XO(sel).css({
                            display: XO(sel).attr("data-display"),
                            transition: `height ${t}ms ease,padding ${t}ms ease`,
                            overflow: "hidden",
                            height: 0,
                            "padding-top": 0,
                            "padding-bottom": 0,
                        });
                        setTimeout(() => {
                            XO(sel).css({
                                height: XO(sel).attr("data-height"),
                                "padding-top": XO(sel).attr("data-padding-top"),
                                "padding-bottom": XO(sel).attr("data-padding-bottom"),
                                "padding-left": XO(sel).attr("data-padding-left"),
                                "padding-right": XO(sel).attr("data-padding-right"),
                            });
                        }, 1);
                        setTimeout(() => {
                            XO(sel).css({
                                display: "",
                                transition: "",
                                overflow: "",
                                height: "",
                                "padding-top": "",
                                "padding-bottom": "",
                                "padding-left": "",
                                "padding-right": "",
                            });
                            XO(sel).removeAttr("data-height");
                            XO(sel).removeAttr("data-width");
                            XO(sel).removeAttr("data-display");
                            XO(sel).removeAttr("data-opacity");
                            XO(sel).removeAttr("data-padding-top");
                            XO(sel).removeAttr("data-padding-right");
                            XO(sel).removeAttr("data-padding-bottom");
                            XO(sel).removeAttr("data-padding-left");
                        }, t);
                    }, this.delay);
                });
            } else {
                makeError(ELE, "slideDown", `"Int", "Undefined"`, t);
            }
            return this;
        },
        slideUp: function(t) {
            if (typeof t === "number" || typeof t === "undefined") {
                ITEMS.forEach((sel) => {
                    setTimeout(() => {
                        XO(sel).attr("data-height", XO(sel).css("height"));
                        XO(sel).attr("data-width", XO(sel).css("width"));
                        XO(sel).attr("data-display", XO(sel).css("display"));
                        XO(sel).attr("data-opacity", XO(sel).css("opacity"));
                        XO(sel).attr("data-padding-top", XO(sel).css("padding-top"));
                        XO(sel).attr("data-padding-right", XO(sel).css("padding-right"));
                        XO(sel).attr("data-padding-bottom", XO(sel).css("padding-bottom"));
                        XO(sel).attr("data-padding-left", XO(sel).css("padding-left"));
                        XO(sel).css({
                            transition: `height ${t}ms ease,padding ${t}ms ease`,
                            overflow: "hidden",
                            height: XO(sel).css("height"),
                        });
                        setTimeout(() => {
                            XO(sel).css({
                                height: "0",
                                "padding-top": "0",
                                "padding-bottom": "0",
                                "padding-left": "0",
                                "padding-right": "0",
                            });
                        }, 1);
                        setTimeout(() => {
                            XO(sel).css({
                                display: "none",
                                transition: "",
                                overflow: "",
                                height: "",
                                "padding-top": "",
                                "padding-bottom": "",
                                "padding-left": "",
                                "padding-right": "",
                            });
                        }, t);
                    }, this.delay);
                });
            } else {
                makeError(ELE, "slideUp", `"Int", "Undefined"`, t);
            }
            return this;
        },
        slideToggle: function(t) {
            ITEMS.forEach((sel) => {
                setTimeout(() => {
                    if (XO(sel).css("display") === "none") {
                        XO(sel).slideDown(t);
                    } else {
                        XO(sel).slideUp(t);
                    }
                }, this.sleep);
            });
            return this;
        },
        show: function(t) {
            if (typeof t === "number" || typeof t === "undefined") {
                ITEMS.forEach((sel) => {
                    setTimeout(() => {
                        XO(sel).css({
                            display: XO(sel).attr("data-display"),
                            transition: `opacity ${t}ms ease,width ${t}ms
							ease,height ${t}ms ease,padding ${t}ms ease`,
                            overflow: "hidden",
                            opacity: "0",
                            width: "0",
                            height: "0",
                            "padding-top": "0",
                            "padding-right": "0",
                            "padding-bottom": "0",
                            "padding-left": "0",
                        });
                        setTimeout(() => {
                            XO(sel).css({
                                opacity: XO(sel).attr("data-opacity"),
                                height: XO(sel).attr("data-height"),
                                width: XO(sel).attr("data-width"),
                                "padding-top": XO(sel).attr("data-padding-top"),
                                "padding-right": XO(sel).attr("data-padding-right"),
                                "padding-bottom": XO(sel).attr("data-padding-bottom"),
                                "padding-left": XO(sel).attr("data-padding-left"),
                            });
                        }, 1);
                        setTimeout(() => {
                            XO(sel).css({
                                display: "",
                                transition: "",
                                overflow: "",
                                opacity: "",
                                width: "",
                                height: "",
                                "padding-top": "",
                                "padding-right": "",
                                "padding-bottom": "",
                                "padding-left": "",
                            });
                            XO(sel).removeAttr("data-height");
                            XO(sel).removeAttr("data-width");
                            XO(sel).removeAttr("data-display");
                            XO(sel).removeAttr("data-opacity");
                            XO(sel).removeAttr("data-padding-top");
                            XO(sel).removeAttr("data-padding-right");
                            XO(sel).removeAttr("data-padding-bottom");
                            XO(sel).removeAttr("data-padding-left");
                        }, t);
                    }, this.delay);
                });
            } else {
                makeError(ELE, "show", `"Int", "Undefined"`, t);
            }
            return this;
        },
        hide: function(t) {
            if (typeof t === "number" || typeof t === "undefined") {
                ITEMS.forEach((sel) => {
                    setTimeout(() => {
                        XO(sel).attr("data-height", XO(sel).css("height"));
                        XO(sel).attr("data-width", XO(sel).css("width"));
                        XO(sel).attr("data-display", XO(sel).css("display"));
                        XO(sel).attr("data-opacity", XO(sel).css("opacity"));
                        XO(sel).attr("data-padding-top", XO(sel).css("padding-top"));
                        XO(sel).attr("data-padding-right", XO(sel).css("padding-right"));
                        XO(sel).attr("data-padding-bottom", XO(sel).css("padding-bottom"));
                        XO(sel).attr("data-padding-left", XO(sel).css("padding-left"));
                        XO(sel).css({
                            transition: `opacity ${t}ms ease,width ${t}ms ease,height ${t}ms ease,padding ${t}ms ease`,
                            height: XO(sel).css("height"),
                            width: XO(sel).css("width"),
                            "padding-top": XO(sel).css("padding-top"),
                            "padding-right": XO(sel).css("padding-right"),
                            "padding-bottom": XO(sel).css("padding-bottom"),
                            "padding-left": XO(sel).css("padding-left"),
                            overflow: "hidden",
                        });
                        setTimeout(() => {
                            XO(sel).css({
                                opacity: "0",
                                padding: "0",
                                height: "0",
                                width: "0",
                            });
                        }, 1);
                        setTimeout(() => {
                            XO(sel).css({
                                display: "none",
                                opacity: "",
                                height: "",
                                width: "",
                                padding: "",
                            });
                        }, t);
                    }, this.delay);
                });
            } else {
                makeError(ELE, "hide", `"Int", "Undefined"`, t);
            }
            return this;
        },
        toggle: function(t) {
            ITEMS.forEach((sel) => {
                setTimeout(() => {
                    if (XO(sel).css("display") === "none") {
                        XO(sel).show(t);
                    } else {
                        XO(sel).hide(t);
                    }
                }, this.delay);
            });
            return this;
        },
        sleep: function(t) {
            this.delay = t;
            return this;
        },
        include: function(page) {
            ITEMS.forEach(async(sel) => {
                const res = await fetch(page);
                const data = await res.text();
                XO(sel).html(data);
            });
            return this;
        },
        index: function(i) {
            return ITEMS[i];
        },
        size: function() {
            return ITEMS.length;
        },
        before: function(e) {
            Target = ITEMS[0];
            Parent = XO(ITEMS[0]).parent().index(0);
            Parent.insertBefore(e, Target);
            return this;
        },
    };
    return XO;
})();

XO.ajax = function({ url, method, data, mode, progress, success, xhr }) {
    let XHR = new XMLHttpRequest();
    if (typeof xhr === "function") {
        xhr(XHR);
    }
    XHR.upload.onprogress = function(e) {
        if (typeof progress === "function") {
            progress(e);
        }
    };
    XHR.onload = function() {
        if (this.status === 200) {
            if (typeof success === "function") {
                success(this.responseText);
            }
        }
    };
    if (typeof method === "undefined" || method.localeCompare("get", undefined, { sensitivity: "accent" }) === 0) {
        method = "GET";
    } else if (method.localeCompare("post", undefined, { sensitivity: "accent" }) === 0) {
        method = "POST";
    }
    let form;
    if (method === "POST") {
        if (data instanceof FormData) {
            form = data;
        } else if (data instanceof Object) {
            form = new FormData();
            for (d in data) {
                form.append(d, data[d]);
            }
        }
    } else if (method === "GET") {
        form = "";
        for (d in data) {
            form += `&${d}=${data[d]}`;
        }
        form = form.substring(1);
        url = url + "?" + form;
        form = "";
    }
    if (typeof mode === "boolean") {
        if (typeof mode === "undefined") {
            mode = true;
        }
    }
    XHR.open(method, url, mode);
    XHR.send(form);
};

XO.fetch = async function({ url, method, data, headers, type }) {
    const methods = ["POST", "GET", "PUT", "DELETE"];
    const types = ["arrayBuffer", "blob", "clone", "formData", "json", "text"];
    if (method && !methods.includes(method.toUpperCase())) {
        throw new Error("method must be one of " + methods.join(", "));
    }
    if (type && !types.includes(type.toLowerCase())) {
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
    if (method && method.toUpperCase() !== "GET") opts.body = data;
    var req = await fetch(url, opts);
    var res = await req[type]();
    return [req, res];
}

XO.uploadBox = function({ selector, type, image }) {
    const name = XO(selector).attr("name");
    const cls = ITEMS.substring(1);
    const el = document.querySelector(`[name='${cls}']`);
    const id = XO(selector).attr("id");
    let Display = "";
    if (typeof image === "string") {
        Display = '<img src="' + image + '">';
    }
    let container = document.createElement("div");
    let content = `
			<input type="file" name="${name}" id="${id}" />
			<span class="uploadbox-display">${Display}</span>
			<span class="uploadbox-trigger"></span>
		`;
    container.setAttribute("class", cls + " uploadbox " + type);
    container.innerHTML = content;
    el.replaceWith(container);
    document.querySelector(`.${cls} span.uploadbox-trigger`).style.display = "none";
    let input = document.querySelector(`#${id}`);
    let display = document.querySelector(`.${cls} .uploadbox-display`);
    let cancel = document.querySelector(`.${cls} span.uploadbox-trigger`);
    input.addEventListener("change", (event) => {
        let image = `<img src="${URL.createObjectURL(event.target.files[0])}">`;
        display.innerHTML = image;
        cancel.style.display = "block";
    });
    cancel.addEventListener("click", function() {
        this.style.display = "none";
        display.innerHTML = Display;
        input.type = "text";
        input.type = "file";
    });
};

XO.getNum = function(string) {
    if (typeof string === "string") {
        return string.match(/\d/g).join("");
    } else {
        throw new Error("you must insert a string");
    }
};

XO.storage = function(name, value) {
    if (typeof name === "string") {
        if (typeof value === "undefined") {
            if (localStorage.getItem(name)) {
                return localStorage.getItem(name);
            } else {
                return false;
            }
        } else {
            localStorage.setItem(name, value);
            return true;
        }
    } else if (typeof name === "object") {
        Object.keys(name).forEach(e => {
            localStorage.setItem(e, name[e]);
        });
    } else {
        throw new Error(`accept String as first argument not ${typeof name}`);
    }
};

XO.removeStorage = function(name) {
    if (typeof name === "string") {
        if (localStorage.removeItem(name)) {
            return true;
        } else {
            return false;
        }
    } else {
        throw new Error(`XO("${selector}").attr(...) accept String as first argument not ${typeof name}`);
    }
};

XO.hasStorage = function(name) {
    if (typeof name === "string") {
        if (localStorage.getItem(name)) {
            return true;
        } else {
            return false;
        }
    } else {
        throw new Error(`XO("${selector}").attr(...) accept String as first argument not ${typeof name}`);
    }
};

XO.session = function(name, value) {
    if (typeof name === "string") {
        if (typeof value === "undefined") {
            if (sessionStorage.getItem(name)) {
                return sessionStorage.getItem(name);
            } else {
                return false;
            }
        } else {
            sessionStorage.setItem(name, value);
            return true;
        }
    } else {
        throw new Error(`XO("${selector}").attr(...) accept String as first argument not ${typeof name}`);
    }
};

XO.removeSession = function(name) {
    if (typeof name === "string") {
        if (sessionStorage.removeItem(name)) {
            return true;
        } else {
            return false;
        }
    } else {
        throw new Error(`XO("${selector}").attr(...) accept String as first argument not ${typeof name}`);
    }
};

XO.hasSession = function(name) {
    if (typeof name === "string") {
        if (sessionStorage.getItem(name)) {
            return true;
        } else {
            return false;
        }
    } else {
        throw new Error(`XO("${selector}").attr(...) accept String as first argument not ${typeof name}`);
    }
};

XO.create = function(ele) {
    if (typeof ele !== "string") {
        throw new Error(`XO.create(...) accept ["String"] not ["${typeof ele}"]`);
    }
    ele = document.createElement(ele);
    return XO(ele);
};

XO.merge = (...a) => {
    var a3 = [];
    for (var i = 0; i < a.length; i++) {
        var l = [];
        a.forEach((s) => {
            l.push(s[i]);
        });
        a3.push(l);
    }
    return a3;
};

XO.isEmpty = function(...vs) {
    var a = [];
    vs.forEach(v => {
        if (XO(v).val().trim() === "") a.push(false)
        else a.push(true)
    })
    if (!a.includes(false)) return true
    else return false
}

export default XO;