const connectDB = require('../db/connect');
const telematicsData = require('../model/telematics');
const zonesModel = require('../model/zones');
const {postTelematicsDataRaw} = require('./postTelematicsData')
const clearAPI = require('./apiDelete')
const axios = require('axios')

require('dotenv').config();

const start = async () => {
    try {
        connectDB(process.env.MONGO_URI)
        // await benscoModel.deleteMany()
        // await zonesModel.deleteMany()
        for (i=0; i=1; i++) {
            const token = "d259f71a1f1b484e8068842d2fdcac62"
            const getUrl = `https://export.us1.kt1.io/v2/stream?token=${token}`
            axios.get(getUrl)
                .then((response) => {
                    const {items, id} = response.data
                    postTelematicsDataRaw(items)
                    postTelematicsData(items)
                    clearAPI(id, token)
                    // res.status(200).json({msg: 'Successful!!!'})
                }).catch((error) => {
                console.log(`Failed to get data from API!!!`);
                }
            )
        }
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

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
            console.log('data created');
        }).catch((error) => {
            console.log(error);
        }
    )
    // console.log('Success!');
}

start()