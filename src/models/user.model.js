import mongoose,{Schema} from 'mongoose';
import jwt from "jsonwebtoken"  // this is used for authentication purpose, it is the bearer token it mean jisake pass ye hoga use hum data send kar denge it is like a key
import bcrypt from "bcrypt" // this will change the password into the hashcode then it stored into the database

 const  userSchema =new Schema({
    userName: {
        type: String,
        required : true,
        unique: true,
        lowercase: true,
        trim: true,
        index:true
    },

    email: {
        type: String,
        required : true,
        unique: true,
        lowercase: true,
        trim: true
       
    }, 

    fullName: {
        type: String,
        required : true,
        lowercase: true,
        trim: true,
        index:true
       
    }, 
    avatar:{
        type: String,
        required: true
    },
    coverImage:{
        type:String
    },
    watchHistory:[
        {
        type: Schema.Types.ObjectId,
        ref:"Video"
    }
],
password:{
    type: String,
    required: [true,'Password is Required']
},
refreshToken:{
 type: String
}

},
 

{
    timestamps: true


});


//hoke: this will run the code before executing the whole programm, we are using "pre hoke"

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password,10)
    next()
})
userSchema.methods.isPasswordCorrect = async function(password){
  return await bcrypt.compare(password, this.password) 
}
userSchema.methods.generateAccessToken = function(){
   return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullName: this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
       expiresIn : process.env.ACCESS_TOKEN_EXPIRY
    }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id: this._id,
        
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
       expiresIn : process.env.REFRESH_TOKEN_EXPIRY
    }
    )
}
 

export const User = mongoose.model("User", userSchema)