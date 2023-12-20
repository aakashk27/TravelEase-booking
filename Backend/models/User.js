import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema=new mongoose.Schema({

    username:{             //username of user
        type:String,
        required:true,
        unique:true,
    },

    email:{                 //email of user
        type:String,
        required:true,
        unique:true,
    },

    password:{               //password of user
        type:String,
        required:true,
        unique:true,
    }, 

    isAdmin:{                  //is admin
        type:Boolean,  
        default:false,
    },
},{
    timestamps:true,
});


export default mongoose.model("User",userSchema);