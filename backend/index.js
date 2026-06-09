import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectdb from "./config/db.js"
import productRoute from "./routers/productRoute.js"
import authRoute from "./routers/authRoute.js"


dotenv.config()
const app=express()

connectdb()

app.use(cors())
app.use(express.json())

const PORT=process.env.PORT||5000

app.get("/",(req,res)=>{
    return res.json("api is running")
})

app.use("/api/product",productRoute)
app.use("/api/auth",authRoute)


app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})

