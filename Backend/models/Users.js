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
        type: String,
    },
    recovery: {
        resetToken  : {
            type: String,
            required: false
        },
        resetTokenExpiration : {
            type: Date, 
            required:false
        }
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