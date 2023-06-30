const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is Required']
    },
    email:{
        type: String,
        required:[true,"Please Enter your email"],
        unique: true,
        validate: [validator.isEmail,"Please Enter a valid Email"]
    },
    password:{
        type:String,
        required:[true,"Please enter your password"],
        minLength:[8,"Password should be greater than 8 characters"],
        select: false
    },
    role:{
        type:String,
        default:'user',
    },
    resetPasswordToken: String,
    resetPasswordexpire: Date,
})


userSchema.pre('save',async function(next){
    if(!this.isModified("password")){
        next();
    }
    console.log(this.password);
    const hashedPass  =await  bcrypt.hash(this.password,10);
    this.password =  hashedPass
    next()
})

//JWT TOKEN
userSchema.methods.getJWTToken=function(){
    return jwt.sign({_id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    })
}

//Compare Password
userSchema.methods.matchPasswords =  async (enteredPassword)=>{
    console.log(this);
    console.log(enteredPassword);
    console.log(this.password);
    

}
//Generating Password Reset Token
userSchema.methods.getResetPasswordToken = async()=>{
    //Generating Token
    const resetToken = crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")

    this.resetPasswordexpire = Date.now()+15*60*1000;
    return  resetToken

}
module.exports = mongoose.model("Users",userSchema)