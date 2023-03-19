const hoteluser = require('../models/users')
const {StatusCodes} = require('http-status-codes')
const createError = require('../utils/error')


    //UPDATE A USER    


    const updateusers = async(req, res, next)=>{

        try{

            const {id:userID} = req.params

            const users = await hoteluser.findByIdAndUpdate({_id:userID}, req.body, {
                new:true,
                runValidators:true
            })

            if(!users){

                res.status(StatusCodes.NOT_FOUND).json({msg: `User with the Id ${userID} cannot be not found`})
            }

            res.status(StatusCodes.OK).json({users})

        }


        catch(err){

            // res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error)
            next(err)
        }


    }


    //DELETE A USER

    const deleteusers = async(req, res,next)=>{

        try{

        
            const {id:userID} = req.params

            const users = await hoteluser.findByIdAndDelete({_id:userID} )

            if(!users){

                res.status(StatusCodes.NOT_FOUND).json({msg: `User with the Id ${userID} cannot be not found`})
            }

            res.status(StatusCodes.OK).json({msg:'user has been deleted.'})

        }

        catch(err){

            // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})

            next(err)
        }

    }


    //getting single USER

    const singleusers = async(req, res, next)=>{

        try{

            const {id:userID} = req.params
            
            const users = await hoteluser.findById({_id:userID})

            if(!users){

                res.status(StatusCodes.NOT_FOUND).json({msg:`User with id ${userID} cannot be not found`})
            }

            res.status(StatusCodes.OK).json({users})

        }

        catch(err){

            // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})
            next(err)

        }
    }


    //getting all USERS


    const getallusers = async(req, res, next)=>{

       
        try{


            const users = await hoteluser.find({})
            res.status(StatusCodes.OK).json({users})
        }

        catch(err){

            // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})

            next(err)
        }


    }





module.exports = {updateusers, deleteusers, singleusers, getallusers}