import { response } from "express"

import jwt from "jsonwebtoken"
import randomBytes from "randombytes"
import crypto from "crypto"
import Shop from "../models/shop.js"

export const registerShop = async (req, res) => {
    try {
        const { image, shopName, email, phone, address, bio, userId } = req.body;
        console.log(req.body)
        const existingUser = await Shop.findOne({email});
        if (existingUser)
        {
            return res.status(400).json({messages: "Email has been already registered!"});
        }
        const newShop = new Shop({ image, name: shopName, email, phone, address, description: bio, user: userId });
        await newShop.save();
        res.status(201).json({ message: "Shop profile created successfully" });
    }
    catch (error) {
        console.log("error registering shop", error);
        res.status(500).json({messages: "Registration failed"});
    }
}

const generateSecretKey = () => {
    const secretKey = crypto.randomBytes(32).toString("hex");
    return secretKey;
}

const secretKey = generateSecretKey();


export const getprofile = async (req, res) => {
    try {
        const findUserID = req.params.shopID;
        const shop = await Shop.findById(findUserID);
        if (!shop) {
            res.status(404).json({message: "Shop not found"});
        }
        res.status(200).json({shop});
    } catch (error) {
        res.status(500).json({message: "Error retrieving the shop profile"});
    }
}
export const updateShopProfile = async (req, res) => {
    console.log(req.body);
    try {
        const shopID = req.params.shopID; // Assuming you have the shop ID in the request parameters.
        const { shopName, email, phone, address, profilePic } = req.body;

        await shop.findByIdAndUpdate(shopID, {
            shopName: shopName,
            email: email,
            phone: phone,
            address: address,
            profilePic: {
                public_id: profilePic.publicId,
                url: profilePic.secureUrl
            }
            // Add other fields as needed for updating the shop profile
        });

        res.status(200).send({
            success: true,
            message: "Shop profile updated successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error updating the shop profile" });
    }
};