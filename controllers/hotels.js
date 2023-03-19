const hotelmodel = require('../models/hotels')
const {StatusCodes} = require('http-status-codes')
const createError = require('../utils/error')
const roommodel = require('../models/rooms')



// CREATING A HOTEL

const createhotel = async(req, res, next)=>{

    try{

        const hotel = await hotelmodel.create({...req.body})

        res.status(StatusCodes.CREATED).json({hotel})

    }

    catch(err){

        // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})

        next(err)
    }

}


    //UPDATE A HOUSE    


    const updatehotel = async(req, res, next)=>{

        try{

            const {id:hotelID} = req.params

            const hotel = await hotelmodel.findByIdAndUpdate({_id:hotelID}, req.body, {
                new:true,
                runValidators:true
            })

            if(!hotel){

                res.status(StatusCodes.NOT_FOUND).json({msg: `Hotel with the Id ${hotelID} cannot be not found`})
            }

            res.status(StatusCodes.OK).json({hotel})

        }


        catch(err){

            // res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error)
            next(err)
        }


    }


    //DELETE A HOUSE

    const deletehotel = async(req, res,next)=>{

        try{

        
            const {id:hotelID} = req.params

            const hotel = await hotelmodel.findByIdAndDelete({_id:hotelID} )

            if(!hotel){

                res.status(StatusCodes.NOT_FOUND).json({msg: `Hotel with the Id ${hotelID} cannot be not found`})
            }

            res.status(StatusCodes.OK).json({msg:'hotel has been deleted.'})

        }

        catch(err){

            // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})

            next(err)
        }

    }


    //getting single hotel

    const singlehotel = async(req, res, next)=>{

        try{

            const {id:hotelID} = req.params
            
            const hotel = await hotelmodel.findById({_id:hotelID})

            if(!hotel){

                res.status(StatusCodes.NOT_FOUND).json({msg:`Hotel with id ${hotelID} cannot be not found`})
            }

            res.status(StatusCodes.OK).json(hotel)

        }

        catch(err){

            // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})
            next(err)

        }
    }


    //getting all hotels


    const getallhotels = async(req, res, next)=>{

        
        const {min, max , ...others} = req.query


        // console.log(limit)
        
        try{
        const limit = Number(req.query.limit)
            
            //others represents other query options that maybe passed in the query.

            // const query = {}

            // let limit = 0
            // if(req.query.limit){
            //     limit = Number(req.query.limit)
            // }

            const hotel = await hotelmodel.find({...others, cheapestprice:{$gt:min | 1, $lt:max | 400}}).limit(4)


            // const hotel = await hotelmodel.find();

            res.status(StatusCodes.OK).json(hotel)

            // console.log(hotel)
        }

        catch(err){

            // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})

            next(err)
        }


    }



    const CountByCity = async(req, res, next)=>{

        const cities = req.query.cities.split(',')

        // making the values in the query to an array

        try{

            const list = await Promise.all(cities.map(city=>{

                return hotelmodel.countDocuments({city: city})
            }))

            res.status(StatusCodes.OK).json(list)


        }


        catch(err){

            next(err)
        }


    }


    const CountByType = async(req, res, next)=>{


        try{

            const hotelcount = await hotelmodel.countDocuments({type:'Hotel'})

            const apartmentcount = await hotelmodel.countDocuments({type:'Apartment'})

            const resortcount = await hotelmodel.countDocuments({type:'Resort'})

            const villacount = await hotelmodel.countDocuments({type:'Villa'})

            const cabincount = await hotelmodel.countDocuments({type:'Cabin'})

            res.status(StatusCodes.OK).json([

                {type:'Hotel', count:hotelcount},
                {type:'Apartment', count:apartmentcount},
                {type:'Resort', count:resortcount},
                {type:'Villa', count:villacount},
                {type:'Cabin', count:cabincount},


            ])

        }


        catch(err){

            next(err) 
        }


    }


    const gethotelrooms = async(req, res, next)=>{


        try{

            const specifichotel = await hotelmodel.findById(req.params.id)

            const list =  await Promise.all(specifichotel.rooms.map((room)=>{

                return roommodel.findById(room)
            }))


            res.status(StatusCodes.OK).json(list)

        }

        catch(err){

            next(err)
        }


    }




module.exports = {createhotel, updatehotel, deletehotel, singlehotel, getallhotels, CountByCity, CountByType, gethotelrooms}