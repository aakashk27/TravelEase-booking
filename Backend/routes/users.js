import express from "express";
import User from "../models/User.js";
import { deleteUser,  getUser, updateUser} from "../controllers/users.js";
import {verifyAdmin, verifyToken, verifyUser} from '../utils/verifyToken.js'
const router=express.Router();

//check if the user has token
router.get('/check',verifyToken,(req,res,next)=>{
    res.send("verified");
});

//check if the user has authentication
router.get('/verify/:id',verifyUser,(req,res,next)=>{
    res.send("Good to go!");
})

//check if the user is Admin
router.get('/checkadmin/:id',verifyAdmin,(req,res,next)=>{
    res.send("you are now admin")
})
//Updating
router.put('/:id',updateUser );

//Deleting
router.delete('/:id',deleteUser)


//Get all
router.get('/', getUser);




export default router