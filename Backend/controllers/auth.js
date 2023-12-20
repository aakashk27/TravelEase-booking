import User from "../models/User.js";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";

export const register = async(req,res,next) =>{

const salt=bcrypt.genSaltSync(10);
const hash=bcrypt.hashSync(req.body.password,salt);

try {
    const newUser=new User({
        username:req.body.username,
        email:req.body.email,
        password:hash,
    })
    await newUser.save();
    res.status(200).json(newUser);
    console.log("User saved")
} catch (error) {
    next(error);
}
};


export const login = async(req,res,next) =>{
     try {
      const user=await User.findOne({username:req.body.username});
      if(!user) res.send("User not found");

const isPassword=await bcrypt.compare(req.body.password,user.password);
if(!isPassword)
{
    res.send("Invalid password");
}
const token=jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.SECRET)


 const {password,isAdmin,...other}=user._doc;
 res.
 cookie("user_token",token,{
    httpOnly:true,
 }).status(200).send("USER FOUND");
     
    } catch (error) {
        next(error);
    }
    };
    
