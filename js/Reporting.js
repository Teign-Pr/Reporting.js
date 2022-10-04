var styles = ['block', 'roof', 'side'];
var downloadFormats = ['.csv', '.pdf', '.png', '.html', '.doc'];
var CreateReport = function (inConfig) {
    var config = initConfig(inConfig);
    var reportFrame = document.getElementById(config.reportFormat.id);
    createHtmlHead(config, reportFrame);
};
var createHtmlHead = function (config, frame) {
    var style = config.reportFormat.borderStyle;
    var finalStyle;
    if (style === styles[0]) {
        finalStyle =
            "border-image: linear-gradient(45deg, " + config.reportFormat.borderColor1 + ", " + config.reportFormat.borderColor2 + ") 1;";
    }
    else if (style === styles[1]) {
        finalStyle =
            "border-image: linear-gradient(to left, " + config.reportFormat.borderColor1 + ", " + config.reportFormat.borderColor2 + ") 1 0;";
    }
    else if (style === styles[2]) {
        finalStyle =
            "border-image: linear-gradient(to bottom, " + config.reportFormat.borderColor1 + ", " + config.reportFormat.borderColor2 + ") 0 1;";
    }
    else {
        finalStyle = style;
    }
    frame.innerHTML = "<div class=\"border\" id=\"border\" style=\"" + finalStyle + "\"> </div>";
    var border = document.getElementById("border");
    if (config.reportFormat.text.showTitle) {
        border.innerHTML = "<h3 class=\"grid-title " + config.reportFormat.text.textClass + "\" style=\"font-size: " + config.reportFormat.text.titleSize + "px\">" + config.reportName + "</h3>";
    }
    var inputs = config.prams;
    if (inputs.length > 6) {
        throw ('Config error: To Many Inputs max is 6');
    }
    inputs.forEach(function (n) {
        var inputHtml;
        if (n.dataId == null)
            throw ('Config error: dataId is null on a pram');
        var type = n.type || 'text';
        var css = n.css || '';
        inputHtml = "<lable class=\"grid-container " + config.reportFormat.text.textClass + "\" for=\"" + n.name + "\">" + n.name + "</lable>";
        border.insertAdjacentHTML("beforeend", inputHtml);
        inputHtml = "<input type=\"" + type + "\" id=\"" + n.dataId + "\" name=\"" + n.name + "\" class=\"grid-inputs " + css + "\">";
        border.insertAdjacentHTML("beforeend", inputHtml);
    });
    border.insertAdjacentHTML("beforeend", "<button class=\"grid-button\" id=\"Reporting-Run\">Run</button>"); // Adds RunButton
    document.getElementById("Reporting-Run").addEventListener("click", function (ev) {
        runReport(ev, config);
    });
    var buttons = config.reportFormat.customButton;
    if (buttons != null) {
        buttons.forEach(function (n) {
            var html;
            if (n.name == null)
                throw ('Config Error: Custom Button name is null');
            if (n.onClick == null)
                throw ('Config Error: Custom Button event is null');
            var css = n.css || '';
            html = "<button class=\"" + css + "\" id=\"" + n.name + "\">" + n.name + "</button>";
            border.insertAdjacentHTML('beforeend', html);
            document.getElementById(n.name).addEventListener('click', n.onClick);
        });
    }
    if (config.downloadFormat.indexOf('none') == -1) {
        var html_1;
        html_1 = "<div id=\"reporting-format-div\"></div>";
        border.insertAdjacentHTML('beforeend', html_1);
        var divEle = document.getElementById('reporting-format-div');
        html_1 = "<select id=\"reporting-format\" class=\"grid-inputs\" name=\"reporting-format\"></select>";
        divEle.insertAdjacentHTML('beforeend', html_1);
        html_1 = "<p>Chanice is gay</p>";
        divEle.insertAdjacentHTML('beforeend', html_1);
        var dropdown_1 = document.getElementById("reporting-format");
        if (config.downloadFormat.indexOf('all') == -1) {
            config.downloadFormat.forEach(function (n) {
                html_1 = "<option value=\"" + n + "\">" + n + "</option>";
                dropdown_1.insertAdjacentHTML('beforeend', html_1);
            });
        }
        else {
            downloadFormats.forEach(function (n) {
                html_1 = "<option value=\"" + n + "\">" + n + "</option>";
                dropdown_1.insertAdjacentHTML('beforeend', html_1);
            });
        }
    }
};
var runReport = function (ev, config) {
    var dataString = "?";
    var i = 0;
    config.prams.forEach(function (n) {
        var input = document.getElementById(n.dataId);
        if (i >= config.prams.length - 1) {
            dataString += n.dataId + '=' + (input === null || input === void 0 ? void 0 : input.value);
        }
        else {
            dataString += n.dataId + '=' + (input === null || input === void 0 ? void 0 : input.value) + '&';
        }
        i++;
    });
    //console.log(dataString)
    var response = apiRequest(config.url + dataString);
    var obj = JSON.parse(response);
    config.prams.forEach(function (n) {
        var pram = obj[n.dataId];
    });
};
var initConfig = function (option) {
    if (option.reportName == null)
        throw ('Config Error: reportName is missing');
    if (option.url == null)
        throw ('Config Error: url is missing');
    if (option.prams == null)
        throw ('Config Error: Input Parameters are is missing');
    if (option.output == null)
        throw ('Config Error: Output Fields are missing');
    return {
        reportName: option.reportName,
        reportFormat: {
            inputType: option.reportFormat.inputType || 'json',
            id: option.reportFormat.id || 'report',
            borderStyle: option.reportFormat.borderStyle || 'block',
            borderColor1: option.reportFormat.borderColor1 || 'turquoise',
            borderColor2: option.reportFormat.borderColor2 || 'greenyellow',
            text: {
                textClass: option.reportFormat.text.textClass || '',
                showTitle: option.reportFormat.text.showTitle || false,
                titleSize: option.reportFormat.text.titleSize || 25
            },
            buttonCss: option.reportFormat.buttonCss || '',
            customButton: option.reportFormat.customButton
        },
        url: option.url,
        prams: option.prams,
        downloadFormat: option.downloadFormat || ['all'],
        output: option.output
    };
};
var apiRequest = function (url) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
};
/*
const test: Config = {
        reportName: 'Test-Report',
        reportFormat: {
            inputType: 'json',
            id: 'report',
            borderStyle: 'block',
            text: {
                showTitle: true,
                textClass: ''
            }
        },
        url: 'iris'
};
CreateReport(test);

*/
//# sourceMappingURL=Reporting.js.map