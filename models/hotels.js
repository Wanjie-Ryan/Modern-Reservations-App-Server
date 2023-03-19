const mongoose = require('mongoose');

const hotelschema = new mongoose.Schema({

    name:{
        type:String,
        required:[true, 'name of the hotel must be provided']
    },

    type:{
        type:String,
        required:[true, 'type of the hotel must be provided']
    }, 

    city:{

        type:String,
        required:[true, 'city of the hotel must be provided']
    },

    address:{
        type:String,
        required:[true, 'address of the hotel must be provided']
    },

    distance:{
        type:String,
        required:[true, 'distance of the hotel must be provided']
    },

    photos:{

        type:[String]
    },

    title:{
        type:String,
        required:[true, 'title of the hotel must be provided']
    },

    description:{

        type:String,
        required:[true, 'description of the hotel must be provided']
    },

    rating:{

        type:Number,
        min:0,
        max:5

    },


    rooms:{

        type:[String]

        //type is an array because it will include room ids and other properties from room models
    },

    cheapestprice:{
        type:Number,
        required:true
    },

    featured:{

        type:Boolean,
        Default:false
    }



})


module.exports = mongoose.model('Hotel', hotelschema);
