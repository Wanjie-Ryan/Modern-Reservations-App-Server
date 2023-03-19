const express = require('express');
const router = express.Router()
const {createroom, updateroom, deleteroom, getallrooms, singleroom,updateroomavailability } = require('../controllers/rooms')
const {verifytoken, userverify, verifyadmin} = require('../utils/verifytoken')




router.route('/').get(getallrooms)

router.route('/:hotelid').post(verifyadmin, createroom)

router.route('/availability/:id').put(updateroomavailability)

router.route('/:id/:hotelid').delete(verifyadmin ,deleteroom)

router.route('/:id').get(singleroom).put(verifyadmin ,updateroom)

module.exports = router