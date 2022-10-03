const CreateReport = (config: object) => {

    if(config['reportName'] == null){
        throw ('Config Error: reportName is missing')
    }
    if(config['reportFormat'] == null){
        throw ('Config Error: reportFormat is missing')
    }
    if(config['url'] == null){
        throw ('Config Error: url is missing')
    }

    if(config['reportFormat']['type'] == null){
        config['reportFormat']['type'] = "json"
    }
    if(config['reportFormat']['id'] == null){
        config['reportFormat']['id'] = "report"
    }


    const reportFrame = document.getElementById(config['reportFormat']['id'])

    createHtml(config, reportFrame)

}


function createHtml(config: object, frame: HTMLElement){
    frame.innerHTML = '<div class="border" style=""> </div>'
}


const test = {
    reportName: 'Test-Report', // report name: what is the report called
    reportFormat: {
        type: 'json', // types: csv, json
        id: 'report', // id: Html id
    },
    url: 'iris' // url: to get the data from
}
CreateReport(test)