import express from "express";
import {singleUpload} from "../middlewares/multer.js"
import * as shopProfile from '../controllers/shopProfile.js'
const router = express.Router();
router.post('/createShop', shopProfile.registerShop);
router.get('/shopProfile/:shopID', shopProfile.getprofile); 
// router.put('/profile/update/:userID', singleUpload, user.updateprofile);
export default router;

