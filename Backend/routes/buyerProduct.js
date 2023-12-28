import express from "express";
import controller from "../controllers/buyerProduct.js";

const router = express.Router();

router.get("/", controller.showAll);
router.get("/productID", controller.show);

export default router;
