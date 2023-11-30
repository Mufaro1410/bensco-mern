const fs = require('fs')
const rawData = require('../../../data/H27 (KM 26 PB GP )_raw.json')

// selecting required variables (date, location, zones, assertId, assetName) from API data
const dataCleaning = async (data) => {
    const cleanData = Array()
    await data.forEach((item) => {
        newItem = item
        delete newItem['_id']
        delete newItem['newDate']
        delete newItem['requestId']
        delete newItem['request_id']
        cleanData.push(newItem)
    })
    console.log(cleanData.length);
    writeToFile('newData.json', cleanData)
}


// creating a json file
function writeToFile(path, content) {
    fs.appendFile(path, JSON.stringify(content), err => {
        if (err) throw err;
        console.log('complete');
    })
}

dataCleaning(rawData)

module.exports = dataCleaning