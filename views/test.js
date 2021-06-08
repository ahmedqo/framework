import initView from "./initView.js"

export default class extends initView {
    constructor(params) {
        super(params);
        this.title("Test");
    }

    async render() {
        return await this.compile `templates/test.v`;
    }
}