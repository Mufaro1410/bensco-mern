const { Decimal128 } = require('mongodb')
const mongoose = require('mongoose')
const Zones = require('./zones')

const telematicSchema = new mongoose.Schema({
    flags: Number,
    ownerId: String,
    originId: String,
    type: String,
    linked: Array,
    date: Date,
    received: Date,
    active: Boolean,
    location: {
        lon: Number,
        lat: Number,
        speed: Number,
        altitude: Number,
        heading: Number,
        accuracy: Number,
        age: Number,
        gc: {
            rd: String,
            rt: String,
            sb: String,
            tw: String,
            pr: String,
            ct: String,
        },
        address: String,
    },
    zones: Array,
    routes: String,
    state: String,
    telemetry: {
        priority: Number,
        eventId: Number,
        digital_01: Number,
        digital_02: Number,
        digital_03: Number,
        digital_04: Number,
        profile: Number,
        gnss_status: Number,
        moving: Number,
        motion_start: Number,
        gsm_signal: Number,
        sleep: Number,
        can_pto: Number,
        can_coolant_temp: Decimal128,
        can_pto_drive: Decimal128,
        analog_01: Decimal128,
        analog_02: Decimal128,
        analog_03: Decimal128,
        unknown_245: Decimal128,
        battery_voltage: Decimal128,
        battery_current: Decimal128,
        pdop: Decimal128,
        hdop: Decimal128,
        power_voltage: Decimal128,
        odo_diff: Decimal128,
        gsm_code: Decimal128,
        can_fuel_used: Decimal128,
        can_fuel_perc: Number,
        can_rpm: Decimal128,
        can_eng_hours: Number,
        can_odometer: Decimal128,
        can_service_dist: Decimal128,
        can_fuel_econ: Decimal128,
        can_fuel_used_hi: Decimal128,
        odo_counter: Decimal128,
        hours_00_counter: Decimal128,
        idle_counter: Decimal128
    },
    io: String,
    zonesInRange: Array,
    spd: {
        rd: Number,
        mx: Number,
        un: Number,
        src: Number,
      },
    meta: {
        dsid: String,
        wshost: String,
        wsport: Number,
        ecsid: String,
        tpsq: Number
    },
    routes: String,
    state: String,
    driverId: String,
    assetId: String,
    assetName: String,
    assetTags: Array,
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Zones',
        // required: [true, 'Please provide zone defination']
    },
    tripDirection: String,
}, {strict: false})

// telematicSchema.pre('save', async function(next) {
//     if (!this.zones.length == 0) {
//         next()
//     }
//  })

// dealing with duplicates
// telematicSchema.pre('save', async function(next) {
//     if (this.date.isNew && this.assetId.isNew) {
//       next()
//     }
//   }
// )

// embedding zones to telematics
telematicSchema.pre('save', async function() {
    let zone = await Zones.findOne({zone: this.zones})
    // let zonesAddress = await Zones.findOne({address: this.location.address})
    if (!zone) {
        console.log('Zone not found')
    }
    this.group = zone._id
    }
)


module.exports = mongoose.model('telematicsData', telematicSchema)