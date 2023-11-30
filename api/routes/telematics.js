const express = require('express');
const router = express.Router();

const {getPostRawDataToData, getPostTelematicsData, getTelematics, getTelematic, deleteTelematics} = require('../controllers/telematics')

router.route('/').post(getPostTelematicsData).get(getTelematics).delete(deleteTelematics)//.get(getPostRawDataToData)
router.route('/:name').get(getTelematic)

module.exports = router