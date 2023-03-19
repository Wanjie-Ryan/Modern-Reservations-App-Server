const express = require('express')
const router = express.Router()
const {updateusers, deleteusers, singleusers, getallusers} = require('../controllers/users')
const {verifytoken, userverify, verifyadmin} = require('../utils/verifytoken')



// router.route('/checkauth').get(verifytoken, (req, res , next)=>{
//     res.send('Hello, You are now logged in')
// })


// router.route('/checkuser/:id').get(userverify, (req, res , next)=>{

//     res.send('You are now logged in and you can delete your account')
// })


// router.route('/checkadmin/:id').get(verifyadmin, (req, res, next)=>{

//     res.send('Hello Admin, you are now logged in and you can delete all accounts')
// })




// router.get('/checkauth', verifytoken, (req, res, next)=>{
//     res.send('Hello, You are now logged in')
// })

router.route('/').get(verifyadmin ,getallusers)

router.route('/:id').get(userverify ,singleusers).put(userverify ,updateusers).delete(userverify ,deleteusers)





module.exports = router