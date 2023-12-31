import { response } from "express";
import user from "../models/Users.js";
import jwt from "jsonwebtoken";
import randomBytes from "randombytes";
import crypto from "crypto";
import { getDataUri } from "../utils/feature.js";
import cloudinary from "cloudinary";
import Shop from "../models/shop.js";
import mongoose from "mongoose";
import nodemailer from "nodemailer"

let transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  secure: false,
  auth: {
    user: "nmthong226@gmail.com",
    pass: "aszipllghvzgatsy",
  }
})

export const checkShopOwner = async (req, res) => {
  try {
    const user = req.body.userID;
    // console.log("@@ user: ", user);
    const existingUser = await Shop.findOne({ user: user }).populate("user");

    // console.log("@@ existingUser: ", existingUser);
    if (!existingUser) {
      return res.status(500).json({ messages: "Email has been already registered!" });
    }
    res.status(200).json(existingUser);
  } catch (error) {
    console.log("error retrieving user data", error);
    res.status(500).json({ messages: "Not found user" });
  }
};
export const register = async (req, res) => {
  try {
    const { username, email, password, name, phone, birthDay, gender, address } = req.body;
    console.log(req.body);
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(400).send({success: false, messages: "Email has been already registered!" });
    }
    const newUser = new user({ username, email, password, name, phone, birthDay, gender, address });
    newUser.profilePic = {
      public_id: "c7x3gucweyz19zpqvae8",
      url: "https://res.cloudinary.com/dqxtf297o/image/upload/v1703247477/c7x3gucweyz19zpqvae8.jpg",
    };
    await newUser.save();
    res.status(200).send({success: true, message: "Account created successfully",});
  } catch (error) {
    console.log("error registering user", error);
    res.status(500).json({ messages: "Registration failed" });
  }
};

const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");
  return secretKey;
};

const secretKey = generateSecretKey();

export const signIn = async (req, res) => {
  try {
    const email = req.body.mail;
    const password = req.body.password;
    //Check if the user exists
    const loginUser = await user.findOne({ email });
    if (!loginUser) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    if (loginUser.password != password) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ userID: loginUser._id }, secretKey);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
};

export const getprofile = async (req, res) => {
  const findUserID = req.params.userID;
  console.log("@@ userID: " + findUserID);
  try {
    const User = await user.findById(findUserID);
    if (!User) {
      res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ User });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving the user profile" });
  }
};

export const updateprofile = async (req, res) => {
  console.log(req.body);
  try {
    const userID = req.params.userID;
    const { username, email, phone, gender, birthday, profilePic } = req.body;
    console.log(req.body);
    await user.findByIdAndUpdate(userID, {
      username: username,
      email: email,
      phone: phone,
      gender: gender,
      birthDay: birthday,
      profilePic: {
        public_id: profilePic.public_id,
        url: profilePic.url,
      },
    });
    res.status(200).send({
      success: true,
      message: "profile updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating the user profile" });
  }
};

export const updateaddress = async (req, res) => {
  console.log("@@ body", req.body);
  try {
    const userID = req.params.userID;
    const { address, phone } = req.body;
    // console.log(address);
    await user.findByIdAndUpdate(userID, {
      address: address,
      phone: phone
    });
    res.status(200).send({
      success: true,
      message: "profile updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating the user profile" });
  }
};

export const updatePassword = async (req, res) => {
  console.log("@@ body", req.body);
  try {
    const password = req.body.password;
    const email = req.body.email;
    const existingUser = await user.findOne({ email });
    if (!existingUser) {
      console.error({ success: false, message: 'There was an Error' });
      return res.send({ success: false, message: 'User not found' });
    }
    existingUser.password = password;
    await existingUser.save();
    res.status(200).send({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error resetting password " });
  }
};

const generateCode = async (length) => {
  let result = '';
  const characters = 'QWERTYUIOPASDFGHJKLZXCVBNM0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length)
  {
    result += characters.charAt(Math.floor(Math.random()*charactersLength));
    counter +=1;
  }
  return result;
}

export const resetPassword = async (req, res) => {
  try {
    const email = req.body.email;
    const existingUser = await user.findOne({ email });
    if (!existingUser) {
      console.error({ success: false, message: 'There was an Error' });
      return res.send({ success: false, message: 'If user exists, an email was sent' });
    }
    const token = await generateCode(5);
    existingUser.recovery.resetToken = token;
    existingUser.recovery.resetTokenExpiration = Date.now() + 3600000;
    await existingUser.save();
    let info = await transporter.sendMail({
      from: process.env.EMAIL_TEST,
      to: email,
      subject: "Hello " + existingUser.username,
      text: "Reset password information",
      html: `Hello world from ShopDee, this is your Reset Token: ${token}`,
    });
    console.log(info);
    return res.send({ success: true, message: 'Email sent' });
  } catch (error) {
    console.error(error)
  }
}

export const verifyToken = async (req, res) => {
  console.log(req.body)
  try {
    const verificationCode = req.body.token;
    const email = req.body.email;
    const existingUser = await user.findOne({ email });
    console.log(existingUser);
    if (!existingUser || existingUser.recovery.resetToken !== verificationCode) {
      return res.status(400).send({ success: false });
    }
    if (existingUser.recovery.resetTokenExpiration < new Date()) {
      return res.status(400).send({ success: false, message: 'Token has expired.' });
    }
    return res.status(200).send({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ success: false, message: 'An error occurred. Please try again later.' });
  }
}