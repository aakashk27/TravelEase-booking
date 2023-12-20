import express from "express";
import { createRoom, deleteRoom, getRoomById, getRooms, updateRoom } from "../controllers/rooms.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router=express.Router();

//Adding
router.post('/:hotelid',verifyAdmin,createRoom);

//Updating
router.put('/:id',verifyAdmin,updateRoom );

//Deleting
router.delete('/:id/:hotelid',verifyAdmin,deleteRoom)

//Get by id
router.get('/:id', getRoomById);

//Get all
router.get('/', getRooms);




export default router