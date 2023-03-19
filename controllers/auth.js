const hoteluser = require('../models/users')
const error = require('../utils/error')
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken')

const register = async(req, res, next)=>{

    try{
        const user = await hoteluser.create({...req.body})


        res.status(201).json({msg: 'User has been created successfully'})
    }

    catch(err){

        next(err)
    }
}


const login = async(req, res, next)=>{

    try{

        let {username, password} = req.body

        if(!username || !password){

            return next(error(StatusCodes.UNAUTHORIZED, 'Please provide the username and the password!'))
        }

        const user = await hoteluser.findOne({username})

        if(!user){
            return next(error(StatusCodes.UNAUTHORIZED, 'The username cannot seem to be found!'))

        }

        //  const {isAdmin, ...otherDetails} = user._doc

         const userObj = user.toObject(); // convert the Mongoose document to a plain object
         delete userObj.password; // remove the password field
         delete userObj.isAdmin

        const correctpassword = await user.checkpwd(password)

        if(!correctpassword){
            return next(error(StatusCodes.UNAUTHORIZED, 'The password is incorrect!'))
        }

        const token = jwt.sign({id:user._id, isAdmin:user._isAdmin}, process.env.jwt_secret)


        res.cookie('access_token', token, {
            httpOnly:true,
        }).status(StatusCodes.OK).json(userObj)

    }

    catch(err){


        next(err)
    }



}



module.exports = {register, login}