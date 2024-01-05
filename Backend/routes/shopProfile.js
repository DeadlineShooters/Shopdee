import express from "express";
import * as shopProfile from '../controllers/shopProfile.js'
const router = express.Router();
router.post('/createShop', shopProfile.registerShop);
router.get('/shopProfile/:shopID', shopProfile.getprofile); 
router.put('/shopProfile/:shopID/update', shopProfile.updateShopProfile);
export default router;