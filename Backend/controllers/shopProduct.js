import { response } from "express"
import Product from '../models/product.js';
import Shop from '../models/shop.js';

export const index = async (req, res) => {
    try {
        const {shopID} = req.body;
        console.log(shopID);;
        const products = await Product.find({shop: shopID});
        if (!products) {
            res.status(404).json({ message: "Products not found" });
        }
        res.status(200).json({products});
    } catch (error) {
        res.status(500).json({ message: "Error retrieving the shop products" });
    }
}
export const getOne = async (req, res) => {
    try {
        const {idProduct} = req.params;
        const product = await Product.findById(idProduct);
        if (!product) {
            res.status(404).json({ message: "Products not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving the product" });
    }
}
export const createProduct = async (req, res) => {    
    try {
        const {shopId} = req.params;
        console.log(req.body.product)
        const product = new Product(req.body.product);
        product.shop = shopId;
        await product.save();
        console.log(product);
        res.json({
            message: "Product created successfully",
            product,
        })
        console.log("Product created")
    } catch (err) {
        console.log(err);
        res.status(500).send('Error creating product');
    }
}
export const updateProduct = async (req, res) => {
    try {
        const { idProduct } = req.params; 
        const updatedFields = req.body.product; 

        let product = await Product.findById(idProduct);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        product = Object.assign(product, updatedFields);

        await product.save();

        res.json({
            message: 'Product updated successfully',
            product,
        });
        console.log('Product updated');
    } catch (err) {
        console.log(err);
        res.status(500).send('Error updating product');
    }
};



export const deleteProduct = async (req, res) => {
    try {
        const { idProduct } = req.params; 
        console.log(idProduct);

        let product = await Product.findById(idProduct);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await Product.findByIdAndDelete(idProduct);

        res.json({
            message: 'Product deleted successfully',
        });
        console.log('Product deleted');
    } catch (err) {
        console.log(err);
        res.status(500).send('Error deleting product');
    }
}