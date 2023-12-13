import mongoose from "mongoose";
const Schema = mongoose.Schema;
import Shop from "./shop.js";
import Category from "./category.js";

const productSchema = new Schema({
  name: String,
  image: [String],
  desciption: String,
  price: Number,
  quantity: Number,
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  shop: { type: Schema.Types.ObjectId, ref: "Shop" },
});

const Product = mongoose.model("Product", productSchema);
export default Product;
