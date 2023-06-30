const mongoose = require('mongoose')

const cartSchema = mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    userCart:[
        {
            id:{
                type: Number,
            },
            title:{
                type:String,
            },
            description:{
                type:String,
            },
            price:{
                type:Number,
                default:4.5,
            },
            discountPercentage:{
                type:Number,
            },
            rating:{
                type:Number,
            },
            stock:{
                type:Number,
            },
            brand:{
                type:String,
            },
            category:{
                type:String,
            },
            thumbnail:{
                type:String,
            },
            images:[{type:String}]
        },
    ]
})


module.exports = mongoose.model('carts',cartSchema);