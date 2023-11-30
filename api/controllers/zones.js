const zonesModel = require('../model/zones')
const {StatusCodes} = require('http-status-codes')
const {NotFoundError} = require('../errors')

const createZones = async (req, res) => {
    const data = req.body
    await zonesModel.create(data)
        .then(data => {
            res.status(201).json({msg: 'Success!!!'})
        }).catch(error => {
            res.send(error)
        })
    }

const getZones = async (req, res) => {
    const zones = await zonesModel.find()
    res.status(StatusCodes.OK).json({zones, nbHits:zones.length})
}

const getZone = async (req, res) => {
    const {id} = req.params
    const zone = await zonesModel.findById(id)
    if (!zone) {
        throw new NotFoundError(`No zone with id: ${id}`)
    }
    res.status(StatusCodes.OK).json({zone, nbHits:zone.length})
}

const updateZone = async (req, res) => {
    const {id} = req.params
    const body = req.body
    const zone = await zonesModel.findByIdAndUpdate(id, body, {new: true, runValidators: true})
    if (!zone) {
        throw new NotFoundError(`No zone with id: ${id}`)
    }
    res.status(StatusCodes.OK).json({zone})
}

const deleteZone = async (req, res) => {
    const {id} = req.params
    const zone = await zonesModel.findByIdAndDelete(id)
    if (!zone) {
        throw new NotFoundError(`No zone with id: ${id}`)
    }
    res.status(StatusCodes.OK).send('Deleted Successfully')
}

// const deleteZones = async (req, res) => {
//     await zonesModel.deleteMany()
//     res.status(200).send('Deleted Successfully')
// }

module.exports = {
    createZones,
    getZones,
    getZone,
    updateZone,
    deleteZone
}