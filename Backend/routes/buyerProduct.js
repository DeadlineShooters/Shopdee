import express from "express";
import controller from "../controllers/buyerProduct.js";

const router = express.Router();

router.get("/", controller.showAll);

export default router;
