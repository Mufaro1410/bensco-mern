const mongoose = require('mongoose');

const truckSchema = mongoose.Schema({
    // assetID: String,
    assetName: {type: String, unique: true},
})

module.exports = mongoose.model('Trucks', truckSchema)