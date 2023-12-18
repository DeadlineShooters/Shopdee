import express from "express";

import * as products from '../controllers/products.js'
const router = express.Router();

router.get('/', products.index);

export default router;
