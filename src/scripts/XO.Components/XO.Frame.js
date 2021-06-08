import XOElement from "./XO.Element.js"

export default class extends XOElement {
    static attributes = {
        url: String,
        change(n, v) {
            switch (n) {
                case "url":
                    fetch(v).then(async(res) => {
                        res = await res.text();
                        this.query("main").innerHTML = res;
                    }).catch(err => {
                        console.log(err);
                        this.query("main").innerHTML = "";
                    });
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
            box-sizing: content-box !important;
            display: inline-block;
            width: 300px;
            height: 200px;
        }
        /* container */
        main {
            overflow: auto;
            display: flex;
            width: 100%;
            height: 100%;
        }
    `

    render() {
        return /*html*/ `
            <main></main>
        `;
    }
}