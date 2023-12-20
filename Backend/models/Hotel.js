import mongoose from "mongoose";
import { Schema } from "mongoose";

const hotelSchema = new mongoose.Schema({

name:{                  // name of the hotel
    type:String,
    required:true,
},

type:{                 // type of the hotel
    type:String,
    required:true,
},

city:{              // address of the hotel
    type:String,
    required:true,  
},

distance:{              // distance of the hotel
    type:String,
    required:true,   
},

photos:{                // photos of the hotel(optional)
    type:[String],
},

description:{           // description of the hotel
type:String,
required:true,
},

rating:{                // rating of the hotel
    type:Number,
    required:true,
    min:0,
    max:5,
},

rooms:{                  // rooms of the hotel(optional)
    type:[String],
},

cheapestPrice:{          // cheapest  price room in the hotel
type:Number,
required:true,
},

features:{                // features of the hotel
type:Boolean,
default:false,
}

});



export default mongoose.model("Hotel",hotelSchema);