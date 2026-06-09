import mongoose from "mongoose";



const connectdb=async(req,res)=>{
    try {
        if(!process.env.MONGO_URI){
            return console.log("MONGODB is not avaliable")
        }
        await mongoose.connect(process.env.MONGO_URI)
        return console.log("MONGODB connected...")

    } catch (error) {
        return console.log(error.message)
    }
}

export default connectdb