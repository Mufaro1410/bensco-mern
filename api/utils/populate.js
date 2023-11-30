const connectDB = require('../db/connect');
const benscoModel = require('../model/benscoData');
const zonesModel = require('../model/zones');
const mergedData = require('./dataFiles/cleanMergedData.json');

require('dotenv').config();

const start = async () => {
    try {
        connectDB(process.env.MONGO_URI)
        // await benscoModel.deleteMany()
        // await zonesModel.deleteMany()
        const cleanData = []
        const zonesData = new Set()
        mergedData.forEach((dataPoint) => {
            if (!dataPoint['zones'].length == 0) {
                zonesData.add(dataPoint['location']['address'])
                cleanData.push(dataPoint)
            }
        })
        const zonesArray = []
        zonesData.forEach(item => {
            const zonesObject = {}
            zonesObject['address'] = item
            zonesObject['groupName'] = 'undefined'
            zonesArray.push(zonesObject)
        })
        await zonesModel.create(zonesArray)
        await benscoModel.create(cleanData)
        console.log('SUCCESS!!!')
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

start()