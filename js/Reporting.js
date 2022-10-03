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
            'border-image: linear-gradient(45deg, ' +
                config.reportFormat.borderColor1 +
                ', '
                + config.reportFormat.borderColor2 +
                ') 1;';
    }
    else if (style === styles[1]) {
        finalStyle =
            'border-image: linear-gradient(to left, ' +
                config.reportFormat.borderColor1 +
                ', '
                + config.reportFormat.borderColor2 +
                ') 1 0;';
    }
    else if (style === styles[2]) {
        finalStyle =
            'border-image: linear-gradient(to bottom, ' +
                config.reportFormat.borderColor1 +
                ', '
                + config.reportFormat.borderColor2 +
                ') 0 1;';
    }
    else {
        finalStyle = style;
    }
    frame.innerHTML = '<div class="border" style="' + finalStyle + '"> </div>';
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
            borderColor2: option.reportFormat.borderColor2 || 'greenyellow'
        },
        url: option.url
    };
};
var test = {
    reportName: 'Test-Report',
    reportFormat: {
        inputType: 'json',
        id: 'report',
        borderStyle: 'block'
    },
    url: 'iris'
};
CreateReport(test);
//# sourceMappingURL=Reporting.js.map