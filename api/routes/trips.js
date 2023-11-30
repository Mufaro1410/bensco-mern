const express = require('express');
const router = express.Router();

const {createTrips, getTrips, getTrip, updateTrip, deleteTrip} = require('../controllers/trips')

router.route('/').post(createTrips).get(getTrips)
router.route('/:id').get(getTrip).patch(updateTrip).delete(deleteTrip)

module.exports = router