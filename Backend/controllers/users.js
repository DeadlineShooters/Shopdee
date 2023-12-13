import { response } from "express"
import user from "../models/Users.js"
import jwt from "jsonwebtoken"
import randomBytes from "randombytes"
import crypto from "crypto"

export const register = async (req, res) => {
    try {
        const { username, email, password} = req.body;
        const existingUser = await user.findOne({email});
        if (existingUser)
        {
            return res.status(400).json({messages: "Email has been already registered!"});
        }
        const newUser = new user({username, email, password});
        await newUser.save();
    }
    catch (error) {
        console.log("error registering user", error);
        res.status(500).json({messages: "Registration failed"});
    }
}

const generateSecretKey = () => {
    const secretKey = crypto.randomBytes(32).toString("hex");
    return secretKey;
}

const secretKey = generateSecretKey();

export const signIn = async (req, res) => {
    try {
        const {email, password} = req.body;
        //Check if the user exists
        const loginUser = await user.findOne({email});
        if (!loginUser)
        {
            return res.status(401).json({message: "Invalid email or password"});
        }
        if (loginUser.password != password)
        {
            return res.status(401).json({message: "Invalid password"});
        }
        const token = jwt.sign({userID:loginUser._id}, secretKey);
        res.status(200).json({token})
    } catch (error) {
        res.status(500).json({message: "Login failed"});
    }
}

export const getprofile = async (req, res) => {
    try {
        const findUserID = req.params.userID;
        const User = await user.findById(findUserID);
        if (!User) {
            res.status(404).json({message: "User not found"});
        }
        res.status(200).json({User});
    } catch (error) {
        res.status(500).json({message: "Error retrieving the user profile"});
    }
}