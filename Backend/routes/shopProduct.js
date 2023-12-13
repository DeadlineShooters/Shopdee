import express from "express";

import * as shop from '../controllers/shopProduct.js'
const router = express.Router({mergeParams: true});

// /shop/:shopId/products
router.get('', shop.index);

router.get('/create-product', shop.createProduct);

router.get('/:idProduct', shop.getOne);

router.put('/:idProduct', shop.updateProduct);

router.get('/:idProduct', shop.deleteProduct);

export default router;