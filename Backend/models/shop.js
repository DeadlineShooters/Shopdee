import mongoose from "mongoose";
const Schema = mongoose.Schema;
import User from "./user";

const shopSchema = new Schema({
    image: String,
    name: String,
    email: String,
    phone: String,
    address: String,
    description: String,
    user: { type: Schema.Types.ObjectId, ref: "User" },
})


const Shop = mongoose.model("Shop", shopSchema);
export default Shop;