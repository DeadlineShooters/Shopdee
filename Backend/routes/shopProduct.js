import express from "express";

import * as shop from "../controllers/shopProduct.js";
const router = express.Router({ mergeParams: true }); // to use req.params from App.js

// /shop/:shopId/products
router.get('/index', shop.index); 

router.post("/create-product", shop.createProduct);

router.get("/:idProduct", shop.getOne);

router.put("/:idProduct", shop.updateProduct);

router.delete("/:idProduct", shop.deleteProduct);

export default router;
