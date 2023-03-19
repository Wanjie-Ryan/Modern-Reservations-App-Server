const roommodel = require('../models/rooms')
const {StatusCodes} = require('http-status-codes')
const createError = require('../utils/error')
const hotelmodel = require('../models/hotels')




const createroom = async(req, res, next)=>{

    const hotelid = req.params.hotelid
    const newroom = new roommodel(req.body)

    try{

        const savedroom = await newroom.save()

        try{

            await hotelmodel.findByIdAndUpdate(hotelid, {$push: {rooms:savedroom._id}})

        }

        catch(err){

            next(err)
        }

        res.status(StatusCodes.OK).json(savedroom)

    }

    catch(err){

        next(err)
    }

}


//UPDATE A ROOM   

const updateroom = async(req, res, next)=>{

    try{

        const {id:roomID} = req.params

        const room = await roommodel.findByIdAndUpdate({_id:roomID}, req.body, {
            new:true,
            runValidators:true
        })

        if(!room){

            res.status(StatusCodes.NOT_FOUND).json({msg: `Room with the Id ${roomID} cannot be not found`})
        }

        res.status(StatusCodes.OK).json({room})

    }


    catch(err){

        // res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error)
        next(err)
    }


}


//DELETE A ROOM

const deleteroom = async(req, res,next)=>{

    const hotelid = req.params.hotelid


    try{

    
        const {id:roomID} = req.params

        const room = await roommodel.findByIdAndDelete({_id:roomID} )

        try{

            await hotelmodel.findByIdAndUpdate(hotelid, {$pull: {rooms:req.params.id}})

        }

        catch(err){

            next(err)
        }

        if(!room){

            res.status(StatusCodes.NOT_FOUND).json({msg: `Room with the Id ${roomID} cannot be not found`})
        }

        res.status(StatusCodes.OK).json({msg:'Room has been deleted.'})

    }

    catch(err){

        // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})

        next(err)
    }

}


//getting single Room

const singleroom = async(req, res, next)=>{

    try{

        const {id:roomID} = req.params
        
        const room = await hotelmodel.findById({_id:roomID})

        if(!room){

            res.status(StatusCodes.NOT_FOUND).json({msg:`Room with id ${roomID} cannot be not found`})
        }

        res.status(StatusCodes.OK).json({room})

    }

    catch(err){

        // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})
        next(err)

    }
}


//getting all rooms


const getallrooms = async(req, res, next)=>{

   
    try{


        const room = await roommodel.find()

        res.status(StatusCodes.OK).json({room})
    }

    catch(err){

        // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})

        next(err)
    }


}


const updateroomavailability = async(req, res, next)=>{


    try{

        await roommodel.updateOne({'roomnumbers._id': req.params.id},{$push:{'roomnumbers.$.unavailabledates': req.body.dates}})
        res.status(StatusCodes.OK).json('room has been updated successfully')

    }


    catch(err){

        // res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error)
        next(err)
    }






}











module.exports = {createroom, updateroom, deleteroom, getallrooms, singleroom, updateroomavailability }
