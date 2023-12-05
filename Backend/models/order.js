import mongoose from "mongoose";
const Schema = mongoose.Schema;
import User from "./user";
import Product from "./product";

const orderSchema = new Schema({
    totalPrice: String,
    orderDate: Date,
    deliveryDate: Date,
    status: String,
    product: { type: Schema.Types.ObjectId, ref: "Product" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
})


const Order = mongoose.model("Order", orderSchema);
export default Order;