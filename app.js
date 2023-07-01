const express = require('express');
const app = express();
const port = 5000 || process.env.PORT;
const connectDB = require('./models/connectDB')
const errorMiddleware = require('./middlewares/error')
const cookieParser = require('cookie-parser');

// const app = express();
app.use(cookieParser());
// const cookieparser = require('cookie-parser')
// const isAuthenticatedUser = require('./middlewares/auth')
//Handling Uncaught Exceptions
process.on("uncaughtException",(err)=>{
    console.log(`Error : ${err.message}`);
    console.log(`Shutting down the server due to uncaught promise rejection`);
    process.exit(1);
})
const userRoute = require('./routes/userRoutes')
const productRoute = require('./routes/productRoutes')
const cartRoute = require('./routes/cartRoutes')
const orderRoutes = require('./routes/orderRoutes')

// console.log(youtube);
app.use(express.json())
app.use('/api/v1',userRoute)
app.use('/api/v1',productRoute)
app.use('/api/v1',cartRoute)
app.use('/api/v1',orderRoutes)

app.get('/',(req,res)=>{
    // req.h
    res.send("Hello World")
})

//Middleware for errors
app.use(errorMiddleware);
const server = app.listen(port,()=>console.log(`Server is listening at port ${port}`));
connectDB();


//Unhandled Promise Rejection

process.on("unhandledRejection",err=>{
    console.log(`Error : ${err.message}`);
    console.log(`Shutting down the server due to unhandled Promise Rejection`);

    server.close(()=>{
        process.exit();
    })
})