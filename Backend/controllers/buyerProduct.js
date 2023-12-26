import Product from "../models/product.js";
const controller = {};

controller.showAll = async (req, res) => {
  try {
    // Fetch all products
    const products = await Product.find().populate(["category", "shop"]);

    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default controller;
