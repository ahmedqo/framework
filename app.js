import XOSearch from "./src/scripts/XO.Components/XO.Search.js"
import SPA from "./src/scripts/XO.Spa.js"
import XO from "./src/scripts/XO.js";
customElements.define("xo-search", XOSearch);
window.spa = new SPA();
window.XO = XO;

import Accordion from "./views/accordion.js"
import Alert from "./views/alert.js"
import Badge from "./views/badge.js"
import Box from "./views/box.js"
import Button from "./views/button.js"
import Card from "./views/card.js"
import Charts from "./views/charts.js"
import Home from "./views/home.js"
import NavBar from "./views/navbar.js"
import NotFound from "./views/notFound.js"
import Progress from "./views/progress.js"
import Range from "./views/range.js"
import Richtext from "./views/richtext.js"
import Signin from "./views/signin.js"
import Signup from "./views/signup.js"
import Slider from "./views/slider.js"
import Switch from "./views/switch.js"
import Test from "./views/test.js"
import Textbox from "./views/textfield.js"

spa.target = document.querySelector("xo-app");

spa.routes = [{
    path: "/accordion",
    view: Accordion,
    callback: async() => {
        await spa.require({ name: "xo-accordion", path: "XO.AccordionItem" });
    }
}, {
    path: "/alert",
    view: Alert,
    callback: async() => {
        await spa.require({ name: "xo-alert", path: "XO.Alert" })
    }
}, {
    path: "/badge",
    view: Badge,
    callback: async() => {
        await spa.require({ name: "xo-badge", path: "XO.Badge" })
    }
}, {
    path: "/box",
    view: Box,
    callback: async() => {
        await spa.require({ name: "xo-box", path: "XO.Box" })
    }
}, {
    path: "/button",
    view: Button,
    callback: async() => {
        await spa.require({ name: "xo-button", path: "XO.Button" })
    }
}, {
    path: "/card",
    view: Card,
    callback: async() => {
        await spa.require({ name: "xo-card", path: "XO.Card" })
    }
}, {
    path: "/charts",
    view: Charts,
    callback: async() => {
        await spa.require({ name: "xo-gridchart", path: "XO.GridChart" });
        await spa.require({ name: "xo-piechart", path: "XO.PieChart" });
        await spa.require({ name: "xo-radarchart", path: "XO.RadarChart" });

        function run() {
            var data = [
                { label: "Label 01", value: Math.floor(Math.random() * 11) },
                { label: "Label 02", value: Math.floor(Math.random() * 11) },
                { label: "Label 03", value: Math.floor(Math.random() * 11) },
                { label: "Label 04", value: Math.floor(Math.random() * 11) },
                { label: "Label 05", value: Math.floor(Math.random() * 11) },
            ];
            query("xo-gridchart").forEach(c => {
                c.offset = [80, 150];
                c.data = data;
                c.update();
            });
            query("xo-piechart").forEach(c => {
                c.data = data;
                c.update();
            })
            query("xo-radarchart").data = data;
            query("xo-radarchart").update();
        }
        run();
        document.addEventListener("keyup", e => {
            if (e.keyCode === 13) run();
        });
    }
}, {
    path: "/",
    view: Home,
    callback: async() => {
        await spa.require({ name: "xo-textbox", path: "XO.TextBox" });
        await spa.require({ name: "xo-textarea", path: "XO.TextArea" });
        await spa.require({ name: "xo-button", path: "XO.Button" });
    }
}, {
    path: "/navbar",
    view: NavBar,
    callback: async() => {
        await spa.require({ name: "xo-navbar", path: "XO.NavBar" });
        await spa.require({ name: "xo-navbar-item", path: "XO.NavBarItem" });
    }
}, {
    path: "/progress",
    view: Progress,
    callback: async() => {
        await spa.require({ name: "xo-progress", path: "XO.Progress" })
    }
}, {
    path: "/range",
    view: Range,
    callback: async() => {
        await spa.require({ name: "xo-range", path: "XO.Range" });
        await spa.require({ name: "xo-rate", path: "XO.Rate" });
    }
}, {
    path: "/richtext",
    view: Richtext,
    callback: async() => {
        await spa.require({ name: "xo-richtext", path: "XO.RichText" })
    }
}, {
    path: "/signin",
    view: Signin,
    callback: async() => {
        await spa.require({ name: "xo-icon", path: "XO.Icon" });
        await spa.require({ name: "xo-textbox", path: "XO.TextBox" });
        await spa.require({ name: "xo-password", path: "XO.Password" });
        await spa.require({ name: "xo-button", path: "XO.Button" });
    }
}, {
    path: "/signup",
    view: Signup,
    callback: async() => {
        await spa.require({ name: "xo-icon", path: "XO.Icon" });
        await spa.require({ name: "xo-textbox", path: "XO.TextBox" });
        await spa.require({ name: "xo-password", path: "XO.Password" });
        await spa.require({ name: "xo-textarea", path: "XO.textarea" });
        await spa.require({ name: "xo-button", path: "XO.Button" });
    }
}, {
    path: "/slider",
    view: Slider,
    callback: async() => {
        await spa.require({ name: "xo-slider", path: "XO.Slider" });
        await spa.require({ name: "xo-slider-item", path: "XO.SliderItem" });
    }
}, {
    path: "/switch",
    view: Switch,
    callback: async() => {
        await spa.require({ name: "xo-switch", path: "XO.Switch" });
        await spa.require({ name: "xo-switch-group", path: "XO.SwitchGroup" });
    }
}, {
    path: "/test",
    view: Test,
    callback: async() => {
        await spa.require({ name: "xo-dropdown", path: "XO.DropDown" });
        await spa.require({ name: "xo-modal", path: "XO.Modal" });
        await spa.require({ name: "xo-video", path: "XO.Video" });
        await spa.require({ name: "xo-notifier", path: "XO.Notifier" });
        await spa.require({ name: "xo-frame", path: "XO.Frame" });
        await spa.require({ name: "xo-audio", path: "XO.Audio" });
        await spa.require({ name: "xo-dragger", path: "XO.Dragger" });
        await spa.require({ name: "xo-timer", path: "XO.Timer" });
    }
}, {
    path: "/textfield",
    view: Textbox,
    callback: async() => {
        await spa.require({ name: "xo-textbox", path: "XO.TextBox" });
        await spa.require({ name: "xo-textarea", path: "XO.TextArea" });
        await spa.require({ name: "xo-password", path: "XO.Password" });
        await spa.require({ name: "xo-select", path: "XO.Select" });
        await spa.require({ name: "xo-select-item", path: "XO.SelectItem" });
        await spa.require({ name: "xo-calendar", path: "XO.Calendar" });
        await spa.require({ name: "xo-time", path: "XO.Time" });
        await spa.require({ name: "xo-file", path: "XO.File" });
        await spa.require({ name: "xo-color", path: "XO.Color" });
    }
}, ];

spa.notFound = {
    path: "/404/",
    view: NotFound,
};

document.addEventListener("DOMContentLoaded", async() => {
    await spa.require({ name: "xo-icon", path: "XO.Icon" });
    await spa.require({ name: "xo-navbar", path: "XO.NavBar" });
    await spa.require({ name: "xo-navbar-item", path: "XO.NavBarItem" });
    spa.init();
    spa.run();
});


window.query = (el) => {
    var el = document.querySelectorAll(el);
    if (el.length > 1) return el;
    return el[0];
}