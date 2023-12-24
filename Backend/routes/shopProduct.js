import express from "express";

import * as shop from '../controllers/shopProduct.js'
const router = express.Router({mergeParams: true});

// /shop/:shopId/products
router.get('/index', shop.index); 

router.post('/create-product', shop.createProduct);

router.get('/:idProduct', shop.getOne);

router.put('/:idProduct', shop.updateProduct);

router.delete('/delete/:idProduct', shop.deleteProduct);

export default router;