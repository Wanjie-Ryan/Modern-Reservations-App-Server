const mongoose = require('mongoose');


const roomschema = new mongoose.Schema({

    title:{
        type:String,
        required:[true, 'name of the room must be provided'],
        
    },

    price:{
        type:Number,
        required:[true, 'price of the room must be provided'],
        
    }, 

    maxpeople:{

        type:Number,
        required:[true, 'maximum number of people the room can hold must be provided'],
        
    },


    description:{

        type:String,
        required:[true, 'description of the room must be provided'],
        
    },

    roomnumbers: [{number: Number, unavailabledates: {type:[Date]}}]

    //roomnumber will hold all the rooms in the hotel 


}, {timestamps: true})



module.exports = mongoose.model('rooms', roomschema);
