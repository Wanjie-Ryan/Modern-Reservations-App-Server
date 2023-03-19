const express = require('express');
const { StatusCodes } = require('http-status-codes');
const app = express();
require('dotenv').config()
const port = process.env.PORT || 3001
const connectionDB = require('./DB/connection')
const authroute = require('./routes/auth')
const hotelsroute = require('./routes/hotels')
const roomsroute = require('./routes/rooms')
const usersroute = require('./routes/users')
const cookieParser = require('cookie-parser')
const cors = require('cors')


//MIDDLEWARES

app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use('/api/auth', authroute)
app.use('/api/hotels', hotelsroute)
app.use('/api/rooms', roomsroute)
app.use('/api/users', usersroute)



// error middleware

app.use((err, req, res, next)=>{

    const errorstatus = err.status || StatusCodes.INTERNAL_SERVER_ERROR
    const errormessage = err.message || 'something went wrong'
    return res.status(errorstatus).json({

        success:false,
        status:errorstatus,
        message:errormessage,
        stack:err.stack
    })



})




const DB = async()=>{

    try{

        await connectionDB(process.env.mongo_url)

        app.listen({port}, ()=>{
            console.log(`Server is running on port ${port}`)
        })
    }

    catch(error){


        console.log(error)
    }
}

DB()




