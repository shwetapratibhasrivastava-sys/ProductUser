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
export default Auth