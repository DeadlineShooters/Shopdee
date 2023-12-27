import express from "express";
import * as buyerProduct from "../controllers/buyerProduct.js";

const router = express.Router();

router.get("/home", buyerProduct.showAll);

export default router;