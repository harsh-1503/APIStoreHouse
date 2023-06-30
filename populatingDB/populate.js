require('dotenv').config()
const connectDB= require('./models/connectDB')
const product = require('./product')
// connectDB();

const json = require('./hello.json')

const start = async()=>{
    try {
        await connectDB();
        await product.deleteMany();
        await product.create(json.products);
        process.exit(0)
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

start();