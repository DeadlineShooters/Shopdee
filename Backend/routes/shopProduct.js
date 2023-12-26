import express from "express";

import * as shop from '../controllers/shopProduct.js'
const router = express.Router({mergeParams: true});

// /shop/:shopId/products
router.get('/index', shop.index); 

router.post('/create-product', shop.createProduct);

router.get('/:idProduct/get-detail', shop.getOne);

router.put('/:idProduct/update-product', shop.updateProduct);

router.delete('/delete/:idProduct', shop.deleteProduct);

export default router;