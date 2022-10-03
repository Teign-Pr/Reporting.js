interface Config {
    reportName: string,// report name: what is the report called
    reportFormat: {
        inputType?: string,// inputType: csv, json
        id?: string,// id: Html id
        borderStyle?: string,// borderStyle: {def: block, roof, sides}, {style: add custom style}
        borderColor1?: string,
        borderColor2?: string
    },
    url: string// url: to get the data from
}

const styles : string[]= ['block', 'roof', 'side']

const CreateReport = (inConfig: Partial<Config>): void => {
    var config: Config = initConfig(inConfig);

    const reportFrame = document.getElementById(config.reportFormat.id);

    createHtml(config, reportFrame);

}


const createHtml = (config: Config, frame: HTMLElement): void => {

    const style = config.reportFormat.borderStyle;
    let finalStyle: string
    if(style === styles[0]){
        finalStyle =
            'border-image: linear-gradient(45deg, '+
            config.reportFormat.borderColor1 +
            ', '
            +config.reportFormat.borderColor2+
            ') 1;';
    }else if(style === styles[1]){
        finalStyle =
            'border-image: linear-gradient(to left, '+
            config.reportFormat.borderColor1 +
            ', '
            +config.reportFormat.borderColor2+
            ') 1 0;';
    }else if(style === styles[2]){
        finalStyle =
            'border-image: linear-gradient(to bottom, '+
            config.reportFormat.borderColor1 +
            ', '
            +config.reportFormat.borderColor2+
            ') 0 1;';
    }else{
        finalStyle = style;
    }

    frame.innerHTML = '<div class="border" style="'+finalStyle+'"> </div>'


}



const initConfig = (option?: Partial<Config>): Config => {

    if(option.reportName == null) throw ('Config Error: reportName is missing');
    if (option.url == null) throw ('Config Error: url is missing');

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
}


const test: Config = {
        reportName: 'Test-Report',
        reportFormat: {
            inputType: 'json',
            id: 'report',
            borderStyle: 'block'
        },
        url: 'iris'
};
CreateReport(test);