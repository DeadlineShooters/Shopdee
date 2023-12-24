import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
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
    address: {
        type : String,
    },
    profilePic: {
        public_id: {
            type: String
        },
        url: {
            type: String 
        },
    }
})

const user = mongoose.model("user", userSchema);
export default user;