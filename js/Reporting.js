var styles = ['block', 'roof', 'side'];
var CreateReport = function (inConfig) {
    var config = initConfig(inConfig);
    var reportFrame = document.getElementById(config.reportFormat.id);
    createHtml(config, reportFrame);
};
var createHtml = function (config, frame) {
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
        border.innerHTML = "<h3 class=\"".concat(config.reportFormat.text.textClass, "\" style=\"font-size: ").concat(config.reportFormat.text.titleSize, "px\">").concat(config.reportName, "</h3>");
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
            }
        },
        url: option.url
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