import express from "express";
import mongoose from "mongoose";

// import userRoutes from './routes/users.js'
import productRoutes from './routes/products.js'

const mongoUri = "mongodb+srv://shopdee:123@cluster0.1cwb6k0.mongodb.net/";
try {
    await mongoose.connect(mongoUri);
    console.log("Connected to the database");
} catch (error) {
    console.log("Could not connect to the database", error);
}


const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// app.use('/', userRoutes);
app.use('/products', productRoutes);


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
