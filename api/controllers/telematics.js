const axios = require('axios')

const telematicsData = require('../model/telematics')
// const telematicsDataRaw = require('../model/telematicsRaw')
// const dataCleaning = require('../utils/dataCleaning')
const {postTelematicsDataRaw, postTelematicsData} = require('../utils/postTelematicsData')

// const getPostRawDataToData = async (req, res) => {
    // const data = await telematicsDataRaw.find()
    // const cleanData = Array()
    // data.forEach((item) => {
    //     // newItem = item
    //     delete item['_id']
    //     delete item['__v']
    //     cleanData.push(item)
    // })
    // // await dataCleaning(data)
    // // res.status(200).json({data, nbHits: data.length})
    // await postTelematicsData(cleanData)
    // res.send('done')
// }

// const getPostTelematicsData = async (req, res) => {
//   const {token} = req.body
//   const getUrl = `https://export.us1.kt1.io/v2/stream?token=${token}`
//   axios.get(getUrl)
//     .then((response) => {
//         const {items, id} = response.data
//         postTelematicsDataRaw(items)
//         postTelematicsData(items, id, token)
//         res.status(200).json({msg: 'Successful!!!'})
//     }).catch((error) => {
//       res.send(`Failed at API!!!, ${error}`);
//     }
//   )
// }

async function getPostTelematicsData(req, res) {
    while (true) {
        console.log('fetching data...');
        const [stopFetching, count] = await getData(req, res)
        if (stopFetching) {
            console.log(count);
            break
        }
    }
}
  
async function getData(req, res) {
    const count = 0
    const {token} = req.body
    const url = `https://export.us1.kt1.io/v2/stream?token=${token}`
    try {
        const response = await axios.get(url)
        const {items, id} = response.data
        if (id) {
            await postTelematicsDataRaw(items)
            await postTelematicsData(items, id, token)
            count += 1
            // console.log(`fetching..., ${count}`);
            return [false, count];
        } else {
            console.log(count);
            return [true, count];
        }
    } catch (err) {
        res.send(`Error fetching data, ${count}`);
        return [true, count];
    }
}

const getTelematics = async (req, res) => {
    const {sort, fields} = req.query
    const queryObject = {}
    let result = telematicsData.find(queryObject)
    if (sort) {
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    } else {
        result = result.sort('date')
    }
    if (fields) {
        const fieldsList = fields.split(',').join(' ')
        result = result.select(fieldsList)
    }
    const data = await result.populate('group', {strictPopulate:false})
    res.status(200).json({data, nbHits: data.length})
}

const getTelematic = async (req, res) => {
    const {name} = req.params
    const {sort, fields} = req.query
    const truckNameObject = {}
    truckNameObject.assetName = name
    let result = telematicsData.find(truckNameObject)
    if (sort) {
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    } else {
        result = result.sort('date')
    }
    if (fields) {
        const fieldsList = fields.split(',').join(' ')
        result = result.select(fieldsList)
    }
    const data = await result.populate('group', {strictPopulate:false})
    res.status(200).json({data, nbHits: data.length})
}

const deleteTelematics = async (req, res) => {
    await telematicsData.deleteMany()
    res.status(200).send('Deleted Successfully')
}

module.exports = {
    // getPostRawDataToData,
    getPostTelematicsData,
    getTelematics,
    getTelematic,
    deleteTelematics
}