import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from  "../models/user.model.js"
import {uploadOnCloudinary} from  "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser = asyncHandler(async(req,res)=>{
   
        // step to follow to get user registration
        //get user detail from frontend
        //validation- not empty
        //check if already exists: email and username
        //check for images and check for avatar
        //upload them to cloudinary, avatar
        // create user object- create entry in db
        //remove password and refreash token field from response
        //check for user creation
        //return res

  const {fullName,email,username,password} =  req.body
  console.log("emial:", email);
if(
    [fullName, email, username,password].some((field)=>
field?.trim() === "")
){

throw new ApiError(400, " All field are required")
}


const existedUser = User.findOne({
    $or: [{username}, {email}]
})

if(existedUser){
    throw new ApiError(409,"User with email and username already exised ")
}
  const avatarLocalpath =req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;
  if(!avatarLocalpath){
    throw new ApiError(400, "Avatar file is required")
  }

  const avatar = await uploadOnCloudinary(avatarLocalpath)
  const coverImage = await uploadOnCloudinary(coverImageLocalPath)
  if(!avatar){
    throw new ApiError(400, "Avatar file is required")
  }
   const user = await User.create({
      fullName,
      avatar:avatar.url,
      coverImage: coverImage?.url || "",
      email,
      password,
      username: username.toLowerCase()
    })
    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    )
    if(!createdUser){
      throw new ApiError(500, " Something went wrong while registering the user")
    }

    return res.status(201).json(
      new ApiResponse(200, createdUser, " user registerd successfully")
    )
 
})


export {registerUser}