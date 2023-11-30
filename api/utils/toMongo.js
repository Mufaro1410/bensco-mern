const express = require('express')
const app = express()
const mongoose = require('mongoose')

const newTeleData = require('./newData.json')
// const newTeleData = require('./H02.json')
const zonesModel = require('../model/zones')
const telematicsData = require('../model/telematics')

const uri = process.env.MongoURI
const connectDB = (uri) => {
    // mongoose.createConnection(uri)
    mongoose.connect(uri)
}
const port = 5001

// const postTrucks = async (req, res) => {
// const newData = req.body
// const postTelematicsData = async (data, id, token) => {
const postTelematicsData = async (data) => {
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
            // clearAPI(id, token)
        }).catch((error) => {
            console.log(error);
        }
    )
    console.log('Success!');
}

const start = async () => {
    try {
        connectDB(uri)
        app.listen(port, console.log(`Server listening on port ${port}`))
        await postTelematicsData(newTeleData)
    } catch (error) {
        console.log(error);
    }
}

start()