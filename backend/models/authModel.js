<<<<<<< HEAD
import mongoose from "mongoose";


const authSchema=mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
     password:{
        type:String,
        required:true,
    },
     image: {
    type: String,
  },
    
})

const Auth=mongoose.model("Auth",authSchema)
=======
import mongoose from "mongoose";


const authSchema=mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
     password:{
        type:String,
        required:true,
    },
    
})

const Auth=mongoose.model("Auth",authSchema)
>>>>>>> ac1bf44 (updated)
export default Auth