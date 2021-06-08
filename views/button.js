import initView from "./initView.js"

export default class extends initView {
    constructor(params) {
        super(params);
        this.title("Button");
    }

    async render() {
        return await this.compile `templates/button.v`;
    }
}