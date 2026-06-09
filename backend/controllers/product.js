import Product from "../models/productModel.js";

export const create = async (req, res) => {
  try {
    const { productName, category, description } = req.body;
    if (!productName || !category || !description) {
      return res.json({
        message: "All fields are required",
      });
    }
    const existingOne = await Product.findOne({ productName });
    if (existingOne) {
      return res.json({
        message: "Product already exisits",
      });
    }

    const product = await Product.create({
      productName,
      category,
      description,
    });
    return res.json({
      message: "Product created successfully",
    });
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};


export const get=async(req,res)=>{
    try {
        const product=await Product.find()
        return res.json({
      message: "Product fetched successfully",
    });
    } catch (error) {
        return res.json({
      message: error.message,
    });
    }
}

export const getById=async(req,res)=>{
    try {
        const existingOne = await Product.findOne({ productName });
    if (!existingOne) {
      return res.json({
        message: "Product don't exisits",
      });
    }
        const product=await Product.findById(req.params.id)
        return res.json({
      message: "Product fetched successfully",
    });
    } catch (error) {
        return res.json({
      message: error.message,
    });
    }
}



export const update=async(req,res)=>{
    try {
        const existingOne = await Product.findOne({ productName });
    if (!existingOne) {
      return res.json({
        message: "Product don't exisits",
      });
    }
        const product=await Product.findByIdAndUpdate(req.params.id,req.body,{
            new:true
        })
        return res.json({
      message: "Product updated successfully",
    });
    } catch (error) {
        return res.json({
      message: error.message,
    });
    }
}


export const deleted=async(req,res)=>{
   try {
        const existingOne = await Product.findOne({ productName });
    if (!existingOne) {
      return res.json({
        message: "Product don't exisits",
      });
    }
        const product=await Product.findByIdAndDelete(req.params.id)
        return res.json({
      message: "Product deleted successfully",
    });
    } catch (error) {
        return res.json({
      message: error.message,
    });
    }
}
 

