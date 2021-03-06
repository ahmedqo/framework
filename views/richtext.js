import initView from "./initView.js"

export default class extends initView {
    constructor(params) {
        super(params);
        this.title("Richtext");
    }

    async render() {
        return await this.compile `templates/richtext.v`;
    }
}