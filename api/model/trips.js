// const { Decimal128 } = require('mongodb')
const mongoose = require('mongoose')

const tripsSchema = new mongoose.Schema({
    truckName: String,
    tripName: {type: String, unique: true},
    tripDirection: String,
    startingPoint: String,
    endingPoint: String,
    startDate: Date,
    endDate: Date,
    tripDuration: String,
    zones: []
    
}, {timestamps: true})

module.exports = mongoose.model('Trips', tripsSchema)