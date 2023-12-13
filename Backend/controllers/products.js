import { response } from "express"
import Product from '../models/product.js';

const products = [
    {
        id: '001',
        name: 'Bitis Hunter X',
        description: 'plapla'
    },
    {
        id: '001',
        name: 'Bitis Hunter X',
        description: 'plapla'
    },

]

export const index = (req, res) => {
    const response = {
        message: 'Products fetched successfully',
        posts: {
            length: products.length,
            data: products
        }
    }
    res.json(response);
}
