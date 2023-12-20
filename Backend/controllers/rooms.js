import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";


//Creating a new Room
export const createRoom =async(req,res,next) => {
    const hotelid=req.params.hotelid;
    const newRoom=new Room(req.body);  
    try {
       const savedRoom = await newRoom.save();
       try {
        await Hotel.findByIdAndUpdate(hotelid,{$push:{rooms:savedRoom._id}})
       } catch (error) {
        next(error);
       }
       res.status(200).json(savedRoom);
    } catch (error) {
        next(error);
    }
}

//Delete a room 
export const deleteRoom=async(req,res,next)=>{
    const hotelid=req.params.hotelid;
   
    try {
        await Room.findByIdAndDelete(req.params.id);
        try {
            await Hotel.findByIdAndUpdate(hotelid,{$pull:{rooms:req.params.id}})
           } catch (error) {
            next(error);
           }
        res.status(200).json({message: 'Deleted!'});
    } catch (error) {
        next(error);
    }}


//Update Room by id
    export const updateRoom=async(req, res,next)=>{
        try {
            const updatedroom=await Room.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
            res.status(200).json(updatedroom);
        } catch (error) {
            next(error);
        }
    };


 //Get Room by id
    export const getRoomById=async(req, res,next)=>{
        try {
            const Roomfind=await Room.findById(req.params.id);
            res.status(200).json(Roomfind);
        } catch (error) {
            next(error);
        }
        }
    
        //Get Room
        export const getRooms=async(req, res,next)=>{
            try {
                const Roomfind=await Room.find();
                res.status(200).json(Roomfind);
            } catch (error) {
                next(error);
            }
            }