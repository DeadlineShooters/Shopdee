import mongoose from "mongoose";
const Schema = mongoose.Schema;
import user from "./Users.js";
import Product from "./product.js";

const orderSchema = new Schema({
    quantity: Number,
    totalPrice: Number,
    orderDate: Date,
    deliveryDate: Date,
    status: String,
    paymentMethod: String,
    product: { type: Schema.Types.ObjectId, ref: "Product" },
    user: { type: Schema.Types.ObjectId, ref: "user" },
})


const Order = mongoose.model("Order", orderSchema);
export default Order;
