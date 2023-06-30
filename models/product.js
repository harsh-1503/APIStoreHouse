const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    id:{
        type: Number,
        // required: [true,'product name must be provided']
    },
    title:{
        type:String,
        // required:[true,'product price must be provided']
    },
    description:{
        type:String,
        // default:false,
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
})

module.exports = mongoose.model("products",productSchema)