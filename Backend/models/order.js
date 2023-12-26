import mongoose from "mongoose";
const Schema = mongoose.Schema;
import User from "./user.js";
import Product from "./product.js";

const orderSchema = new Schema({
  quantity: Number,
  totalPrice: Number,
  orderDate: Date,
  deliveryDate: Date,
  status: String, // to confirm,toDeliver, completed
  paymentMethod: String,
  product: { type: Schema.Types.ObjectId, ref: "Product" },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
