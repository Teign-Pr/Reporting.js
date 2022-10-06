// TODO Add JQuery
// TODO Work on css
// TODO Downloads https://www.encodedna.com/javascript/convert-html-table-to-pdf-using-javascript-without-a-plugin.htm
interface Config {
    reportName: string,// report name: what is the report called
    reportFormat: {
        inputType?: string,// inputType: csv, json
        id?: string,// id: Html id
        borderStyle?: string,// borderStyle: {def: block, roof, sides}, {style: add custom style}
        borderColor1?: string,
        borderColor2?: string,
        text: {
            textClass?: string,
            showTitle?: boolean, // hide title
            titleSize?: number
        },
        table?: {
            headerClass?: string,
            bodyClass?: string
        }
        buttonCss?: string,
        customButton?: CustomButton[]
    },
    url: string, // url: to get the data from
    prams?: Parameter[], // prams: inputs
    downloadFormat?: string[], // File format
    output: string[][] // Json Headers {dataset} {header1, header2}
}

interface Parameter {
    name: string, // Parameter Name
    type?: string, // HTML input types
    css?: string,
    dataId: string
}


interface CustomButton {
    name: string, // Button Name
    css?: string,
    onClick: (this:HTMLElement, ev:MouseEvent) => any // Click Event
}

const styles : string[]= ['block', 'roof', 'side']

const downloadFormats: string[] = ['.csv', '.pdf', '.png', '.html', '.doc']

const CreateReport = (inConfig: Partial<Config>): void => {
    var config: Config = initConfig(inConfig);

    const reportFrame = document.getElementById(config.reportFormat.id);
    createHtmlHead(config, reportFrame);

}


const createHtmlHead = (config: Config, frame: HTMLElement): void => {

    const style: string = config.reportFormat.borderStyle;
    let finalStyle: string;
    if(style === styles[0]){
        finalStyle =
            `border-image: linear-gradient(45deg, ${config.reportFormat.borderColor1}, ${config.reportFormat.borderColor2}) 1;`;
    }else if(style === styles[1]){
        finalStyle =
            `border-image: linear-gradient(to left, ${config.reportFormat.borderColor1}, ${config.reportFormat.borderColor2}) 1 0;`;
    }else if(style === styles[2]){
        finalStyle =
            `border-image: linear-gradient(to bottom, ${config.reportFormat.borderColor1}, ${config.reportFormat.borderColor2}) 0 1;`;
    }else{
        finalStyle = style;
    }

    frame.innerHTML = `<div class="border" id="border" style="${finalStyle}"> </div>`


    const border: HTMLElement = document.getElementById("border")
    if(config.reportFormat.text.showTitle) {
        border.innerHTML = `<h3 class="grid-title ${config.reportFormat.text.textClass}" style="font-size: ${config.reportFormat.text.titleSize}px">${config.reportName}</h3>`
    }

    if(config.prams != null && config.prams.length > 0) {
        const inputs: Parameter[] = config.prams;
        if (inputs.length > 6) {
            throw ('Config error: To Many Inputs max is 6')
        }

        inputs.forEach(n => {
            let inputHtml: string;
            if (n.dataId == null) throw ('Config error: dataId is null on a pram')
            const type = n.type || 'text'
            const css = n.css || ''

            inputHtml = `<lable class="grid-container ${config.reportFormat.text.textClass}" for="${n.name}">${n.name}</lable>`
            border.insertAdjacentHTML("beforeend", inputHtml)
            inputHtml = `<input type="${type}" id="${n.dataId}" name="${n.name}" class="grid-inputs ${css}">`
            border.insertAdjacentHTML("beforeend", inputHtml)
        })
    }

    border.insertAdjacentHTML("beforeend", `<button class="grid-button" id="Reporting-Run">Run</button>`) // Adds RunButton

    document.getElementById("Reporting-Run").addEventListener("click", (ev) => {
        runReport(ev, config);
    })

    const buttons: CustomButton[] = config.reportFormat.customButton;

    if(buttons != null) {
        buttons.forEach(n => { // Creates Custom Buttons
            let html: string;
            if (n.name == null) throw ('Config Error: Custom Button name is null')
            if (n.onClick == null) throw ('Config Error: Custom Button event is null')
            const css = n.css || ''


            html = `<button class="${css}" id="${n.name}">${n.name}</button>`
            border.insertAdjacentHTML('beforeend', html)

            document.getElementById(n.name).addEventListener('click', n.onClick)
        })
    }

    if(config.downloadFormat.indexOf('none') == -1){
        let html: string;
        html = `<div id="reporting-format-div"></div>`
        border.insertAdjacentHTML('beforeend', html)

        const divEle: HTMLElement = document.getElementById('reporting-format-div')
        html = `<button class="grid-button">Download</button>`
        divEle.insertAdjacentHTML('beforeend', html)

        html = `<select id="reporting-format" class="grid-inputs" name="reporting-format"></select>`

        divEle.insertAdjacentHTML('beforeend', html)

        let dropdown: HTMLElement = document.getElementById("reporting-format")

        if(config.downloadFormat.indexOf('all') == -1){
            config.downloadFormat.forEach(n => {
                html = `<option value="${n}">${n}</option>`
                dropdown.insertAdjacentHTML('beforeend', html)
            })
        }
        else{
            downloadFormats.forEach(n => {
                html = `<option value="${n}">${n}</option>`
                dropdown.insertAdjacentHTML('beforeend', html)
            })
        }
    }
}


const runReport = (ev: MouseEvent, config: Config): void => {

    let dataString: string = "?";
    let i: number = 0;
    config.prams.forEach(n => {
        const input = document.getElementById(n.dataId) as HTMLInputElement | null;
        if (i >= config.prams.length - 1) {
            dataString += n.dataId + '=' + input?.value;
        } else {
            dataString += n.dataId + '=' + input?.value + '&';
        }
        i++;
    })


    const response: string = apiRequest(config.url + dataString)

    const obj = JSON.parse(response)

    const mainObj = obj[config.output[0][0]]

    createTabled(mainObj, config)



}


const createTabled = (dataset: any, config: Config): void => {
    let html: string = '<div class="reporting-format-div" id="reporting-table"></div>'

    if (document.getElementById("reporting-table") == null) {
        document.getElementById("border").insertAdjacentHTML('beforeend', html)
    }

    let div: HTMLElement = document.getElementById("reporting-table")

    while (div.firstChild) {
        div.removeChild(div.firstChild)
    }

    html = '<table class="report-table" id="report-table-2"></table>'
    document.getElementById("reporting-table").insertAdjacentHTML('beforeend', html)
    html = `<thead id="report-table-thead"></thead>`
    document.getElementById("report-table-2").insertAdjacentHTML('beforeend', html)
    html = '<tr id="report-table-head"></tr>'
    document.getElementById("report-table-thead").insertAdjacentHTML('beforeend', html)

    let tableHead: HTMLElement = document.getElementById("report-table-head")

    config.output[1].forEach(n => {
        html = `<th>${n}</th>`
        tableHead.insertAdjacentHTML('beforeend', html)
    })
    let idNum: number = 0;
    dataset.forEach(n => {
        html = '<tr id="report-table-body-' + idNum + '"></tr>'
        document.getElementById("report-table-2").insertAdjacentHTML('beforeend', html)
        config.output[1].forEach(x => {
            html = `<td>${n[x]}</td>`
            document.getElementById("report-table-body-" + idNum).insertAdjacentHTML('beforeend', html)
        })
        idNum++;
    })
}




const createPDF = (): void => {
    let table: string = document.getElementById("reporting-table").innerHTML


    let style = "<style>";
    style = style + "table {width: 100%;font: 17px Calibri;}";
    style = style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;";
    style = style + "padding: 2px 3px;text-align: center;}";
    style = style + " thead { background-color: #333;color: white;}"
    style = style + "</style>";

    const win = window.open('', '', 'height=700,width=700');

    win.document.write('<html><head>');
    win.document.write(style);          // ADD STYLE INSIDE THE HEAD TAG.
    win.document.write('</head>');
    win.document.write('<body>');
    win.document.write(table);         // THE TABLE CONTENTS INSIDE THE BODY TAG.
    win.document.write('</body></html>');

    win.document.close(); 	// CLOSE THE CURRENT WINDOW.

    win.print();    // PRINT THE CONTENTS.
}




const initConfig = (option?: Partial<Config>): Config => {

    if(option.reportName == null) throw ('Config Error: reportName is missing');
    if (option.url == null) throw ('Config Error: url is missing');
    if(option.prams == null) throw ('Config Error: Input Parameters are is missing')
    if(option.output == null) throw ('Config Error: Output Fields are missing')

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
            table:{
                headerClass: option.reportFormat.table.headerClass || '',
                bodyClass: option.reportFormat.table.bodyClass || ''
            } || {},
            buttonCss: option.reportFormat.buttonCss || '',
            customButton: option.reportFormat.customButton
        },
        url: option.url,
        prams: option.prams || [],
        downloadFormat: option.downloadFormat || ['all'],
        output: option.output
    };
}

const apiRequest = (url: string): string => {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false);
    xmlHttp.send();
    return xmlHttp.responseText;
}

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
