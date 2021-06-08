import AbstractView from "../src/scripts/XO.AbstractView.js"
import { html } from "../src/scripts/XO.Engine.js"

export default class extends AbstractView {
    constructor(params) {
        super(params)
    }

    async compile(page, data) {
        return await html(data || {})("<[ " + page + " ]>");
    }
}