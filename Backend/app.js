import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import userRoutes from './routes/users.js'
import productRoutes from './routes/shopProduct.js'
import shopRoutes from './routes/shopProfile.js'
const mongoUri = "mongodb+srv://shopdee:123@cluster0.1cwb6k0.mongodb.net/";
try {
    await mongoose.connect(mongoUri);
    console.log("Connected to the database");
} catch (error) {
    console.log("Could not connect to the database", error);
}

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/user', userRoutes);
app.use('/shop/:shopId/products', productRoutes);
app.use('/shop/:shopId/orders', shopRoutes);
app.use('/shop/:shopId/profile', shopRoutes);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
