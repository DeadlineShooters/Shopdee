import { response } from "express"
import Product from '../models/product.js';
import Shop from '../models/shop.js';
export const index = async (req, res) => {
    try {
        const {shopId} = req.params;
        console.log(shopId)
        const products = await Product.find({shop: shopId});
        if (!products) {
            res.status(404).json({ message: "Products not found" });
        }
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving the shop products" });
    }
}
export const getOne = async (req, res) => {
    try {
        const {shopId} = req.params;
        console.log(shopId)
        const products = await Product.find({shop: shopId});
        if (!products) {
            res.status(404).json({ message: "Products not found" });
        }
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving the shop products" });
    }
}
export const createProduct = async (req, res) => {
    const { name, description, price, image } = req.body;

    try {
        const product = await Product.create({
            name, description, price, image
        });

        res.redirect('/products');
    } catch (err) {
        console.log(err);
        res.status(500).send('Error creating product');
    }
}
export const updateProduct = async (req, res) => {
    const { id, name, description, price, image } = req.body;
    const product = {
        a: 'akdfjas'
    }
    axios.post(product)
    

    try {
        // const product = await Product.findByPk(id);

        const product = await Product.findByIdAndUpdate({...req.body.product});

        if (!product) {
            return res.status(404).send('Product not found');
        }

        product.name = name;
        product.description = description;
        product.price = price;
        product.image = image;

        await product.save();

        res.send('Product updated');
    } catch (err) {
        console.log(err);
        res.status(500).send('Error updating product');
    }
}

export const deleteProduct = async (req, res) => {
    const id = Number(req.params.id);

    try {
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).send('Product not found');
        }

        await product.destroy();

        res.send('Product deleted');
    } catch (err) {
        console.log(err);
        res.status(500).send('Error deleting product');
    }
}