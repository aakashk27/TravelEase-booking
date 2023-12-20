import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoute from './routes/auth.js';
import hotelsRoute from './routes/hotels.js';
import usersRoute from './routes/users.js';
import roomsRoute from './routes/rooms.js';
import { login, register } from './controllers/auth.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();


const app= express();

//connecting to mongodb server
const connect=async() => {
    try {
        await mongoose.connect(process.env.MONGO)
        console.log("Connected to Mongodb server");
    } catch (error) {
       console.log(error); 
    }
};

//on disconnect
mongoose.connection.on("disconnect",()=>{
    console.log("Disconnected from Mongodb server");
})


app.get('/',(req,res)=>{
    res.send("hi there")
});

app.use(cors());
app.use(cookieParser());
app.use(express.json());

//middleware
app.use('/api/auth',authRoute);
app.use('/api/rooms',roomsRoute);
app.use('/api/users',usersRoute);
app.use('/api/hotels',hotelsRoute);
app.use('/api/users/register',register)   //register
app.use('/api/users/login',login)         //login

//middleware for error handling
app.use((err,req,res,next)=>{
return res.status(err.status || 500).json("HELLO Error: " + err.message);
});

//listening on port 6000
const port = 6000;
app.listen(port,() => {
    connect();
    console.log(`listening on ${port}`);});