var re = /<\$([\s\S]+?)\$>/g,
    valueExp = /<{(.+?)}>/g,
    filterExp = /<%(.+?)%>/g,
    importExp = /<\[(.+?)]>/g,
    reExp = /(^( )?(if|for|else|switch|case|break|{|}|do|end|else|))([\s\S]*)?/g;

function parse(exp, html, parseAction) {
    var match,
        cursor = 0,
        code = "";
    while (match = exp.exec(html)) {
        code += parseAction(html.slice(cursor, match.index));
        code += parseAction(match[1], true);
        cursor = match.index + match[0].length;
    }
    code += parseAction(html.substr(cursor, html.length - cursor));
    return code;
}

async function include(html) {
    var match, cursor,
        code = [],
        res = [];
    while (match = importExp.exec(html)) {
        code.push(match)
        cursor = match.index + match[0].length;
    }
    for (var i = 0; i < code.length; i++) {
        var data = await request(code[i][1]);
        html = html.replace(code[i][0], data);
        html = await include(html);
    }
    return html;
}

function fixEnd(line) {
    var st = line.replace(/\s/g, "");
    if (st.startsWith("if") || st.startsWith("switch") || st.startsWith("for")) {
        var lp = line.trim().split(" ");
        lp.splice(1, 0, "(");
        lp.splice(lp.length, 0, "){");
        return lp.join(" ");
    } else if (st.startsWith("assign")) {
        var lp = line.trim().split(" ");
        lp.shift();
        lp.splice(0, 0, "var");
        return lp.join(" ") + ";";
    } else if (st.startsWith("log")) {
        var lp = line.trim().split(" ");
        lp.shift();
        lp.splice(0, 0, "console.log(");
        return lp.join(" ") + ");";
    } else {
        return line;
    }
}

function addVariable(line, js) {
    var code = "";
    if (js) code = "r.push(" + line + ");";
    else if (line != "") {
        code = "r.push(`" + line.replace(/"/g, '\\"').replace(/\r\n|\n/g, "") + "`);\n";
    }
    return code;
}

function filterSwitch(cond) {
    var act = cond[0].trim(),
        flt = cond[1].trim().split(":");
    switch (flt[0].trim().toLowerCase()) {
        case "upper":
            cond = "(" + act + ".toUpperCase())";
            break;
        case "lower":
            cond = "(" + act + ".toLowerCase())";
            break;
        case "int":
            cond = "parseInt(" + act + ")";
            break;
        case "float":
            cond = "parseFloat(" + act + ")";
            break;
        case "str":
            cond = "String(" + act + ")";
            break;
        case "bool":
            cond = "Boolean(" + act + ")";
            break;
        case "date":
            cond = "new Date(" + act + ")";
            break;
        case "millis":
            cond = "Date.parse(" + act + ")";
            break;
        case "json":
            cond = "JSON.parse(" + act + ")";
            break;
        case "count":
            cond = "(" + act + ".length)";
            break;
        case "first":
            cond = "(" + act + "[0])";
            break;
        case "last":
            cond = "(" + act + ".pop())";
            break;
        case "unique":
            cond = "([...new Set(" + act + ")])";
            break;
        case "sort":
            cond = "(" + act + ".sort())";
            if (flt[1] !== undefined) {
                if (flt[1].toLowerCase().trim() === "desc") {
                    cond = "(" + cond + ".reverse())";
                }
            }
            break;
        case "join":
            cond = "(" + act + ".join(" + flt[1].trim() + "))";
            break;
        case "split":
            cond = "(" + act + ".split(" + flt[1].trim() + "))";
            break;
        case "clean":
            cond = "(" + act + ".filter(" + flt[1].trim() + "))";
            break;
        case "map":
            cond = "(" + act + ".map(" + flt[1].trim() + "))";
            break;
        case "sum":
            cond = "(" + act + ".reduce((a, b) => a + b, 0))";
            break;
        case "max":
            cond = "(Math.max.apply(Math, " + act + "))";
            break;
        case "min":
            cond = "(Math.min.apply(Math, " + act + "))";
            break;
    }
    return cond;
}

function filter(line, code) {
    if (line.match(filterExp)) {
        var res = filterExp.exec(line);
        var f = res[1].trim().split("|");
        var data = [f[0].replace(/\s+/g, "")];
        var flts = f.slice();
        flts.shift();
        flts.forEach((flt) => {
            data[1] = flt.trim();
            var z = filterSwitch(data);
            data[0] = z;
        });
        if (code) return line.replace(res[0], "${" + data[0] + "}");
        else return line.replace(res[0], data[0]);
    }
    return line;
}

function add(line, js) {
    var code = "";
    if (js) {
        if (line.match(reExp)) {
            line = filter(line);
            line = fixEnd(line);
            line = line.replace(/\bend\b/g, "}");
            line = line.replace(/\belse\b/g, "}else{");
            code += line.replace(/\s+/g, " ") + "\n";
        }
    } else {
        if (line.match(valueExp)) {
            line = filter(line);
            code += parse(valueExp, line, addVariable);
        } else if (line != "") {
            line = filter(line, true);
            code += "r.push(`" + line.replace(/"/g, '\\"').replace(/\r\n|\n/g, "") + "`);\n";
        }
    }
    return code;
}

async function request(page) {
    var req = await fetch(page);
    if (req.status !== 200) return "";
    var res = await req.text();
    return res;
}

async function shape(html) {
    var html = await include(html);
    var code = "var r=[]; var __temp;\n";
    code += parse(re, html, add);
    code += 'return r.join("");';
    code = "with(obj || {}){" + code + "}";
    return code;
}

function render(html, data) {
    return new Function("obj", "ctx", html.replace(/[\r\t\n]/g, "")).call(data, data || {});
}

function html(data) {
    return async function(html) {
        if (html.length === 1) html = html[0]
        html = await shape(html);
        return render(html, data)
    }
}

function style(el) {
    return function(code) {
        if (code.length === 1) code = code[0];
        var style = document.createElement("style"),
            re = /{{(.+?)}}/g,
            cursor = 0,
            css = "",
            match;
        while (match = re.exec(code)) {
            css += code.slice(cursor, match.index);
            css += getComputedStyle(el).getPropertyValue(match[1]).replace("{", "").replace("}", "").trim();
            cursor = match.index + match[0].length;
        }
        css += code.substr(cursor, code.length - cursor)
        style.appendChild(document.createTextNode(css));
        return style
    }
}

export { html, style };