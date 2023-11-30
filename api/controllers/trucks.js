const telematicsDataRaw = require('../model/telematicsRaw')
const telematicsData = require('../model/telematics')
const zonesModel = require('../model/zones')
const trucksModel = require('../model/trucks')
const clearAPI = require('../utils/apiDelete')

const postTrucks = async (req, res) => {
    const trucks = await telematicsData.find().distinct('assetName')
    trucks.forEach(async (truck) => {
        await trucksModel.findOneAndUpdate(
            { assetName: truck }, 
            { $setOnInsert: {} },
            { upsert: true, new: true, rawResult: true }
        )
    })
    res.status(200).json({trucks, nbHits: trucks.length})
}

const getTrucks = async (req, res) => {
    // const trucks = await trucksModel.find()
    // res.status(200).json({data: trucks})

    const {sort, fields} = req.query
    const queryObject = {}
    let result = trucksModel.find(queryObject)
    const trucks = await result.sort('assetName')
    res.status(200).json({trucks, nbHits: trucks.length})
    // if (sort) {
    //     const sortList = sort.split(',').join(' ')
    //     result = result.sort(sortList)
    // } else {
    //     result = result.sort('assetName')
    // }
    // if (fields) {
    //     const fieldsList = fields.split(',').join(' ')
    //     result = result.select(fieldsList)
    // }
}

const getTruck = async (req, res) => {
    const {id} = req.params
    const truck = await trucksModel.findById(id)
    res.status(200).json({data: truck})
    // const {name} = req.params
    // const {sort, fields} = req.query
    // const truckNameObject = {}
    // truckNameObject.assetName = name
    // let result = benscoModel.find(truckNameObject)
    // if (sort) {
    //     const sortList = sort.split(',').join(' ')
    //     result = result.sort(sortList)
    // } else {
    //     result = result.sort('date')
    // }
    // if (fields) {
    //     const fieldsList = fields.split(',').join(' ')
    //     result = result.select(fieldsList)
    // }
    // const data = await result.populate('group', {strictPopulate:false})
    // res.status(200).json({data, nbHits: data.length})
}

const updateTruck = async (req, res) => {
    res.send('working')
    // await benscoModel.deleteMany()
    // res.status(200).send('Deleted Successfully')
}

const deleteTruck = async (req, res) => {
    res.send('working')
    // await benscoModel.deleteMany()
    // res.status(200).send('Deleted Successfully')
}

module.exports = {
    postTrucks,
    getTrucks,
    getTruck,
    updateTruck,
    deleteTruck
}