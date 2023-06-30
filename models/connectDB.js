const mongoose = require('mongoose')
require('dotenv').config();

const connectDB =async ()=>{
        await mongoose.connect(process.env.CONNECT_STRING).then((res)=>{
            console.log('Connected to MongoDB');
        })
}

module.exports = connectDB