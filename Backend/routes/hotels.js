import express from "express";
import { countHotelsByCity, countHotelsByType, createHotel, deleteHotel, getHotelById, getHotels, updateHotel } from "../controllers/hotels.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router=express.Router();

//Adding
router.post('/',verifyAdmin,createHotel);

//Updating
router.put('/:id',verifyAdmin,updateHotel );

//Deleting
router.delete('/:id',verifyAdmin,deleteHotel)

//Get by id
router.get('/find/:id', getHotelById);

//Get all
router.get('/', getHotels);

//Number of hotels by city
router.get('/countByCity',countHotelsByCity);

//Number of hotels by types
router.get('/countByType',countHotelsByType);



export default router