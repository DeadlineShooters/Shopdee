import express from "express";
import catchAsync from '../utils/catchAsync.js'

import * as order from '../controllers/shopOrder.js'
const router = express.Router({ mergeParams: true });
// /shop/:shopId/orders
router.get('', order.index);
router.post('', catchAsync(order.create));
router.put('/:orderId', catchAsync(order.update))

export default router;