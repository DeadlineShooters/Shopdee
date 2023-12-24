import Product from "../models/product.js";
const controller = {};

controller.showAll = async (req, res) => {
  try {
    // Fetch all products
    const products = await Product.find().populate(["category", "shop"]);

    // Send the products as a JSON response
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    // Handle the error and send an appropriate response
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default controller;
