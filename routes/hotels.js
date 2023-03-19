const express = require('express');
const router = express.Router();
const {createhotel, updatehotel, deletehotel, singlehotel, getallhotels, CountByCity, CountByType, gethotelrooms} = require('../controllers/hotels')
const {verifytoken, userverify, verifyadmin} = require('../utils/verifytoken')



router.route('/').post(verifyadmin ,createhotel).get(getallhotels)


router.route('/:id').put(verifyadmin, updatehotel).delete(verifyadmin, deletehotel) 

router.route('/find/:id').get(singlehotel)




// router.get('/').get(gethotels)


router.route('/countbycity').get(CountByCity)

router.route('/countbytype').get(CountByType)

router.route('/room/:id').get(gethotelrooms)





module.exports = router;