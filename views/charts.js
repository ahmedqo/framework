import initView from "./initView.js"

export default class extends initView {
    constructor(params) {
        super(params);
        this.title("Charts");
    }

    async render() {
        return await this.compile `templates/charts.v`;
    }
}