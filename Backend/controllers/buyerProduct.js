import Product from "../models/product.js";

export const showAll = async (req, res) => {
  try {
    // Fetch all products
    const products = await Product.find({}).populate([
      {path: "shop", model: 'Shop'},
      {path: "category", model: "Category"},
    ]);
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};