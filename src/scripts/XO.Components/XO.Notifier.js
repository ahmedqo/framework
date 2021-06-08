import XOElement from "./XO.Element.js"

export default class extends XOElement {
    static attributes = {
        target: String,
        title: String,
        body: String,
        icon: String,
    }

    static callbacks = {
        attach() {
            if (Notification.permission === "default") {
                Notification.requestPermission().then(p => {
                    if (p === "granted") __notify__(this);
                });
            }
            if (Notification.permission === "granted") __notify__(this);
        },
    }
}

function __notify__(el) {
    var notification = new Notification(el.title, {
        body: el.body,
        icon: el.icon || ""
    });
    if (el.target)
        notification.addEventListener("click", e => {
            location.href = el.target;
        });
}