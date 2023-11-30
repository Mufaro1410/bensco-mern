const express = require('express');
const router = express.Router();

const {postTrucks, getTrucks, getTruck, updateTruck, deleteTruck} = require('../controllers/trucks')

router.route('/').post(postTrucks).get(getTrucks)
router.route('/:id').get(getTruck).patch(updateTruck).delete(deleteTruck)

module.exports = router