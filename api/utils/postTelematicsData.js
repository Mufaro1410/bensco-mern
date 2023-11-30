const telematicsDataRaw = require('../model/telematicsRaw')
const telematicsData = require('../model/telematics')
const zonesModel = require('../model/zones')
const clearAPI = require('./apiDelete')

// const postTrucksRaw = async (req, res) => {
    // const data = req.body
// const postTelematicsDataRaw = async (data, id, token) => {
const postTelematicsDataRaw = async (data) => {
    const cleanData = []
    await data.forEach((dataPoint) => {
        if (!dataPoint['zones'].length == 0) {
            cleanData.push(dataPoint)
        }
    })
    await telematicsDataRaw.create(cleanData)
        .then((result) => {
            // clearAPI(id, token)
            // return 'Raw Done!'
        }).catch((error) => {
            console.log(error);
            return error
        }
    )
}

// const postTrucks = async (req, res) => {
    // const newData = req.body
// const postTelematicsData = async (data) => {
const postTelematicsData = async (data, id, token) => {
    const cleanData = []
    const zonesData = []    //new Set()
    const zoneSet = new Set()
    await data.forEach((dataPoint) => {
        if (!dataPoint['zones'].length == 0) {
            cleanData.push(dataPoint)
            const zone = dataPoint['zones']
            if (!zoneSet.has(zone)) {
                zoneSet.add(zone)
                let zonesObject = {}
                zonesObject['zone'] = zone
                zonesObject['address'] = dataPoint['location']['address']
                zonesObject['groupName'] = 'undefined'
                zonesData.push(zonesObject)
            }
        }
    })

    zonesData.forEach(async (objItem) => {
        await zonesModel.findOneAndUpdate(
            { zone: objItem.zone }, 
            { $setOnInsert: { address: objItem.address, groupName: objItem.groupName} }, 
            { upsert: true, new: true, rawResult: true }
        )
    })
    // await telematicsData.create(cleanData)
    await telematicsData.create(cleanData)
        .then((result) => {
            clearAPI(id, token)
        }).catch((error) => {
            console.log(error);
        }
    )
    // console.log('Success!');
}

module.exports = {
    postTelematicsDataRaw,
    postTelematicsData
}