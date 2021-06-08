import initView from "./initView.js"

export default class extends initView {
    constructor(params) {
        super(params);
        this.title("Card");
    }

    async render() {
        return await this.compile `templates/card.v`;
    }
}