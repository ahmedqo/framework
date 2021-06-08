export default class {
    constructor(params) {
        this.params = params;
    }

    title(title) {
        document.title = title;
    }

    async render() {
        return "";
    }
}