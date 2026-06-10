import Product from "../models/productModel.js";

export const create = async (req, res) => {
  try {
    const { productName, category, description } = req.body;

    if (!productName || !category || !description) {
      return res.json({
        message: "All fields are required",
      });
    }

    const existingOne = await Product.findOne({
      productName,
    });

    if (existingOne) {
      return res.json({
        message: "Product already exists",
      });
    }

    const product = await Product.create({
      productName,
      category,
      description,
    });

    return res.json({
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};

export const get = async (req, res) => {
  try {
    const products = await Product.find();

    return res.json({
      message: "Products fetched successfully",
      data: products,
    });
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};

export const getById = async (req, res) => {
  try {
    const product = await Product.findById(
      req.params.id
    );

    if (!product) {
      return res.json({
        message: "Product doesn't exist",
      });
    }

    return res.json({
      message: "Product fetched successfully",
      data: product,
    });
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};

export const update = async (req, res) => {
  try {
    const product = await Product.findById(
      req.params.id
    );

    if (!product) {
      return res.json({
        message: "Product doesn't exist",
      });
    }

    const updatedProduct =
      await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    return res.json({
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};

export const deleted = async (req, res) => {
  try {
    const product = await Product.findById(
      req.params.id
    );

    if (!product) {
      return res.json({
        message: "Product doesn't exist",
      });
    }

    await Product.findByIdAndDelete(
      req.params.id
    );

    return res.json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};