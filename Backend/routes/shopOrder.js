import express from "express";

import * as order from "../controllers/shopOrder.js";

const router = express.Router({ mergeParams: true });
// /shop/:shopId/orders
router.get("", order.index);
router.put("/:orderId", order.update);

export default router;
