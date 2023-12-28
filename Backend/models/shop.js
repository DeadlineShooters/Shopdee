import mongoose from "mongoose";
const Schema = mongoose.Schema;
import user from "./Users.js";

const shopSchema = new Schema({
    image: {
        public_id: String,
        url: String,
    },
    name: String,
    email: String,
    phone: String,
    address: String,
    description: String,
    user: { type: Schema.Types.ObjectId, ref: "user" },
})


const Shop = mongoose.model("Shop", shopSchema);
export default Shop;
