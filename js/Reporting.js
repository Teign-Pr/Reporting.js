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
            "border-image: linear-gradient(45deg, ".concat(config.reportFormat.borderColor1, ", ").concat(config.reportFormat.borderColor2, ") 1;");
    }
    else if (style === styles[1]) {
        finalStyle =
            "border-image: linear-gradient(to left, ".concat(config.reportFormat.borderColor1, ", ").concat(config.reportFormat.borderColor2, ") 1 0;");
    }
    else if (style === styles[2]) {
        finalStyle =
            "border-image: linear-gradient(to bottom, ".concat(config.reportFormat.borderColor1, ", ").concat(config.reportFormat.borderColor2, ") 0 1;");
    }
    else {
        finalStyle = style;
    }
    frame.innerHTML = "<div class=\"border\" id=\"border\" style=\"".concat(finalStyle, "\"> </div>");
    var border = document.getElementById("border");
    if (config.reportFormat.text.showTitle) {
        border.innerHTML = "<h3 class=\"grid-title ".concat(config.reportFormat.text.textClass, "\" style=\"font-size: ").concat(config.reportFormat.text.titleSize, "px\">").concat(config.reportName, "</h3>");
    }
    var inputs = config.prams;
    if (inputs.length > 6) {
        throw ('Config error: To Many Inputs max is 6');
    }
    inputs.forEach(function (n) {
        var inputHtml;
        var type = n.type || 'text';
        var css = n.css || '';
        inputHtml = "<lable class=\"grid-container ".concat(config.reportFormat.text.textClass, "\" for=\"").concat(n.name, "\">").concat(n.name, "</lable>");
        border.insertAdjacentHTML("beforeend", inputHtml);
        inputHtml = "<input type=\"".concat(type, "\" id=\"").concat(n.name, "\" name=\"").concat(n.name, "\" class=\"grid-inputs ").concat(css, "\">");
        border.insertAdjacentHTML("beforeend", inputHtml);
    });
    border.insertAdjacentHTML("beforeend", "<button class=\"grid-button\" id=\"Reporting-Run\">Run</button>"); // Adds RunButton
    var buttons = config.reportFormat.customButton;
    if (buttons != null) {
        buttons.forEach(function (n) {
            var html;
            if (n.name == null)
                throw ('Config Error: Custom Button name is null');
            if (n.onClick == null)
                throw ('Config Error: Custom Button event is null');
            var css = n.css || '';
            html = "<button class=\"".concat(css, "\" id=\"").concat(n.name, "\">").concat(n.name, "</button>");
            border.insertAdjacentHTML('beforeend', html);
            document.getElementById(n.name).addEventListener('click', n.onClick);
        });
    }
    var html;
    html = "<div></div>";
    border.insertAdjacentHTML('beforeend', html);
    if (config.downloadFormat.indexOf('none') == -1) {
        html = "<select id=\"reporting-format\" name=\"reporting-format\"></select>";
        border.insertAdjacentHTML('beforeend', html);
        var dropdown_1 = document.getElementById("reporting-format");
        if (config.downloadFormat.indexOf('all') == -1) {
            config.downloadFormat.forEach(function (n) {
                html = "<option value=\"".concat(n, "\">").concat(n, "</option>");
                dropdown_1.insertAdjacentHTML('beforeend', html);
            });
        }
        else {
            downloadFormats.forEach(function (n) {
                html = "<option value=\"".concat(n, "\">").concat(n, "</option>");
                dropdown_1.insertAdjacentHTML('beforeend', html);
            });
        }
    }
    else {
        border.insertAdjacentHTML('beforeend', html);
    }
};
var initConfig = function (option) {
    if (option.reportName == null)
        throw ('Config Error: reportName is missing');
    if (option.url == null)
        throw ('Config Error: url is missing');
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
        downloadFormat: option.downloadFormat || ['all']
    };
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