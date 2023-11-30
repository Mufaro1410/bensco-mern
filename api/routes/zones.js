const express = require('express');
const router = express.Router();

const {createZones, getZones, getZone, updateZone, deleteZone} = require('../controllers/zones')

router.route('/').post(createZones).get(getZones)
router.route('/:id').get(getZone).patch(updateZone).delete(deleteZone)

module.exports = router