import Product from "../models/product.js";
const controller = {};

controller.showAll = async (req, res) => {
  try {
    // Fetch all products
    const products = await Product.find({}).populate(["category", "shop"]);
    console.log(products);
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

controller.show = async (req, res) => {
  try {
    const { productId } = req.params;

    // Validate if the productId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    // Fetch the product details with category and shop information
    const product = await Product.findById(productId).populate(["category", "shop"]);

    // Check if the product exists
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error("Error fetching product details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default controller;
