import XO from "../src/scripts/XO.js";
import initView from "./initView.js"

export default class extends initView {
    constructor(params) {
        super(params);
        this.title("Home");
    }

    async render() {
        XO.storage({
            firstname: "Ahmed",
            lastname: "Qoreichi",
            birth: "1995-09-04",
            nationality: "Morrocan",
            address: "04 Nador street avenue Mohammdie",
            city: "Youssoufia",
            zipcode: "46300",
            country: "Morocco",
            email: "ahmedqo1995@gmail.com",
            phone: "+212679719118",
            bio: "Consultant social-média et formateur depuis 2011, je vous accompagne dans votre projet de formation individuelle & sur mesure."
        });
        return await this.compile(`templates/Home.v`, {
            name: {
                first: XO.storage("firstname"),
                last: XO.storage("lastname"),
            },
            birth: XO.storage("birth"),
            nationality: XO.storage("nationality"),
            local: {
                address: XO.storage("address"),
                city: XO.storage("city"),
                zipcode: XO.storage("zipcode"),
                country: XO.storage("country"),
            },
            email: XO.storage("email"),
            phone: XO.storage("phone"),
            bio: XO.storage("bio")
        });
    }
}