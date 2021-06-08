import initView from "./initView.js"

export default class extends initView {
    constructor(params) {
        super(params);
        this.title("Sign In");
    }

    async render() {
        return await this.compile `templates/signin.v`;
    }
}