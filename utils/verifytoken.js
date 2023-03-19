const jwt = require('jsonwebtoken')
const createError = require('./error')
const {StatusCodes} = require('http-status-codes')

const verifytoken = (req, res, next)=>{

    const token = req.cookies.access_token

    if(!token){

        return next(createError(StatusCodes.UNAUTHORIZED, 'You are not authenticated!'))

    }

    jwt.verify(token, process.env.jwt_secret, (err, user)=>{

        if(err){
            return next(createError(StatusCodes.FORBIDDEN, 'The Token is Invalid!'))
        }

        req.user = user

        next()
    })

}

const userverify = (req, res, next) => {

        verifytoken(req, res, next, ()=>{

            if(req.user.id === req.params.id || req.user.isAdmin){
                next()
            }

            else{

                if(err){

                    return next(createError(StatusCodes.FORBIDDEN, 'You are not authorized!'))
                }
            }
        })


    }


const verifyadmin = (req, res, next)=>{

    verifytoken(req, res, next, ()=>{

        if(req.user.isAdmin){
            next()
        }

        else{

            return next(createError(StatusCodes.FORBIDDEN, 'You are not authorized!'))
        }

    }) 

}






module.exports = {verifytoken, userverify, verifyadmin}