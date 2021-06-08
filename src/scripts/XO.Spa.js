import XOLoader from "./XO.Components/XO.Loader.js"

customElements.define("xo-loader", XOLoader)

export default class {
    constructor() {
        this.notFound = null;
        this.target = null;
        this.routes = null;
        this.redo = null;
        this.pop = null;
    }

    init() {
        if (!location.hash) location.hash = "#/"
        window.addEventListener("popstate", () => {
            if (typeof this.pop === "function") this.pop()
            this.run();
        });
    }

    async run() {
        const potentialMatches = this.routes.map((route) => {
            return {
                route: route,
                result: location.hash.substring(1).match(this.getPath(route.path)),
            };
        });
        let match = potentialMatches.find((potentialMatch) => potentialMatch.result !== null);
        if (!match) {
            match = {
                route: this.notFound,
                result: [location.hash.substring(1)],
            };
        }
        const view = new match.route.view(this.getParams(match));
        //document.body.insertAdjacentHTML("afterbegin", "<xo-loader fullfield></xo-loader>");
        this.target.innerHTML = "<xo-loader theme='night' global></xo-loader>";
        this.target.innerHTML = await view.render();
        if (typeof match.route.callback === "function") match.route.callback();
        if (typeof this.redo === "function") this.redo();
        //document.querySelector("xo-loader").remove();
    }

    getPath(path) {
        return new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");
    }

    getParams(match) {
        const values = match.result.slice(1);
        const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map((result) => result[1]);

        return Object.fromEntries(
            keys.map((key, i) => {
                return [key, values[i]];
            })
        );
    }

    send(url) {
        var path = location.origin;
        url = url.replace(path, "");
        url = location.origin + location.pathname + "#" + url;
        history.pushState(null, null, url);
        this.run();
    }

    async require({ name, path }) {
        if (!customElements.get(name)) {
            const Element = await (await
                import (`./XO.Components/${path}.js`)).default;
            customElements.define(name, Element);
        }
    }

    async requires(els) {
        await els.forEach(async el => {
            await this.require({ name: el.name, path: el.path })
        });
    }
}