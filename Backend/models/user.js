import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    phone: {
        type: String,
    },
    gender: {
        type: String,
    },
    birthDay: {
        type: Date,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    verificationToken: String,
    address: [
        {
            name: String,
            phone: String,
            location: String,
            locationType: String,
        }
    ]
})

const User = mongoose.model("User", userSchema);
export default User;