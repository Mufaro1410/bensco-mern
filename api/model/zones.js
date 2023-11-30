const mongoose = require('mongoose')

const zoneSchema = mongoose.Schema({
    zone: {type: String, unique: false},
    address: String,
    groupName: String
}, {timestamps:true})

module.exports = mongoose.model('Zones', zoneSchema)