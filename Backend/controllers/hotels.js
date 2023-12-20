import Hotel from "../models/Hotel.js";

//creating  a new hotel
export const createHotel=async(req, res,next)=>{
    const newHotel = new Hotel(req.body);
    try {
        const saveHotel = await newHotel.save();
        res.status(200).json(saveHotel);
    } catch (error) {
       next(error);
    }
    }

    //delete hotel by id
    export const deleteHotel=async(req,res,next)=>{
        try {
            await Hotel.findByIdAndDelete(req.params.id);
            res.status(200).json({message: 'Deleted!'});
        } catch (error) {
            next(error);
        }}

         //update hotel by id
        export const updateHotel=async(req, res,next)=>{
            try {
                const updatedHotel=await Hotel.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
                res.status(200).json(updatedHotel);
            } catch (error) {
                next(error);
            }
        };


        //get hotel by id
        export const getHotelById=async(req, res,next)=>{
            try {
                const Hotelfind=await Hotel.findById(req.params.id);
                res.status(200).json(Hotelfind);
            } catch (error) {
                next(error);
            }
            }
        
            //get hotels
           // get hotels
           export const getHotels=async(req, res,next)=>{
            const {min,max,...others}=req.query;
            try {
                const {limit}=req.query;
                const Hotelfind=await Hotel.find({...others,cheapestPrice:{$gt:min || 1,$lt:max || 999}}).limit(parseInt(limit));
                res.status(200).json(Hotelfind);
            } catch (error) {
                next(error);
            }
            }
  


                export const countHotelsByCity = async (req, res, next) => {
                    // Check if req.query.cities is defined
                    if (!req.query.cities) {
                        return res.status(400).json({ error: "Cities parameter is missing" });
                    }
                
                    // Split the cities if it more than one and defined
                   const cities = req.query.cities.split(",");
                
                    try {
                        const list = await Promise.all(cities.map((city) => {
                            return Hotel.countDocuments({ city: city });
                        }));
                        res.status(200).json(list);
                    } catch (error) {
                        next(error);
                    }
                }
                

                export const countHotelsByType = async (req, res, next) =>{
                    try {
                        const hotelCount=       await Hotel.countDocuments({type:"hotel"});
                        const appartmentCount=  await Hotel.countDocuments({type:"appartment"});
                        const resortCount=      await Hotel.countDocuments({type:"resort"});
                        const villaCount=       await Hotel.countDocuments({type:"villa"});
                        const cabinCount=       await Hotel.countDocuments({type:"cabin"});
                        
                        res.status(200).json([
                            {type:"hotel",count:hotelCount},
                            {type:"appartment",count:appartmentCount},
                            {type:"resort",count:resortCount},
                            {type:"villa",count:villaCount},
                            {type:"cabinCount",count:cabinCount},

                        ])
                    



                    } catch (error) {
                        next(error);
                    }
                }