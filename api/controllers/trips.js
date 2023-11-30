const tripsModel = require('../model/trips')
const telematicsModel = require('../model/telematics')
const {StatusCodes} = require('http-status-codes')
const {NotFoundError} = require('../errors')
const tripProcessor = require('../utils/tripProcessor')
// const tripProcessor = require('../utils/tripsP')

// {
//     "name": "H24 (FV 96 BT GP)"
//     // "sort": "date",
//     // "fields": "date,assetName,zones,location,group"
// }

const createTrips = async (req, res) => {    
    const {name, sort, fields} = req.body
    const queryObject = {}
    queryObject.assetName = name
    let result = telematicsModel.find(queryObject).lean()
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
    // const data = await result.populate('group', {strictPopulate:false})
    const data = await result.populate('group', {strictPopulate:false})
    // return res.status(StatusCodes.CREATED).json({'data': data, nbHIts: data.length})
    const trips = await tripProcessor(data, name)
    trips.forEach(async (trip) => {
        await tripsModel.findOneAndUpdate(
            { tripName: trip.tripName }, 
            { $setOnInsert: {truckName: trip.truckName, tripDirection: trip.tripDirection, startingPoint: trip.startingPoint,
                endingPoint: trip.endingPoint,startDate: trip.startDate, endDate: trip.endDate, tripDuration: trip.tripDuration, 
                zones: trip.zones}
            },
            { upsert: true, new: true, rawResult: true }
        )
    })
    // tripsModel.create(trips)
    return res.status(StatusCodes.CREATED).json({'trips': trips})
}
    
const getTrips = async (req, res) => {
    const {name, sort} = req.query
    const queryObject = {}
    queryObject['truckName'] = name
    let result = tripsModel.find(queryObject)
    const trips = await result.sort('startDate')
    // if (!trips) {
    //     throw new NotFoundError(`No trips found`)
    // }
    res.status(StatusCodes.OK).json({trips, nbHits:trips.length})
}

const getTrip = async (req, res) => {
    const {id} = req.params
    const trip = await tripsModel.findById(id)
    if (!trip) {
        throw new NotFoundError(`No trip with id: ${id}`)
    }
    res.status(StatusCodes.OK).json({trip, nbHits:trip.length})
}

const updateTrip = async (req, res) => {
    // const {id} = req.params
    // const body = req.body
    // const zone = await tripsModel.findByIdAndUpdate(id, body, {new: true, runValidators: true})
    // if (!zone) {
    //     throw new NotFoundError(`No zone with id: ${id}`)
    // }
    // res.status(StatusCodes.OK).json({zone})
    res.status(201).json({msg: 'Update Trip'})
}

const deleteTrip = async (req, res) => {
    // const {id} = req.params
    // const zone = await tripsModel.findByIdAndDelete(id)
    // if (!zone) {
    //     throw new NotFoundError(`No zone with id: ${id}`)
    // }
    // res.status(StatusCodes.OK).send('Deleted Successfully')
    res.status(201).json({msg: 'Delete Trip'})
}

module.exports = {
    createTrips,
    getTrips,
    getTrip,
    updateTrip,
    deleteTrip
}