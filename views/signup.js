import initView from "./initView.js"

export default class extends initView {
    constructor(params) {
        super(params);
        this.title("Sign Up");
    }

    async render() {
        return await this.compile `templates/signup.v`;
    }
}