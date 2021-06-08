import initView from "./initView.js"

export default class extends initView {
    constructor(params) {
        super(params);
        this.title("Not Found");
    }

    async render() {
        return await this.compile `templates/notFound.v`;
    }
}