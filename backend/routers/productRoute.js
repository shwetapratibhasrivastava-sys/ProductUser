import express from "express"
import { create, deleted, get, getById, update } from "../controllers/product.js"



const productRoute=express.Router()
productRoute.post("/create",create)
productRoute.get("/get",get)
productRoute.get("/getById/:id",getById)
productRoute.put("/update",update)
productRoute.delete("/delete",deleted)


export default productRoute