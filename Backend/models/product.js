import mongoose from "mongoose";
const Schema = mongoose.Schema;
import Shop from "./shop";

const productSchema = new Schema({
    name: String,
    image: String,
    desciption: String,
    price: Number,
    quantity: Number,
    status: String,
    shop: { type: Schema.Types.ObjectId, ref: "Shop" }
})

const Product = mongoose.model("Product", productSchema);
export default Product;