var CreateReport = function (config) {
    if (config['reportName'] == null) {
        throw ('Config Error: reportName is missing');
    }
    if (config['reportFormat'] == null) {
        throw ('Config Error: reportFormat is missing');
    }
    if (config['url'] == null) {
        throw ('Config Error: url is missing');
    }
    if (config['reportFormat']['type'] == null) {
        config['reportFormat']['type'] = "json";
    }
    if (config['reportFormat']['type'] == null) {
        config['reportFormat']['id'] = "report";
    }
    console.log(config["reportName"]);
    console.log(config['reportFormat']['type']);
};
var test = {
    reportName: 'Test-Report',
    reportFormat: {
        type: 'json',
        id: 'report', // id: Html id
    },
    url: 'iris' // Url to get the data from
};
CreateReport(test);
//# sourceMappingURL=Reporting.js.map